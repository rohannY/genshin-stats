const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const { EnkaNetwork } = require("enkanetwork");
const enka = new EnkaNetwork();

app.use(cors());

app.get("/uid/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    const data = await enka.fetchUser(uid);

    const { player, characters } = data;

    const chars = characters.map((item) => {
      const {
        name,
        icons: { avatar },
        element,
        rarity,
        level,
        stats: { curHp, curDefense, curAttack, elementMastery },
        constellations,
        weapon: { name: weaponName, icon: weaponIcon, level: weaponLevel, rarity: weaponRarity },
      } = item;

      return {
        name,
        avatar,
        element,
        rarity,
        level,
        stats: {
          hp: Math.round(curHp),
          def: Math.round(curDefense),
          attack: Math.round(curAttack),
          em: Math.round(elementMastery),
        },
        constellation: "C" + constellations.filter((constellation) => constellation.unlocked).length,
        weapon: {
          name: weaponName,
          img: weaponIcon,
          lvl: weaponLevel,
          rarity: weaponRarity,
        },
      };
    });

    const info = {
      user: {
        userName: player.nickname,
        icon : player.nameCard.navbar,
        signature: player.signature,
        achievements: player.achievements,
        abyss: `${player.abyssFloor}-${player.abyssLevel}`,
        worldLevel: player.worldLevel,
      },
      chars,
    };

    res.send(info);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get("/", async (req, res) => {
  const data = await enka.fetchUser(863651548);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

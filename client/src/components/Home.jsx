import React, { useEffect, useState } from "react";
import {
  Input,
  Avatar,
  Accordion,
  AccordionItem,
  Button,
  Spinner,
} from "@nextui-org/react";
import Search from "../assets/search";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [customStyle, setCustomStyle] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://genshin-stats-server.vercel.app/uid/${uid}`); // replace with your API endpoint
      if (!response.ok) {
        console.log(response);
        setError("Profile Does not exist");
        setLoading(false);
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setLoading(false);
      setData(result);
      setError(null);
      if (result && result.chars.length > 0) {
        setSelectedCharacter(result.chars[0]);
      }
      setCustomStyle({
        backgroundImage: `url(${result.user.icon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "40em 5em",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!isNaN(uid)) {
      const uidString = String(uid);
      if (uidString.length === 9) {
        fetchData();
      } else {
        setError("UID has to be of length 9");
      }
    } else {
      setError("Only numbers are allowed");
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center min-h-screen px-8 text-white font-quicksand">
      <div className="md:w-[60%] w-full flex flex-col gap-4 justify-center items-center">
        <p>Enter Your Genshin UID</p>
        <div className="flex w-full">
          <Input
            className="w-full text-white mx-2"
            radius="lg"
            isClearable
            classNames={{
              label: "text-white ",
              input: ["!text-white", "bg-transparent"],
              inputWrapper: [
                "text-white",
                "bg-transparent",
                "border",
                "border-teal-600/40",
                "hover:!bg-transparent",
                "focus-within:!bg-transparent",
                "!text-white",
                "outline-none",
              ],
            }}
            placeholder="Type to search..."
            startContent={<Search />}
            onChange={(e) => setUid(e.target.value)}
            errorMessage={error ?? null}
            isInvalid={!!error}
          />
          <Button isIconOnly size="lg" onClick={handleSubmit}>
            <Search />
          </Button>
        </div>
      </div>
      {loading ? (
        <Spinner label="Loading..." color="warning" />
      ) : (
        data && (
          <div className="my-10 sm:p-10 sm:w-1/2 rounded-2xl border border-teal-600/40 bg-teal-700/20 backdrop-blur-2xl drop-shadow-2xl">
            {
              <div className={`flex w-full p-4 rounded-xl lg:flex-nowrap`} style={customStyle}>
                <Avatar
                  color="secondary"
                  isBordered
                  className="hidden sm:flex w-12 h-12 bg-blur"
                ></Avatar>

                <div className="sm:px-5 flex space-x-5 text-sm sm:text-base">
                  <div>
                    <p>{data.user.userName}</p>
                    <p>World Level : {data.user.worldLevel}</p>
                  </div>
                  <div>
                    <p>Achievements : {data.user.achievements}</p>
                    <p>Abyss : {data.user.abyss}</p>
                  </div>
                </div>
              </div>
            }

            <div className="my-4">
              <div className="px-8 py-4 grid grid-cols-4 gap-x-4 gap-y-4 xl:flex justify-between">
                {data.chars.map((item, index) => (
                  <Avatar
                    className="cursor-pointer hover:ring ring-green-500 bg-white"
                    key={index}
                    size="lg"
                    isBordered
                    color="secondary"
                    src={item.avatar}
                    onClick={() => setSelectedCharacter(data.chars[index])}
                  />
                ))}
              </div>

              {selectedCharacter && (
                <div className="col-span-10">
                  {console.log(selectedCharacter)}
                  <div className="px-6 xl:px-10 py-3 ">
                    <table class="table-auto w-1/2 mx-2">
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td>{selectedCharacter.name}</td>
                        </tr>
                        <tr>
                          <td>Element:</td>
                          <td>{selectedCharacter.element}</td>
                        </tr>
                        <tr>
                          <td>Rarity:</td>
                          <td>{selectedCharacter.rarity}</td>
                        </tr>
                        <tr>
                          <td>Level:</td>
                          <td>{selectedCharacter.level}</td>
                        </tr>
                        <tr>
                          <td>Constellation:</td>
                          <td>{selectedCharacter.constellation}</td>
                        </tr>
                      </tbody>
                    </table>

                    <Accordion>
                      <AccordionItem
                        key="1"
                        aria-label="stats"
                        title="Stats"
                        classNames={{
                          title: "text-white ",
                        }}
                      >
                        <p>Attack : {selectedCharacter.stats.attack}</p>
                        <p>Defense : {selectedCharacter.stats.def}</p>
                        <p>HP : {selectedCharacter.stats.hp}</p>
                        <p>EM : {selectedCharacter.stats.em}</p>
                      </AccordionItem>

                      <AccordionItem
                        key="2"
                        aria-label="weapon"
                        title="Weapon"
                        classNames={{
                          title: "text-white ",
                        }}
                        startContent={
                          <Avatar
                            isBordered
                            radius="lg"
                            size="md"
                            className="bg-white"
                            src={selectedCharacter.weapon.img}
                          />
                        }
                      >
                        <p>Name : {selectedCharacter.weapon.name}</p>
                        <p>Level : {selectedCharacter.weapon.lvl}</p>
                        <p>Rarity : {selectedCharacter.weapon.rarity}</p>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </section>
  );
}

import Home from "./components/Home";
import Nav from "./components/Nav"

function App() {
  return (
    <main className="min-h-screen relative min-w-screen justify-between custom-gradient" >
      <Nav/>
      <Home/>
    </main>
  );
}

export default App;

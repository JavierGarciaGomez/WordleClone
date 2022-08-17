import { useEffect, useState } from "react";
import { useWordle } from "./hooks/useWordle";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState<string>("");

  const {} = useWordle(solution);

  useEffect(() => {
    // todo store url as env
    // todo: maybe use a local js file with an array
    // todo: create a fetch function
    fetch("http://localhost:3000/words")
      .then((res) => res.json())
      .then((json) => {
        // random int between 0 & 14
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution);
      });
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle clone</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;

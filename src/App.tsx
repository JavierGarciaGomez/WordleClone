import { useEffect, useState } from "react";
import { useWordle } from "./hooks/useWordle";
import Wordle from "./components/Wordle";
import { availableWords } from "./data/availableWords";

// https://www.youtube.com/watch?v=jkUn_FsyNqc&list=PL4cUxeGkcC9gXdVXVJBmHpSI7zCEcjLUX&index=16
// https://www.youtube.com/watch?v=Wak7iN4JZzU
// https://www.youtube.com/watch?v=mpby4HiElek&t=4103s
function App() {
  const [wordLength, setWordLength] = useState(5);
  const filteredWords = availableWords.filter(
    (word) => word.length === wordLength
  );
  const [solution, setSolution] = useState<string>("");

  const resetGame = () => {
    console.log("resetgame");
    const randomSolution =
      filteredWords[Math.floor(Math.random() * filteredWords.length)];

    setSolution(randomSolution);
  };

  useEffect(() => {
    const randomSolution =
      filteredWords[Math.floor(Math.random() * filteredWords.length)];

    setSolution(randomSolution);
  }, [setSolution]);

  useEffect(() => {}, [solution]);

  return (
    <div className="App">
      <h1>Wordle clone</h1>
      {solution && (
        <Wordle
          solution={solution}
          wordLength={wordLength}
          resetGame={resetGame}
        />
      )}
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { useWordle } from "../hooks/useWordle";
import { Keypad } from "./Keypad";
import { WordleGrid } from "./WordleGrid";

type Props = {
  solution: string;
};
const Wordle = ({ solution }: Props) => {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    console.log({ guesses, isCorrect, turn });
  }, [guesses, isCorrect, turn]);

  return (
    <>
      <div>Solution - {solution}</div>
      <div>Current guess - {currentGuess}</div>
      <div className="">guesses - {JSON.stringify(guesses)}</div>
      <WordleGrid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
      ></WordleGrid>
      <Keypad usedKeys={usedKeys}></Keypad>
    </>
  );
};

export default Wordle;

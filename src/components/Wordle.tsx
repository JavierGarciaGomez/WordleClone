import React, { useEffect, useState } from "react";
import { useWordle } from "../hooks/useWordle";
import { Keypad } from "./Keypad";
import { Modal } from "./Modal";
import { WordleGrid } from "./WordleGrid";

type Props = {
  solution: string;
};
const Wordle = ({ solution }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    // console.log("adding listener");
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      return () => window.removeEventListener("keyup", handleKeyUp);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      console.log("you fucked it up");
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => {
      // console.log("removing listener");
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp, isCorrect]);

  return (
    <>
      <WordleGrid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
      ></WordleGrid>
      <Keypad usedKeys={usedKeys}></Keypad>
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </>
  );
};

export default Wordle;

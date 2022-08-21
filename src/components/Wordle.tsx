import React, { useEffect, useState } from "react";
import { useWordle } from "../hooks/useWordle";
import { Keyboard } from "./Keyboard";
import { Modal } from "./Modal";
import { WordleGrid } from "./WordleGrid";

type Props = {
  solution: string;
  wordLength: number;
};
const Wordle = ({ solution, wordLength }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const {
    currentGuess,
    handleKeyUp,
    handleClick,
    formattedTries,
    isCorrect,
    turn,
    formattedKeys,
    activeTileAnimation,
    removeAnimation,
  } = useWordle(solution, wordLength);

  // console.log({
  //   formattedTries,
  // });

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
        formattedTries={formattedTries}
        turn={turn}
        activeTileAnimation={activeTileAnimation}
        removeAnimation={removeAnimation}
      ></WordleGrid>
      <Keyboard
        formattedKeys={formattedKeys}
        handleClick={handleClick}
      ></Keyboard>
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </>
  );
};

export default Wordle;

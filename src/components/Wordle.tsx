import React, { useEffect, useState } from "react";
import { MAXTURNS } from "../helpers/constants";
import { useWordle } from "../hooks/useWordle";
import { Keyboard } from "./Keyboard";
import { Modal } from "./Modal";
import { WordleGrid } from "./WordleGrid";

type Props = {
  solution: string;
  wordLength: number;
  resetGame: () => void;
};
const Wordle = ({ solution, wordLength, resetGame }: Props) => {
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
    resetWordle,
  } = useWordle(solution, wordLength);

  useEffect(() => {
    // console.log("adding listener");
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      return () => window.removeEventListener("keyup", handleKeyUp);
    }

    if (turn > MAXTURNS - 1) {
      setTimeout(() => setShowModal(true), 2000);

      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => {
      // console.log("removing listener");
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp, isCorrect, turn]);

  const restartGame = () => {
    setShowModal(false);

    resetWordle();
    resetGame();
  };

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
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          resetGame={restartGame}
        />
      )}
    </>
  );
};

export default Wordle;

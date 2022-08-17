import { useState } from "react";
import { MAXTURNS, WORDLENGTH } from "../helpers/constants";

export const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]); // each guess is an array
  const [history, setHistory] = useState<string[]>([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    console.log("formatting the guess - ", currentGuess);
  };

  const addNewGuess = () => {};

  const handleKeyUp = (event: KeyboardEvent) => {
    const { key } = event;
    console.log({ key, currentGuess });

    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > MAXTURNS) {
        console.log("you used all your guesses!");
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("you already tried that word.");
        return;
      }
      // check word is 5 chars
      if (currentGuess.length !== WORDLENGTH) {
        console.log("word must be 5 chars.");
        return;
      }
      formatGuess();
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < WORDLENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    history,
    isCorrect,
    handleKeyUp,
  };
};

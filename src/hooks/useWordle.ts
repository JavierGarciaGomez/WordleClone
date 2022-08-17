import { useState } from "react";
import { MAXTURNS, WORDLENGTH } from "../helpers/constants";
import { IFormattedGuess } from "../interfaces/interfaces";

export const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<IFormattedGuess[][]>([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState<string[]>([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    console.log("formatting");

    let solutionArray: (string | null)[] = [...solution];

    let formattedGuess = [...currentGuess].map((letter) => ({
      key: letter,
      color: "grey",
    }));

    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess: IFormattedGuess[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setCurrentGuess("");
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > MAXTURNS) {
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        return;
      }
      // check word is 5 chars
      if (currentGuess.length !== WORDLENGTH) {
        return;
      }
      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
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

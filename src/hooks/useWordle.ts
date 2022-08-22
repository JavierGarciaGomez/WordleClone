import { useState } from "react";
import { MAXTURNS } from "../helpers/constants";
import {
  IFormattedTile,
  IStringDictionary,
  IActiveTileAnimation,
} from "../interfaces/interfaces";
import { availableWords } from "../data/availableWords";

const emptyFormattedTile: IFormattedTile = {
  key: "",
  color: "",
  state: "empty",
  className: "tile",
};

export const useWordle = (solution: string, wordLength = 5) => {
  const emptyFormattedTry: IFormattedTile[] = [];
  for (let i = 0; i < wordLength; i++) {
    emptyFormattedTry.push({ ...emptyFormattedTile });
  }
  const emptyFormattedTries: IFormattedTile[][] = [];
  for (let i = 0; i < MAXTURNS; i++) {
    emptyFormattedTries.push([...emptyFormattedTry]);
  }

  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [formattedTries, setFormattedTries] =
    useState<IFormattedTile[][]>(emptyFormattedTries); // each guess is an array
  const [history, setHistory] = useState<string[]>([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [formattedKeys, setFormattedKeys] = useState<IStringDictionary>({});
  const [activeTileAnimation, setActiveTileAnimation] =
    useState<IActiveTileAnimation>(null);

  const handleKeyUp = (event: KeyboardEvent) => {
    const { key } = event;
    handleInputKey(key);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    handleInputKey(e.currentTarget.dataset.key!);
  };

  const handleInputKey = (key: string) => {
    key = key.toUpperCase();

    if (key === "ENTER") {
      // only add guess if turn is less than 5
      submitGuess();
    }

    if (key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      setFormattedTries((prev) => {
        const newFormattedTries = [...prev];
        newFormattedTries[turn][currentGuess.length - 1] = {
          ...emptyFormattedTile,
        };
        return newFormattedTries;
      });

      return;
    }

    if (/^[A-Za-zñÑ]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key);
        setFormattedTries((prev) => {
          const newFormattedTries = [...prev];
          newFormattedTries[turn][currentGuess.length] = {
            ...newFormattedTries[turn][currentGuess.length],
            key,
            state: "active",
            color: "",
          };
          return newFormattedTries;
        });
      }
    }
  };

  const submitGuess = async () => {
    if (turn > MAXTURNS) {
      return;
    }

    // do not allow words not included in dictionary
    if (!availableWords.includes(currentGuess.toLowerCase())) {
      setFormattedTries((prev) => {
        let newFormattedTries = [...prev];
        let newFormattedTry = newFormattedTries[turn].map((key) => {
          key.className = "tile active shake";
          return key;
        });
        newFormattedTries[turn] = [...newFormattedTry];

        return [...newFormattedTries];
      });
      // setActiveTileAnimation("shake");
      return;
    }

    // do not allow duplicate words
    if (history.includes(currentGuess)) {
      setFormattedTries((prev) => {
        let newFormattedTries = [...prev];
        let newFormattedTry = newFormattedTries[turn].map((key) => {
          key.className = "tile active shake";
          return key;
        });
        newFormattedTries[turn] = [...newFormattedTry];

        return [...newFormattedTries];
      });
      // setActiveTileAnimation("shake");
      return;
    }
    // check word is 5 chars
    if (currentGuess.length !== wordLength) {
      return;
    }

    // TODO get the new format before flipping tiles

    const formattedCurrentGuess = formatCurrentGuess();

    await flipTiles(formattedCurrentGuess);
    changeTurn(formattedCurrentGuess);
    checkWinLose();
  };

  const flipTiles = async (formattedCurrentGuess: IFormattedTile[]) => {
    const delays = async () =>
      new Promise<void>(async (resolve, reject) => {
        for (let i = 0; i < wordLength; ++i) {
          await formatWithFlip(i);
          if (i === wordLength - 1) {
            await formatWithFlip(i);
            setTimeout(() => {
              resolve();
            }, 250);
          }
        }
      });

    const formatWithFlip = (i: number) =>
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          setFormattedTries((prev) => {
            let newFormattedTries = [...prev];
            newFormattedTries[turn][i] = { ...formattedCurrentGuess[i] };

            resolve();
            return [...newFormattedTries];
          });
        }, 250);
      });

    await delays();

    // remove flip class
    for (let i = 0; i < wordLength; i++) {
      setFormattedTries((prev) => {
        let newFormattedTries = [...prev];
        newFormattedTries[turn][i] = {
          ...formattedCurrentGuess[i],
          className: "tile",
        };

        return [...newFormattedTries];
      });
    }
  };

  const formatCurrentGuess = () => {
    let solutionArray: (string | null)[] = [...solution];

    let formattedGuess: IFormattedTile[] = [...currentGuess].map((letter) => ({
      key: letter,
      color: "grey",
      state: "wrong",
      className: "tile flip",
    }));

    formattedGuess.forEach((letter, index) => {
      if (solution[index] === letter.key.toLowerCase()) {
        formattedGuess[index].color = "green";
        formattedGuess[index].state = "correct";
        solutionArray[index] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((letter, i) => {
      if (
        solutionArray.includes(letter.key.toLowerCase()) &&
        letter.state !== "correct"
      ) {
        formattedGuess[i].color = "yellow";
        letter.state = "partial";
        solutionArray[solutionArray.indexOf(letter.key.toLowerCase())] = null;
      }
    });

    // changeTurn(formattedGuess);
    return formattedGuess;
  };

  const changeTurn = (formattedGuess: IFormattedTile[]) => {
    // if (currentGuess === solution) {
    //   setIsCorrect(true);
    // }

    // setFormattedTries((prev) => {
    //   let newGuesses = [...prev];
    //   newGuesses[turn] = formattedGuess;
    //   return newGuesses;
    // });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setFormattedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };
      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];
        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }
        if (letter.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[letter.key] = "yellow";
          return;
        }
        if (letter.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[letter.key] = "grey";
          return;
        }
      });
      console.log({ newKeys });
      return { ...newKeys };
    });
  };

  const checkWinLose = () => {
    if (currentGuess === solution.toUpperCase()) {
      setIsCorrect(true);
      setActiveTileAnimation("dance");
      setFormattedTries((prev) => {
        let newFormattedTries = [...prev];
        let newFormattedTry = [...newFormattedTries[turn]];
        newFormattedTry = newFormattedTry.map((newFormattedKey) => {
          newFormattedKey.className = "tile dance";
          return newFormattedKey;
        });
        newFormattedTries[turn] = newFormattedTry;

        return newFormattedTries;
      });
    } else {
      setCurrentGuess("");
    }
  };

  const removeAnimation = () => {
    setActiveTileAnimation(null);
  };

  const resetWordle = () => {
    setTurn(0);
    setCurrentGuess("");
    setFormattedTries([...emptyFormattedTries]);
    setHistory([]);
    setIsCorrect(false);
    setFormattedKeys({});
    setActiveTileAnimation(null);
  };

  return {
    turn,
    currentGuess,
    formattedTries,
    history,
    isCorrect,
    handleKeyUp,
    handleClick,
    formattedKeys,
    activeTileAnimation,
    removeAnimation,
    resetWordle,
  };
};

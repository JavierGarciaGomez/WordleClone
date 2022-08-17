import React from "react";
import { IFormattedGuess as IFormattedGuessLetter } from "../interfaces/interfaces";
import { WordleRow } from "./WordleRow";

type Props = {
  currentGuess: string;
  guesses: IFormattedGuessLetter[][];
  turn: number;
};
export const WordleGrid = ({ currentGuess, guesses, turn }: Props) => {
  return (
    <>
      {guesses.map((guess, i) => {
        if (turn === i)
          return (
            <WordleRow
              key={i}
              guess={guess}
              currentGuess={currentGuess}
            ></WordleRow>
          );

        return <WordleRow key={i} guess={guess}></WordleRow>;
      })}
    </>
  );
};

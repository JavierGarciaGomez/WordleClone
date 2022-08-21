import React from "react";
import {
  IActiveTileAnimation,
  IFormattedTile as IFormattedGuessLetter,
} from "../interfaces/interfaces";
import { WordleRow } from "./WordleRow";

type Props = {
  currentGuess: string;
  formattedTries: IFormattedGuessLetter[][];
  turn: number;
  activeTileAnimation: IActiveTileAnimation;
  removeAnimation: () => void;
};
export const WordleGrid = ({
  currentGuess,
  formattedTries,
  turn,
  activeTileAnimation,
  removeAnimation,
}: Props) => {
  return (
    <div className="wordleGrid">
      {/* if is the current turn, set the current guess */}
      {formattedTries.map((formattedTry, i) => {
        if (turn === i)
          return (
            <WordleRow
              key={i}
              formattedTry={formattedTry}
              currentGuess={currentGuess}
              activeTileAnimation={activeTileAnimation}
              removeAnimation={removeAnimation}
            ></WordleRow>
          );

        return (
          <WordleRow
            key={i}
            formattedTry={formattedTry}
            activeTileAnimation={activeTileAnimation}
            removeAnimation={removeAnimation}
          ></WordleRow>
        );
      })}
    </div>
  );
};

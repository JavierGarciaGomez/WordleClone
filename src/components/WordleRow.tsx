import React from "react";
import { IFormattedGuess } from "../interfaces/interfaces";

type Props = {
  guess: IFormattedGuess[];
  currentGuess?: string;
};
export const WordleRow = ({ guess, currentGuess }: Props) => {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((element, i) => (
          <div key={i} className={element.color}>
            {element.key}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className={currentGuess ? "row current" : "row"}>
        <div className={currentGuess?.[0] ? "filled" : ""}>
          {currentGuess && currentGuess[0]}
        </div>
        <div className={currentGuess?.[1] ? "filled" : ""}>
          {currentGuess && currentGuess[1]}
        </div>
        <div className={currentGuess?.[2] ? "filled" : ""}>
          {currentGuess && currentGuess[2]}
        </div>
        <div className={currentGuess?.[3] ? "filled" : ""}>
          {currentGuess && currentGuess[3]}
        </div>
        <div className={currentGuess?.[4] ? "filled" : ""}>
          {currentGuess && currentGuess[4]}
        </div>
      </div>
    );
  }
};

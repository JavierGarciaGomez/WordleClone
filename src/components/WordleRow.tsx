import React from "react";
import { IActiveTileAnimation, IFormattedTile } from "../interfaces/interfaces";

type Props = {
  formattedTry: IFormattedTile[];
  currentGuess?: string;
  activeTileAnimation: IActiveTileAnimation;
  removeAnimation: () => void;
};
export const WordleRow = ({
  formattedTry,
  currentGuess,
  activeTileAnimation,
  removeAnimation,
}: Props) => {
  return (
    <div className={"row"}>
      {formattedTry.map((formattedKey, i) => {
        const className = formattedKey.className;

        if (i === formattedTry.length - 1) {
          return (
            <div
              className={className}
              data-letter={formattedKey.key}
              data-state={formattedKey.state}
            >
              {formattedKey.key}
            </div>
          );
        } else {
          return (
            <div
              className={className}
              data-letter={formattedKey.key}
              data-state={formattedKey.state}
              onAnimationEnd={removeAnimation}
            >
              {formattedKey.key}
            </div>
          );
        }
      })}
    </div>
  );
  // if (currentGuess) {
  //   return (
  //     <div className={"row current"}>
  //       <div className={currentGuess?.[0] ? "filled" : ""}>
  //         {currentGuess[0]}
  //       </div>
  //       <div className={currentGuess?.[1] ? "filled" : ""}>
  //         {currentGuess[1]}
  //       </div>
  //       <div className={currentGuess?.[2] ? "filled" : ""}>
  //         {currentGuess[2]}
  //       </div>
  //       <div className={currentGuess?.[3] ? "filled" : ""}>
  //         {currentGuess[3]}
  //       </div>
  //       <div className={currentGuess?.[4] ? "filled" : ""}>
  //         {currentGuess[4]}
  //       </div>
  //     </div>
  //   );
  // }

  // if (formattedTry) {
  //   return (
  //     <div className="row past">
  //       {formattedTry.map((element, i) => (
  //         <div key={i} className={element.color}>
  //           {element.key}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  // return (
  //   <div className={"row"}>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //   </div>
  // );
};

import React, { MouseEvent, useEffect, useState } from "react";
import { keyboardKeys } from "../data/keyboardKeys";
import {
  IKeyButton,
  ILetter,
  IStringDictionary,
} from "../interfaces/interfaces";
import { useWordle } from "../hooks/useWordle";
import { keyButtons } from "../data/keyButtons";
import { KeyButton } from "./KeyButton";

type Props = {
  usedKeys: IStringDictionary;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
};
export const Keypad = ({ usedKeys, handleClick }: Props) => {
  // const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {

  const [keys, setKeys] = useState<ILetter[]>(keyboardKeys);

  // useEffect(() => {
  //   fetch("http://localhost:3000/letters")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setLetters(json);
  //     });
  // }, []);

  return (
    <>
      <div className="keypad">
        {keys &&
          keys.map((key) => {
            const color = usedKeys[key.key];
            return (
              <div
                key={key.key}
                className={color}
                onClick={handleClick}
                data-keya={key.key}
              >
                {key.key}
              </div>
            );
          })}
      </div>
      <div className="c-keyboard">
        {keyButtons.map((keyButton) => (
          <KeyButton
            key={keyButton.dataKey}
            keyButton={keyButton}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
};

// class, data-key, label, keyLarge, innerElement Icon

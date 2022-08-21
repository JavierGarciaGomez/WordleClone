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
  formattedKeys: IStringDictionary;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
};
export const Keyboard = ({ formattedKeys, handleClick }: Props) => {
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
    <div className="c-keyboard">
      {keyButtons.map((keyButton) => {
        const color = formattedKeys[keyButton.dataKey];

        return (
          <KeyButton
            color={color}
            key={keyButton.dataKey}
            keyButton={keyButton}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

// class, data-key, label, keyLarge, innerElement Icon

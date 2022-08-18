import React, { useEffect, useState } from "react";
import { ILetter, IStringDictionary } from "../interfaces/interfaces";

type Props = { usedKeys: IStringDictionary };
export const Keypad = ({ usedKeys }: Props) => {
  const [letters, setLetters] = useState<ILetter[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
};

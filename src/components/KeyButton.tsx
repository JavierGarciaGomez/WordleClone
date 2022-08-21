import React from "react";
import { IKeyButton } from "../interfaces/interfaces";

type Props = {
  keyButton: IKeyButton;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
};
export const KeyButton = ({ keyButton, handleClick }: Props) => {
  const { dataKey, isLarge, iconElement } = keyButton;

  return (
    <button
      className={!isLarge ? "c-keyButton" : "c-keyButton --large"}
      data-key={dataKey}
      onClick={handleClick}
    >
      {iconElement ? (
        <span className="material-symbols-outlined icon">backspace</span>
      ) : (
        dataKey
      )}
    </button>
  );
};

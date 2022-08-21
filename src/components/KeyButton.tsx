import React from "react";
import { IKeyButton } from "../interfaces/interfaces";

type Props = {
  keyButton: IKeyButton;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  color: string;
};
export const KeyButton = ({ keyButton, handleClick, color }: Props) => {
  const { dataKey, isLarge, iconElement } = keyButton;
  let className = "c-keyButton";
  if (isLarge) className = `${className} --large`;
  if (color) className = `${className} ${color}`;

  return (
    <button className={className} data-key={dataKey} onClick={handleClick}>
      {iconElement ? (
        <span className="material-symbols-outlined icon">backspace</span>
      ) : (
        dataKey
      )}
    </button>
  );
};

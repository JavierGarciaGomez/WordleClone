import React, { useEffect } from "react";
import { useWordle } from "../hooks/useWordle";

type Props = {
  solution: string;
};
const Wordle = ({ solution }: Props) => {
  const { currentGuess, handleKeyUp } = useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div>
      <div>{solution}</div>
      <div>{currentGuess}</div>
    </div>
  );
};

export default Wordle;

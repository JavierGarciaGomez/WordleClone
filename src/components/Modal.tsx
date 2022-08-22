import React from "react";

type Props = {
  isCorrect: boolean;
  turn: number;
  solution: string;
  resetGame: () => void;
};
export const Modal = ({ isCorrect, turn, solution, resetGame }: Props) => {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>Victoria!</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses :)</p>
          <button onClick={resetGame}>Reintentar</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Nevermind</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time :)</p>
          <button onClick={resetGame}>Reintentar</button>
        </div>
      )}
    </div>
  );
};

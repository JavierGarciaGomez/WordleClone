export type IFormattedTile = {
  key: string;
  color: string;
  state: "empty" | "active" | "wrong" | "parcial" | "correct";
  className: string;
};

export type ILetter = { key: string };

export type IStringDictionary = {
  [key: string]: string;
};

export type IKeyButton = {
  dataKey: string;
  isLarge: boolean;
  iconElement?: JSX.Element;
};

export type IActiveTileAnimation = null | "flip" | "shake" | "dance";

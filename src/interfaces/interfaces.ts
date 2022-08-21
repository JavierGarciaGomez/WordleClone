export type IFormattedGuess = {
  key: string;
  color: string;
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

export const Colors = {
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
  green: 'green',
};

export type Sound = 'won' | 'fail' | 'start';
export type ColorKeys = $Keys<typeof Colors>;
export type ColorButtons = { [key: ColorKeys]: HTMLButtonElement };

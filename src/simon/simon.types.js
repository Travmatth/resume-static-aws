/* @flow */

const Color = { red: 'red', green: 'green', yellow: 'yellow', blue: 'blue' };
export type Sound = 'won' | 'lost' | 'start';
export type ColorKeys = $Keys<typeof Color>;
export type ColorButtons = { [key: ColorKeys]: HTMLButtonElement };

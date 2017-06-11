/* @flow */

const Color = { red: 'red', green: 'green', yellow: 'yellow', blue: 'blue' };
export type Sound = $Keys<typeof Color> | 'won' | 'lost' | 'start';
export type ColorKeys = $Keys<typeof Color>;
export type ColorButtons = { [key: ColorKeys]: HTMLButtonElement };

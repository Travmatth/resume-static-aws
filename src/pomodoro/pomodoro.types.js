const state = { STOPPED: 'STOPPED', RUNNING: 'RUNNING' };
const Phase = { work: 'work', rest: 'rest' };

export type State = $Keys<typeof state>;
export type Phase = $Keys<typeof phase>;
export type Timer = {| 'work': number, 'rest': number |};

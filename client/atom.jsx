import { atom } from "recoil";


export const alertsState = atom({
  key: 'AlertsState',
  default: [],
});

export const logState = atom({
  key: 'LogState',
  default: [],
});

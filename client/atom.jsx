import { atom } from 'recoil';

export const alertsState = atom({
  key: 'AlertsState',
  default: [],
});

export const logState = atom({
  key: 'LogState',
  default: [],
});

export const timerIdState = atom({
  key: 'timerIdState',
  default: null,
});

export const monitorStatusState = atom({
  key: 'monitorStatusState',
  default: 'Off',
});

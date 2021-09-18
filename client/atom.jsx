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

export const indexPatternsState = atom({
  key: 'indexPatternsState',
  default: [],
});

export const lastChosenIndexPatternState = atom({
  key: 'lastChosenIndexPatternState',
  default: '',
});

export const createAlertInputState = atom({
  key: 'createAlertInputState',
  default: {
    alertName: '',
    monitorFrequency: '',
    monitorFrequencyUnit: '',
    notificationFrequency: '',
    notificationFrequencyUnit: '',
    emailAddress: '',
    emailSubject: '',
    emailBody: '',
    editorContents: `{
  "bool": {
    "must": [
      {
        "match": {
          "log": "ERROR"
        }
      },
      {
        "range": {
          "@timestamp": {
            "gte": "now-1h/h",
            "lte": "now/h"
          }
        }
      }
    ]
  }
}`,
  },
});

export const currentAlertsState = atom({
  key: 'currentAlertsState',
  default: [],
});

export const monitorFrequencyInputState = atom({
  key: 'monitorFrequencyInputState',
  default: '',
});

export const monitorFrequencyUnitInputState = atom({
  key: 'monitorFrequencyUnitInputState',
  default: '',
});

export const notificationFrequencyInputState = atom({
  key: 'notificationFrequencyInputState',
  default: '',
});

export const notificationFrequencyUnitInputState = atom({
  key: 'notificationFrequencyUnitInputState',
  default: '',
});

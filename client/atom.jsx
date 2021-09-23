import { atom } from 'recoil';

export const alertsState = atom({
  key: 'alertsState',
  default: [],
});

export const logsState = atom({
  key: 'logsState',
  default: [],
});

export const intervalIdsState = atom({
  key: 'intervalIdsState',
  default: [],
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
    emailAddress: '',
    emailSubject: '',
    emailBody:
      'Within the last hour, there was at least one log with "ERROR" in it. The top hit contained the following log: {{log}}',
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

export const alertSearchBoxState = atom({
  key: 'alertSearchBoxState',
  default: '',
});

export const monitorFrequencyInputState = atom({
  key: 'monitorFrequencyInputState',
  default: '',
});

export const monitorFrequencyUnitInputState = atom({
  key: 'monitorFrequencyUnitInputState',
  default: '',
});

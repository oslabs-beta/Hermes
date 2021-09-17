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

export const editorContentsState = atom({
  key: 'editorContentsState',
  default: `{
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
});

export const indexPatternsState = atom({
  key: 'indexPatternsState',
  default: [],
});

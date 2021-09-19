import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  intervalIdsState,
  monitorStatusState,
  currentAlertsState,
} from '../atom';
import monitorFunc from '../monitor-funcs/monitorFunc';

const MonitorButton = () => {
  const [monitorStatus, setMonitorStatus] = useRecoilState(monitorStatusState);
  const [intervalIds, setIntervalIds] = useRecoilState(intervalIdsState);
  const currentAlerts = useRecoilValue(currentAlertsState);
  const clickHandler = () => {
    // iterate through the currentAlerts array and start an interval for each alert object
    if (monitorStatus === 'Off') {
      const newIntervalIds = [];
      for (const alert of currentAlerts) {
        newIntervalIds.push(monitorFunc(alert));
      }
      console.log('newIntervalIds: ', newIntervalIds);
      console.log('currentAlerts: ', currentAlerts);
      setIntervalIds(newIntervalIds);
      setMonitorStatus('On');
    } else {
      // iterate through timerIds array and clear each interval
      for (const intervalId of intervalIds) {
        clearInterval(intervalId);
      }
      setMonitorStatus('Off');
    }
  };
  return <button onClick={clickHandler}>Monitoring: {monitorStatus}</button>;
};

export default MonitorButton;

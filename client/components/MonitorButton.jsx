import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { timerIdState, monitorStatusState, currentAlertsState } from '../atom';
import monitorFunc from '../monitor-funcs/monitorFunc';

const MonitorButton = () => {
  const [monitorStatus, setMonitorStatus] = useRecoilState(monitorStatusState);
  const [timerId, setTimerId] = useRecoilState(timerIdState);
  const currentAlerts = useRecoilValue(currentAlertsState);
  const clickHandler = () => {
    const editorContents = currentAlerts[0].editorContents;
    console.log('editorContents', editorContents);
    if (monitorStatus === 'Off') {
      setTimerId(monitorFunc(editorContents));
      setMonitorStatus('On');
    } else {
      clearInterval(timerId);
      setMonitorStatus('Off');
    }
  };
  return <button onClick={clickHandler}>Monitoring: {monitorStatus}</button>;
};

export default MonitorButton;

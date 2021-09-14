import React from 'react';
import { useRecoilState } from 'recoil';
import { timerIdState, monitorStatusState } from '../atom';
import monitorFunc from '../monitor-funcs/monitorFunc';

const MonitorButton = () => {
  const [monitorStatus, setMonitorStatus] = useRecoilState(monitorStatusState);
  const [timerId, setTimerId] = useRecoilState(timerIdState);
  const clickHandler = () => {
    if (monitorStatus === 'Off') {
      setTimerId(monitorFunc());
      setMonitorStatus('On');
    } else {
      clearInterval(timerId);
      setMonitorStatus('Off');
    }
  };
  return <button onClick={clickHandler}>Monitoring: {monitorStatus}</button>;
};

export default MonitorButton;

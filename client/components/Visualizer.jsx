import React, { useEffect, useState } from 'react';
import UserLineChart from './UserLineChart';
import MonitorButton from './MonitorButton';
import EditorContainer from './EditorContainer';

const Visualizer = () => {
  return (
    <div className='visualizer-container'>
      <header className='visualizer-header'></header>
      <UserLineChart />
      {/* <MonitorButton />
      <EditorContainer /> */}
    </div>
  );
};

export default Visualizer;

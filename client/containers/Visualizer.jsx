/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import UserLineChart from './UserLineChart';
import MonitorButton from './MonitorButton';

const Visualizer = () => {
  return (
    <div className='visualizer-container'>
      <header className='visualizer-header'></header>
      <UserLineChart />
      <MonitorButton />
    </div>
  );
};

export default Visualizer;

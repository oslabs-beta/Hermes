/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import UserLineChart from '../components/UserLineChart';
import MonitorButton from '../components/MonitorButton';

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

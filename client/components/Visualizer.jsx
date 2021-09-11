import React, { useEffect, useState } from 'react';
import UserLineChart from './UserLineChart';

const Visualizer = () => {
  return (
    <div className='visualizer-container'>
      <header className='visualizer-header'></header>
      <UserLineChart />
    </div>
  );
};

export default Visualizer;

import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <nav className='sidebar-nav'>
      <Link to='/'>
        <header>Home</header>
      </Link>
      <Link to='/logs'>
        <header>View Logs</header>
      </Link>
      <Link to='/visualizer'>
        <header>Visualize Logs</header>
      </Link>
      <Link to='/alertsManager'>
        <header>Alerts</header>
      </Link>
      <Link to='/indices'>
        <header>Create An Index</header>
      </Link>
    </nav>
  );
};

export default SideBar;

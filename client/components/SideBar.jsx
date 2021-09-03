import React from 'react'
import {Link} from 'react-router-dom';

const SideBar = () =>{

    return (
        <nav className="sidebar-nav">
            <header>View Logs</header>
            <header>Visualize Logs</header>
            <header>Manage Alerts</header>
            <header>Create An Index</header>
        </nav>
    )
}


export default SideBar;
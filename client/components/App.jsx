import React from 'react'
import SideBar from './SideBar'



const App =()=>{

    return(
        <div className="app-container">
            
            <header className="title"><h1>Hermes</h1></header>
            <nav><SideBar/></nav>

        </div>
    )
}

export default App
import React from "react";
import SideBar from "./SideBar";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LogsContainer from "./LogsContainer";
import HomePage from "./HomePage";
import AlertsContainer from "./AlertsContainer";
import CreateIndex from "./CreateIndex";
import Visualizer from "./Visualizer";

const App =()=>{

    return(
        <Router>
            <div className="app-container">
                <SideBar/>
           
                <Switch>
                    <Route exact path="/">
            
                        <HomePage/>
                    </Route>
                    <Route exact path="/logs">
                        <LogsContainer/>
                    </Route>

                    <Route exact path="/visualizer">
                        <Visualizer/>
                    </Route>

                    <Route exact path="/alerts">
                        <AlertsContainer/>
                    </Route>
                    <Route exact path="/indexes">
                        <CreateIndex/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
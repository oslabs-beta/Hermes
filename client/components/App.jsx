import React from 'react';
import SideBar from './SideBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogsContainer from '../containers/LogsContainer';
import HomePage from './HomePage';
import AlertsContainer from './AlertsContainer';
import CreateIndex from '../containers/CreateIndex';
import Visualizer from '../containers/Visualizer';
import Nav from './Nav';

const App = () => {
  return (
    <Router>
      <header className='header'>
        <Nav />
        <h1>Hermes</h1>
      </header>
      <div className='app-container'>
        {false && <SideBar />}

        <Switch>
          <Route exact path='/indexes'>
            <HomePage />
          </Route>
          <Route path='/logs'>
            <LogsContainer />
          </Route>
          <Route path='/visualizer'>
            <Visualizer />
          </Route>
          <Route path='/alerts'>
            <AlertsContainer />
          </Route>
          <Route path='/'>
            <CreateIndex />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

import React, { useEffect } from 'react';
import SideBar from './SideBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogsContainer from '../containers/LogsContainer';
import HomePage from './HomePage';
import AlertsContainer from '../containers/AlertsContainer';
import CreateIndex from '../containers/CreateIndex';
import Visualizer from '../containers/Visualizer';
import Nav from './Nav';
import { useRecoilValue } from 'recoil';
import { intervalIdsState } from '../atom';

const App = () => {
  const intervalIds = useRecoilValue(intervalIdsState);
  useEffect(() => {
    return () => {
      for (const intervalId of intervalIds) {
        clearInterval(intervalId);
      }
    };
  });
  return (
    <Router>
      <header className='header'>
        <Nav />
        <h1>Hermes</h1>
      </header>
      <div className='app-container'>
        {false && <SideBar />}

        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/logs'>
            <LogsContainer />
          </Route>
          <Route path='/visualizer'>
            <Visualizer />
          </Route>
          <Route path='/alertsManager'>
            <AlertsContainer />
          </Route>
          <Route path='/indices'>
            <CreateIndex />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

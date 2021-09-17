import React, { useEffect } from 'react';
import SideBar from './SideBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogsContainer from './LogsContainer';
import HomePage from './HomePage';
import AlertsContainer from './AlertsContainer';
import CreateIndex from './CreateIndex';
import Visualizer from './Visualizer';
import Nav from './Nav';
import { useRecoilState } from 'recoil';
import { timerIdState } from '../atom';

const App = () => {
  const [timerId, setTimerId] = useRecoilState(timerIdState);
  useEffect(() => {
    return () => {
      clearInterval(timerId);
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
          <Route exact path='/alerts'>
            <HomePage />
          </Route>
          <Route path='/logs'>
            <LogsContainer />
          </Route>
          <Route path='/visualizer'>
            <Visualizer />
          </Route>
          <Route path='/'>
            <AlertsContainer />
          </Route>
          <Route path='/indexes'>
            <CreateIndex />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

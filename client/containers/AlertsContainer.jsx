import React from 'react';
import Alerts from '../components/Alerts';
import CreateAlert from '../components/CreateAlert';
import TextField from '../components/AlertSearchBox';
import Button from '@material-ui/core/Button';

const AlertsContainer = () => {
  // const logs = useAxios()

  return (
    <div id='alerts-page'>
      <header className='alerts-display-header'>Alerts</header>
      <div className='alert-box'>
        <div className='alert-inputs'>
          <TextField id='searchBox' label='test' style={{ fontSize: '16px' }} />
          <CreateAlert
            variant='contained'
            style={{ fontSize: '16px' }}
          ></CreateAlert>
        </div>
        <Alerts />
      </div>
    </div>
  );
};

export default AlertsContainer;

import React from 'react';
import Alerts from '../components/Alerts';
import CreateAlert from '../components/CreateAlert';
import AlertSearchBox from '../components/AlertSearchBox';

const AlertsContainer = () => {
  return (
    <div id='alerts-page'>
      <header className='page-header'>Manage Alerts</header>
      <div className='white-box'>
        <div className='text-and-button alert-inputs'>
          <p>Configure a new email alert:</p>
        </div>
        <CreateAlert
          variant='contained'
          style={{ fontSize: '1.6rem' }}
        ></CreateAlert>
        <div className='text-and-button alert-inputs'>
          <p>Type an alert name to filter existing alerts:</p>
        </div>
        <div className='text-and-button alert-inputs'>
          <AlertSearchBox
            id='searchBox'
            label='test'
            style={{ fontSize: '16px' }}
          />
        </div>
        <Alerts />
      </div>
    </div>
  );
};

export default AlertsContainer;

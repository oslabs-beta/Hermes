import React from "react";
import Alerts from "./Alerts";
import CreateAlert from './matUI/CreateAlert';
import TextField from './matUI/AlertSearchBox';
import Button from '@material-ui/core/Button';

const AlertsContainer = () =>{
  // const logs = useAxios()

  return(
    <div>
      <header className="alerts-display-header">
        Alerts
      </header>
      <div className="alert-inputs">
      <form className="alert-inputs">
        <TextField label="test" style={{ fontSize: '16px' }}/>
        <Button style={{ fontSize: '16px' }}>Search</Button>
      </form>
        <CreateAlert variant="contained" style={{ fontSize: '16px' }}></CreateAlert>
      </div>
      <div className='alert-box'>
      <Alerts/>

      </div>
    </div>
  );
};

export default AlertsContainer;

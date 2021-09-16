import React from "react";
import Alerts from "./Alerts";
import sendEmail from "../../server/email_smtp";

const AlertsContainer = () =>{
  // const logs = useAxios()

  return(
    <div>
      <header className="alerts-display-header">
        <Alerts/>
      </header>

    </div>
  );
};

export default AlertsContainer;

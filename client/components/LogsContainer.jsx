/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import Logs from "./Logs";
import useAxios from "../hooks/useAxios";
const LogsContainer = () =>{
    // const logs = useAxios()

    return(
        <div>
            <header className="logs-display-header">
                <Logs/>
            </header>

        </div>
    );
};

export default LogsContainer;
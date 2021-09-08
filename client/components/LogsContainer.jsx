/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import Logs from "./Logs";
import {useAxios} from "../hooks/useAxios";
import {logState} from '../atom';
const LogsContainer = () => {
  const logs = useAxios('/logs/logsbyindex/?index=logstash-*');
  console.log(logs);
  
  console.log(useRecoilValue(logState));
  // const [logs, setLogs] = useRecoilState(logS)

  // useEffect(() =>{
  //   fetch('/logs/logsbyindex/?index=logstash-*')
  //     .then(res => res.json())
  //     .then(res => console.log(res));
  // }, []);


  // const arr = logs.hits.hits;
  return (
    <>
      <div className="filter-box">
        <button type="button">add filter</button>
        <select name="cars" id="cars">
          <option value="filters">filters</option>
          
        </select>
      </div>
      <div className='logs'>
        <header className="logs-display-header">


        </header>

        <div  id="logs-container">
          
          {logs.map(log => {
            return < Logs key={log._id} time={log['source'['@timestamp']]} index={log._index}  />;
          })}
        hey
        </div>

      </div>
    </>
  );
};



export default LogsContainer;
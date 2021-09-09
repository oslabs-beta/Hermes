/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import Logs from "./Logs";
import {useAxios} from "../hooks/useAxios";
import {logState} from '../atom';
import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';

const LogsContainer = () => {
  const logs = useAxios('/logs/logsbyindex/?index=logstash-*');
  console.log(logs);
  
  console.log(useRecoilValue(logState));

  const data1 = JSON.parse(JSON.stringify(useRecoilValue(logState))) ;
  console.log(data1);
  const data = [
    {id: 1, name: 'Editor', value: 5},
    {id: 2, name: 'Grid'},
    {id: 3, name: 'Chart'},
    {id: 4, name: 'Cart'}
  ];
  
  const columns = [
    {name: '_id', header: 'ID'},
    {name: '_index', header: 'index'},
    {name: `_source["@timestamp"]`, header: 'Source'}
  ];
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
          
          <Grid
            data={data1}
            columns={columns}
            rowHeight={25}
            bodyHeight={100}
            heightResizable={true}
            widthResizable={true}
            rowHeaders={['rowNum']}
          />

          {/* {logs.map(log => {
            return < Logs key={log._id} time={log['source'['@timestamp']]} index={log._index}  />;
          })} */}
        </div>

      </div>
    </>
  );
};



export default LogsContainer;
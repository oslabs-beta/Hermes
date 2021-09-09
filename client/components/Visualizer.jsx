import React, { useEffect, useState } from 'react';
import UserLineChart from './UserLineChart';
import axios from 'axios';
import { useAxios } from '../hooks/useAxios';

const Visualizer = () => {
  // const [logs, setLogs] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get('/logs/logsbyindex/?index=logstash-2021.09.01&field=*&value=*')
  //     .then((res) => {
  //       setLogs(res.data.hits.hits);
  //     })
  //     .catch((error) => console.log('Error in Visualizer useEffect: ', error));
  // }, []);

  // console.log(logs);
  // // if the state has logs

  // if (logs) {
  //   // sort by date
  //   logs.sort(function (a, b) {
  //     return (
  //       new Date(a._source['@timestamp']) - new Date(b._source['@timestamp'])
  //     );
  //   });
  //   console.log(logs);
  //   // filter out the logs with errors
  //   const regex = /INFO/;
  //   const errorLogs = logs.filter((hit) => regex.test(hit._source.log));
  //   console.log('array of logs with INFO: ', errorLogs);
  //   console.log(logs[0]._source);
  // }

  return (
    <div className='visualizer-container'>
      <header className='visualizer-header'></header>
      <UserLineChart />
    </div>
  );
};

export default Visualizer;

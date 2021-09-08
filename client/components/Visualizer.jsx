import React, { useEffect, useState } from 'react';
import UserLineChart from './UserLineChart';
import axios from 'axios';

const Visualizer = () => {
  const [logs, setLogs] = useState(null);
  useEffect(() => {
    axios
      .get('/logs/logsbyindex/?index=logstash-*')
      .then((res) => {
        setLogs(res.data.hits.hits);
      })
      .catch((error) => console.log('Error in Visualizer useEffect: ', error));
  }, []);
  // const logs = useAxios('/logs/logsbyindex/?index=logstash-*');
  console.log(logs);
  if (logs) {
    const logsOnly = logs.map((hit) => {
      return { log: hit._source.log };
    });
    console.log('array of logs:', logsOnly);
    const regex = /info/i;
    const errorLogs = logsOnly.filter((hit) => {
      regex.test(hit.log);
    });
    console.log('array of logs with Errors: ', errorLogs);
    console.log(logs[0]._source);
  }

  // const errors = logs.filter((hit) => hit.log);
  // console.log(errors);

  return (
    <div>
      <header className='visualizer-header'></header>
      <UserLineChart />
    </div>
  );
};

export default Visualizer;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Logs from './Logs';
import { useAxios } from '../hooks/useAxios';
import { logState } from '../atom';
import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import Row from './Row';

const LogsContainer = () => {
  const logs = useAxios('/logs/logsbyindex/?index=logstash-*&field=*&value=*');
  console.log(logs);

  console.log(useRecoilValue(logState));

  const data1 = [...JSON.parse(JSON.stringify(useRecoilValue(logState)))];
  if (data1[0]) {
    console.log(data1[0]['_source']);
  }
  const arr = [];
  // build an array of objects. Each object has one property, Log. The value is the _source object stringified.
  for (let i = 0; i < data1.length; i++) {
    if (data1[i]) {
      let string = '';
      for (const key in data1[i]._source) {
        string += `${key}: `;
        if (typeof data1[i]._source[key] === 'object') {
          string += `${JSON.stringify(data1[i]._source[key])}, `;
        } else {
          string += `${data1[i]._source[key]}, `;
        }
      }
      arr.push(string);
    }
  }
  // for (let i = 0; i < data1.length; i++) {
  //   if (data1[i])
  //     arr.push({
  //       ...data1[i],
  //       ...data1[i]['_source'],
  //       ...data1[i]['_source']['kubernetes'],
  //     });
  // }

  console.log(arr);
  // const data = [
  //   {id: 1, name: 'Editor', value: 5},
  //   {id: 2, name: 'Grid'},
  //   {id: 3, name: 'Chart'},
  //   {id: 4, name: 'Cart'}
  // ];

  // const dataSource = {
  //   withCredentials: false,
  //   initialRequest: true,
  //   api: {
  //     readData: { url: '/logs/logsbyindex/?index=logstash-*', method: 'GET' }
  //   }
  // };

  const columns = [{ name: 'Logs', header: 'Log' }];
  // const columns = [
  //   { name: '_index', header: 'index' },
  //   { name: `@timestamp`, header: '@timestamp' },
  //   { name: 'log', header: 'Log' },
  //   { name: `host`, header: 'host' },
  //   { name: `pod_id`, header: 'pod_id' },
  //   { name: `pod_name`, header: 'pod_name' },
  //   { name: `stream`, header: 'stream' },
  //   { name: `container_name`, header: 'container_name' },
  //   { name: `container_hash`, header: 'container_hash' },
  // ];
  // const [logs, setLogs] = useRecoilState(logS)

  // useEffect(() =>{
  //   fetch('/logs/logsbyindex/?index=logstash-*')
  //     .then(res => res.json())
  //     .then(res => console.log(res));
  // }, []);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  // const arr = logs.hits.hits;
  return (
    <div className='log-page-container'>
      <div className='filter-box'>
        <button type='button'>add filter</button>
        <input
          type='text'
          className='filter-input'
          placeholder='field'
          onChange={(e) => {
            setField(e.target.value);
          }}
        />
        <input
          type='text'
          className='filter-input'
          placeholder='value'
          onChange={(e) => {
            setField(e.target.value);
          }}
        />
        {/* <select name="cars" id="cars">
          <option value="filters">filters</option>
          
        </select> */}
      </div>
      <div className='logs'>
        <header className='logs-display-header'></header>

        <div id='logs-container'>
          <div id='table-div'>
            <table>
              <tr>
                <th className='more-info'>More Info</th>
                <th className='more-info'>Logs</th>
              </tr>
              {arr.map((log, i) => (
                <Row log={log} />
              ))}
            </table>
          </div>

          {/* {data1[0] && (
            <Grid
              className='log-grid'
              data={arr}
              columns={columns}
              rowHeight={25}
              bodyHeight={100}
              heightResizable={true}
              widthResizable={true}
              rowHeaders={['rowNum']}
            />
          )} */}
          {/* {logs.map((log) => {
            return (
              <Logs
                key={log._id}
                time={log['source'['@timestamp']]}
                index={log._index}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default LogsContainer;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAxios } from '../hooks/useAxios';
import { logState } from '../atom';
import 'tui-grid/dist/tui-grid.css';
import Row from '../components/Row';

const LogsContainer = () => {
  const [field, setField] = useState('*');
  const [value, setValue] = useState('*');
  useAxios(`/logs/logsbyindex/?index=logstash-*&field=${field}&value=${value}`);

  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    fetch('/indexpatterns')
      .then((res) => res.json())
      .then((res) => setPatterns(res));
  }, [setPatterns]);

  const data1 = [...JSON.parse(JSON.stringify(useRecoilValue(logState)))];
  const seter = new Set();
  const arr = [];
  // build an array of objects. Each object has one property, Log. The value is the _source object stringified.
  for (let i = 0; i < data1.length; i++) {
    if (data1[i]) {
      let string = '';
      for (const key in data1[i]._source) {
        seter.add(key);
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

  const selectArr = Array.from(seter);
  return (
    <div className='log-page-container'>
      <div className='filter-box'>
        <button type='button'>add filter</button>
        <select name='fields' onChange={(e) => setField(e.target.value)}>
          {selectArr.map((field, i) => {
            return <option key={i}>{field}</option>;
          })}
        </select>
        <input
          type='text'
          className='filter-input'
          placeholder='value'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
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
                <Row log={log} key={i} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsContainer;

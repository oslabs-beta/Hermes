import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAxios } from '../hooks/useAxios';
import { logState } from '../atom';
import { TextField } from '@mui/material';
import SelectBox from '../components/SelectBox';
import SimpleTable from '../components/SimpleTable';

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
      <header className='page-header'>View Logs</header>
      <div className='white-box'>
        <p className='alert-inputs'>
          Filter logs by inputting a value that must be included in the selected
          field:
        </p>
        <div className='index-pattern-input'>
          <SelectBox
            optionsArray={selectArr}
            labelText='Field'
            requiredProp={false}
            valueProp={field}
            handleChange={(e) => setField(e.target.value)}
            styleProp={{ width: '15rem' }}
            inputLabelId='field-dropdown-label'
            selectId='field-dropdown'
          />
          <TextField
            size='small'
            margin='normal'
            label='Field Value'
            id='filter-input'
            variant='outlined'
            className='filter-input'
            style={{ width: '15rem', marginLeft: '0.5rem' }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <div className='logs'>
          <header className='logs-display-header'></header>
          <div id='logs-container'>
            <div className='sources-container'>
              {arr && (
                <SimpleTable title={'Logs'} rows={arr} alignment='left' />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsContainer;

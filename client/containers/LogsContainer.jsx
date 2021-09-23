import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logsState } from '../atom';
import { indexPatternsState, lastChosenIndexPatternState } from '../atom';
import { TextField, Button } from '@mui/material';
import SelectBox from '../components/SelectBox';
import SimpleTable from '../components/SimpleTable';
import axios from 'axios';

const LogsContainer = () => {
  const [indexPatterns, setIndexPatterns] = useRecoilState(indexPatternsState);
  const [lastChosenIndexPattern, setLastChosenIndexPattern] = useRecoilState(
    lastChosenIndexPatternState
  );
  const [logs, setLogs] = useRecoilState(logsState);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  // handle change func passed down to the index pattern select box
  const handleDropdownChange = (event) => {
    setLastChosenIndexPattern(event.target.value);
  };
  const getLogs = () => {
    if (lastChosenIndexPattern) {
      let fieldText = field;
      let valueText = value;
      if (fieldText === '') fieldText = '*';
      if (valueText === '') valueText = '*';
      axios
        .get(
          `/logs/logsbyindex/?index=${lastChosenIndexPattern}&field=${fieldText}&value=${valueText}`
        )
        .then((res) => {
          setLogs(res.data.hits.hits);
        })
        .catch((error) => {
          console.log('Error in getLogs get request: ', error);
        });
    }
  };

  useEffect(() => {
    axios
      .get('/indexpatterns')
      .then((result) => {
        setIndexPatterns(result.data);
        setLastChosenIndexPattern(result.data[0]);
      })
      .catch((error) => console.log('Error in Visualizer useEffect: ', error));
  }, []);

  useEffect(getLogs, [lastChosenIndexPattern]);

  const data1 = [...JSON.parse(JSON.stringify(logs))];
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
        <div className='text-and-button alert-inputs'>
          <p>Select an index pattern:</p>
        </div>
        <div className='text-and-button alert-inputs'>
          <SelectBox
            optionsArray={indexPatterns}
            requiredProp={true}
            labelText='Index Pattern'
            valueProp={lastChosenIndexPattern}
            handleChange={handleDropdownChange}
            styleProp={{
              selfAlign: 'center',
              marginTop: '.8rem',
            }}
            inputLabelId='index-pattern-dropdown-label'
            selectId='index-pattern-dropdown'
          />
        </div>
        <div className='text-and-button alert-inputs'>
          <p>
            Filter logs by inputting a value that must be included in the
            selected field:
          </p>
        </div>
        <div className='text-and-button alert-inputs'>
          <SelectBox
            optionsArray={selectArr}
            labelText='Field'
            requiredProp={false}
            valueProp={field}
            handleChange={(e) => setField(e.target.value)}
            styleProp={{
              width: '15rem',
              selfAlign: 'center',
              marginTop: '.8rem',
            }}
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
            style={{
              width: '15rem',
              marginLeft: '0.5rem',
              selfAlign: 'center',
              marginTop: '.8rem',
            }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button
            style={{
              background:
                'linear-gradient( to right bottom, var(--color-card-primary), var(--color-primary-light))',
              color: '#faf9f9',
              height: '3.138rem',
              marginLeft: '2rem',
            }}
            onClick={getLogs}
          >
            Filter Search Results
          </Button>
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

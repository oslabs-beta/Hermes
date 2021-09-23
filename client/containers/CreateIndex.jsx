import React, { useState, useEffect } from 'react';
import SimpleTable from '../components/SimpleTable';
import SelectBox from '../components/SelectBox';
import { TextField, Button } from '@mui/material';
import { indexPatternsState, lastChosenIndexPatternState } from '../atom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

const CreateIndex = () => {
  const [indexPatterns, setIndexPatterns] = useRecoilState(indexPatternsState);
  const [lastChosenIndexPattern, setLastChosenIndexPattern] = useRecoilState(
    lastChosenIndexPatternState
  );
  const [alias, setAlias] = useState([]);

  const [input, setInput] = useState('');

  useEffect(() => {
    axios
      .get('/indexpatterns')
      .then((result) => setIndexPatterns(result.data))
      .catch((error) => console.log('Error in CreateAlert useEffect: ', error));
  }, []);

  useEffect(() => {
    fetch('/logs/esindices')
      .then((res) => res.json())
      .then((res) => setAlias(res));
  }, []);

  // handle change func passed down to the index pattern select box
  const handleDropdownChange = (event) => {
    setLastChosenIndexPattern(event.target.value);
  };

  const arr = [];
  for (let key in alias) {
    if (key[0] !== '.') arr.push(key);
  }
  arr.sort();

  function poster(data) {
    fetch(`/indexpatterns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setIndexPatterns(data);
        setLastChosenIndexPattern(input);
        setInput('');
      })
      .catch((err) => console.log('Error in poster:', err));
  }

  function deleter(data) {
    fetch(`/indexpatterns`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setIndexPatterns(data);
        setLastChosenIndexPattern('');
      })

      .catch((err) => console.log('Error in deleter function:', err));
  }

  function truer(arr, input) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].includes(input) || input.charAt(input.length - 1) === '*')
        return true;
    }
    return false;
  }

  return (
    <div className='outer-page'>
      <header className='page-header'>Manage Index Patterns</header>
      <div className='white-box'>
        <div className='text-and-button alert-inputs'>
          <p>
            Add a new index pattern to query multiple Elasticsearch indices:
          </p>
        </div>
        <div className='text-and-button alert-inputs'>
          <TextField
            size='small'
            margin='normal'
            label='Index Pattern'
            id='indexPattern'
            variant='outlined'
            className='index-field'
            style={{
              width: '30rem',
              selfAlign: 'center',
              marginTop: '.8rem',
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {truer(arr, input) && (
            <Button
              style={{
                background:
                  'linear-gradient( to right bottom, var(--color-card-primary), var(--color-primary-light))',
                color: '#faf9f9',
                height: '3.138rem',
                marginLeft: '2rem',
              }}
              onClick={() => poster({ indexPattern: input })}
            >
              Add
            </Button>
          )}
        </div>
        <div className='text-and-button alert-inputs'>
          <p>Delete an index pattern:</p>
        </div>
        <div className='text-and-button alert-inputs'>
          <SelectBox
            optionsArray={indexPatterns}
            labelText='Index Patterns'
            requiredProp={false}
            valueProp={lastChosenIndexPattern}
            handleChange={handleDropdownChange}
            styleProp={{
              width: '30rem',
              selfAlign: 'center',
              marginTop: '.8rem',
            }}
            inputLabelId='delete-index-pattern-dropdown-label'
            selectId='delete-index-pattern-dropdown'
          />
          <Button
            style={{
              background:
                'linear-gradient( to right bottom, var(--color-card-primary), var(--color-primary-light))',
              color: '#faf9f9',
              height: '3.138rem',
              marginLeft: '2rem',
            }}
            onClick={() => deleter({ indexPattern: lastChosenIndexPattern })}
          >
            Delete
          </Button>
        </div>
        <div className='sources-container'>
          {arr && (
            <SimpleTable
              rows={arr}
              title={'Existing Elasticsearch Indices'}
              alignment='center'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateIndex;

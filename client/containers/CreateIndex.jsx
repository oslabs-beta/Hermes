import React, { useState, useEffect } from 'react';
// import {useAxios} from '../hooks/useAxios';
import Indices from '../components/Indices';
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

  // const [patterns, setPatterns] = useState([]);

  const [marked, setMarked] = useState('');

  useEffect(() => {
    axios
      .get('/indexpatterns')
      .then((result) => setIndexPatterns(result.data))
      .catch((error) => console.log('Error in CreateAlert useEffect: ', error));
  }, []);

  // useEffect(() => {
  //   fetch('/indexpatterns')
  //     .then((res) => res.json())
  //     .then((res) => setPatterns(res));

  //   console.log('Error in effect');
  // }, []); //

  useEffect(() => {
    fetch('/logs/esindices')
      .then((res) => res.json())
      .then((res) => setAlias(res));
  }, [setAlias]);

  // handle change func passed down to the index pattern select box
  const handleDropdownChange = (event) => {
    setLastChosenIndexPattern(event.target.value);
  };

  const arr = [];

  for (let key in alias) {
    arr.push(key);
  }

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
    <div className='index-page'>
      <header className='page-header'>Manage Index Patterns</header>
      <div className='white-box'>
        <p className='alert-inputs'>
          Add a new index pattern to query multiple Elasticsearch indices:
        </p>
        <div className='index-pattern-input'>
          <TextField
            size='small'
            margin='normal'
            label='Index Pattern'
            id='indexPattern'
            variant='outlined'
            className='index-field'
            style={{ width: '30rem' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {truer(arr, input) && (
            <Button
              style={{
                background:
                  'linear-gradient( to right bottom, var(--color-card-primary), var(--color-primary-light))',
                color: '#faf9f9',
                height: '3.3rem',
                marginTop: '.8rem',
                marginLeft: '2rem',
              }}
              onClick={() => poster({ indexPattern: input })}
            >
              Add
            </Button>
          )}
        </div>
        <p className='alert-inputs'>Delete an index pattern:</p>
        <div className='index-pattern-input'>
          <SelectBox
            optionsArray={indexPatterns}
            labelText='Index Patterns'
            requiredProp={false}
            valueProp={lastChosenIndexPattern}
            handleChange={handleDropdownChange}
            styleProp={{ width: '30rem' }}
            inputLabelId='delete-index-pattern-dropdown-label'
            selectId='delete-index-pattern-dropdown'
          />
          <Button
            style={{
              background:
                'linear-gradient( to right bottom, var(--color-card-primary), var(--color-primary-light))',
              color: '#faf9f9',
              height: '3.3rem',
              marginTop: '.8rem',
              marginLeft: '2rem',
            }}
            onClick={() => deleter({ indexPattern: input })}
          >
            Delete
          </Button>
        </div>
        <div className='sources-container'>
          <h1>Existing Elasticsearch Indices</h1>
          {arr &&
            arr.map((ele, i) => {
              return <Indices key={i} name={ele} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default CreateIndex;

/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import UserLineChart from '../components/UserLineChart';
import { useRecoilState } from 'recoil';
import { indexPatternsState, lastChosenIndexPatternState } from '../atom';
import SelectBox from '../components/SelectBox';
import axios from 'axios';

const Visualizer = () => {
  const [indexPatterns, setIndexPatterns] = useRecoilState(indexPatternsState);
  const [lastChosenIndexPattern, setLastChosenIndexPattern] = useRecoilState(
    lastChosenIndexPatternState
  );
  // handle change func passed down to the index pattern select box
  const handleDropdownChange = (event) => {
    setLastChosenIndexPattern(event.target.value);
  };

  useEffect(() => {
    axios
      .get('/indexpatterns')
      .then((result) => setIndexPatterns(result.data))
      .catch((error) => console.log('Error in Visualizer useEffect: ', error));
  }, []);

  return (
    <div className='outer-page'>
      <header className='page-header'>Visualize Logs</header>
      <div className='white-box' id='visualizer-white-box'>
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
              width: '30rem',
              selfAlign: 'center',
              marginTop: '.8rem',
            }}
            inputLabelId='index-pattern-dropdown-label'
            selectId='index-pattern-dropdown'
          />
        </div>
        <UserLineChart lastChosenIndexPattern={lastChosenIndexPattern} />
      </div>
    </div>
  );
};

export default Visualizer;

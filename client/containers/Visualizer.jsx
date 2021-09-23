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
    <div className='visualizer-container'>
      <header className='visualizer-header'></header>
      <SelectBox
        optionsArray={indexPatterns}
        requiredProp={true}
        labelText='Index Pattern'
        valueProp={lastChosenIndexPattern}
        handleChange={handleDropdownChange}
        styleProp={{ marginLeft: '.25rem' }}
        inputLabelId='index-pattern-dropdown-label'
        selectId='index-pattern-dropdown'
      />
      <UserLineChart />
    </div>
  );
};

export default Visualizer;

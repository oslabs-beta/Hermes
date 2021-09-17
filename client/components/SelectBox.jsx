import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { lastChosenIndexPatternState } from '../atom';
import { useRecoilState } from 'recoil';

export default function SelectVariants({ indexPatterns }) {
  const [lastChosenIndexPattern, setLastChosenIndexPattern] = useRecoilState(
    lastChosenIndexPatternState
  );
  const handleChange = (event) => {
    setLastChosenIndexPattern(event.target.value);
  };
  return (
    <FormControl
      size='small'
      margin='normal'
      variant='outlined'
      className='create-alert-input'
      style={{ marginLeft: '.25rem' }}
    >
      <InputLabel id='index-pattern-dropdown-label'>Index Pattern</InputLabel>
      <Select
        labelId='index-pattern-dropdown-label'
        id='index-pattern-dropdown'
        value={lastChosenIndexPattern}
        onChange={handleChange}
        label='Index Pattern'
      >
        {indexPatterns.map((indexPattern, i) => (
          <MenuItem key={indexPattern + i} value={indexPattern}>
            {indexPattern}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

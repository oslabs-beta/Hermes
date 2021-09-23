import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants({
  optionsArray,
  labelText,
  styleProp,
  handleChange,
  valueProp,
  inputLabelId,
  selectId,
  requiredProp,
}) {
  return (
    <FormControl
      required={requiredProp}
      size='small'
      margin='normal'
      variant='outlined'
      className='create-alert-input'
      style={styleProp}
    >
      <InputLabel id={inputLabelId}>{labelText}</InputLabel>
      <Select
        labelId={inputLabelId}
        id={selectId}
        value={valueProp}
        onChange={handleChange}
        label={labelText}
      >
        {optionsArray.map((option, i) => (
          <MenuItem key={inputLabelId + i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

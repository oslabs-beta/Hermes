import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SelectVariants({
  optionsArray,
  labelText,
  styleProp,
  handleChange,
  valueProp,
  inputLabelId,
  selectId,
}) {
  return (
    <FormControl
      required
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

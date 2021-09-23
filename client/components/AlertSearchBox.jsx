import React from 'react';
import TextField from '@mui/material/TextField';
import { alertSearchBoxState } from '../atom';
import { useRecoilState } from 'recoil';

export default function AlertSearchBox() {
  const [alertSearchBox, setAlertSearchBox] =
    useRecoilState(alertSearchBoxState);
  const handleChange = (event) => {
    const newAlertSearch = event.target.value;
    setAlertSearchBox(newAlertSearch);
  };
  return (
    <TextField
      id='standard-basic'
      label='Search by Alert Name'
      variant='outlined'
      size='small'
      style={{ marginLeft: '1rem', width: '20rem' }}
      onChange={handleChange}
    />
  );
}

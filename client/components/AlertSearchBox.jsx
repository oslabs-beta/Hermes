import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { alertSearchBoxState } from '../atom';
import { useRecoilState, useRecoilValue } from 'recoil';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25rem',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [alertSearchBox, setAlertSearchBox] = useRecoilState(alertSearchBoxState);
  const handleChange = (event) => {
    console.log(event.target.value);
    const newAlertSearch = event.target.value.toLowerCase();
    setAlertSearchBox(newAlertSearch);
    console.log('this is state', alertSearchBox);

  };
  return (
    <TextField className={classes.root} id="standard-basic" label="Search for Alerts" onChange={handleChange}/>
  );
}
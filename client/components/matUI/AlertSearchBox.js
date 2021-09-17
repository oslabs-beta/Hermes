import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

  return (
    <TextField className={classes.root} id="standard-basic" label="Search for Alerts" />
  );
}

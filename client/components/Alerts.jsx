import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentAlertsState, alertSearchBoxState } from '../atom';
import axios from 'axios';
/*
const [currentAlerts, setCurrentAlerts] = useRecoilState(
  currentAlertsState
);*/

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    padding: '2rem',
    fontSize: '16px',
  },
});

function Row(props) {
  //console.log('these are props', props);
  const { row } = props;
  //console.log('this is the row', row);
  const [open, setOpen] = React.useState(false);
  const [currentAlerts, setCurrentAlerts] = useRecoilState(
    currentAlertsState
  );
  const alertSearchBox = useRecoilValue(alertSearchBoxState);
  const classes = useRowStyles();
  const frequencyConverter = (frequency, value) => {
    let adjustedFrequency = frequency;
    switch (value) {
      case 'day(s)':
        adjustedFrequency =  adjustedFrequency / 86400 / 1000;
        break;
      case 'hour(s)':
        adjustedFrequency = adjustedFrequency / 3600 / 1000;
        break;
      case 'minute(s)':
        adjustedFrequency = adjustedFrequency / 60 / 1000;
        break;
      case 'second(s)':
        adjustedFrequency = adjustedFrequency / 1000;
        break;
      default:
        console.log('Error in frequencyConverter');
        break;
    }
    return adjustedFrequency;
  };
  const reducedMonitorFreq = frequencyConverter(row.monitorFrequency, row.monitorFrequencyUnit);
  const reducedRenotifyFreq = frequencyConverter(row.notificationFrequency, row.notificationFrequencyUnit);

  const deleteAlert = () => {
    axios
      .delete('/alerts', { data: {alert: row}})
      .then((result) => {
        setCurrentAlerts(result.data);
      })
      .catch((error) =>
      console.log('Error in CreateAlert handleClickCreate: ', error)
    );
  };
  console.log('this is alert state in row', alertSearchBox);
  console.log(row.alertName);
  const regex = new RegExp(alertSearchBox,'i');
if (alertSearchBox === '' || regex.test(row.alertName)){
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: '14px' }}>
          {row.alertName}
        </TableCell>
        <TableCell align='center' style={{ fontSize: '14px' }}>
          {row.indexPattern}
        </TableCell>
        <TableCell align='center'>
          <button>
            <VolumeUpIcon style={{ fontSize: 30 }} />
          </button>
        </TableCell>
        <TableCell align='center'>
          <button>
            <BlockIcon style={{ fontSize: 30 }} />
          </button>
        </TableCell>
        <TableCell align='center'>
          <button id={row.alertName + 'delete'} onClick={deleteAlert}>
            <DeleteIcon style={{ fontSize: 30 }} />
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h5' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases' style={{marginBottom: '2rem', marginTop: '1rem'}}>
                <TableBody>
                  <TableRow key = {row.monitorFrequency}>
                    <TableCell>Check Period</TableCell>
                    <TableCell> {reducedMonitorFreq + ' ' + row.monitorFrequencyUnit}</TableCell>
                  </TableRow>
                  <TableRow key = {row.notificationFrequency}>
                    <TableCell>Renotify Every</TableCell>
                    <TableCell>{reducedRenotifyFreq + ' ' + row.notificationFrequencyUnit}</TableCell>
                  </TableRow>
                  <TableRow key = {row.emailAddress}>
                    <TableCell>Email Address</TableCell>
                    <TableCell>{row.emailAddress}</TableCell>
                  </TableRow>
                  <TableRow key = {row.emailSubject}>
                    <TableCell>Email Subject</TableCell>
                    <TableCell>{row.emailSubject}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant='h6' paragraph component='div'>
                Message
              </Typography>
              <Table size='small' aria-label='purchases' style={{marginBottom: '2rem', marginTop: '1rem'}}>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.emailBody}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant='h6' paragraph component='div'>
                Rule
              </Typography>
              <Table size='small' aria-label='purchases' style={{marginBottom: '2rem', marginTop: '1rem'}}>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.editorContents}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
} 
return (
  <tr></tr>
);
}

Row.propTypes = {
  row: PropTypes.shape({
    alertName: PropTypes.string.isRequired,
    monitorFrequency: PropTypes.number.isRequired,
    notificationFrequency: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    emailSubject: PropTypes.string.isRequired,
    emailBody: PropTypes.string.isRequired,
    indexPattern: PropTypes.string.isRequired,
    monitorFrequencyUnit: PropTypes.string.isRequired,
    notificationFrequencyUnit: PropTypes.string.isRequired,
    editorContents: PropTypes.string.isRequired
  }).isRequired
};

export default function CollapsibleTable() {
  const [currentAlerts, setCurrentAlerts] = useRecoilState(
    currentAlertsState
  );
  const [alertSearchBox] = useRecoilState(alertSearchBoxState);
  console.log('asb in default export',alertSearchBox);
  useEffect(() => {
    axios
      .get('/alerts')
      .then((result) => setCurrentAlerts(result.data))
      .catch((error) => console.log('Error in Alerts useEffect: ', error));
  }, []);
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontSize: '16px' }}>Alert Name</TableCell>
            <TableCell align='center' style={{ fontSize: '16px' }}>
              Index Pattern
            </TableCell>
            <TableCell align='center' style={{ fontSize: '16px' }}>
              Mute
            </TableCell>
            <TableCell align='center' style={{ fontSize: '16px' }}>
              Disable
            </TableCell>
            <TableCell align='center' style={{ fontSize: '16px' }}>
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentAlerts.map((alert) => (
            <Row key={alert.alertName} row={alert}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

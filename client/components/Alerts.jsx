import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentAlertsState, alertSearchBoxState } from '../atom';
import axios from 'axios';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [currentAlerts, setCurrentAlerts] = useRecoilState(currentAlertsState);
  const alertSearchBox = useRecoilValue(alertSearchBoxState);
  const frequencyConverter = (frequency, value) => {
    let adjustedFrequency = frequency;
    switch (value) {
      case 'day(s)':
        adjustedFrequency = adjustedFrequency / 86400 / 1000;
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
  const reducedMonitorFreq = frequencyConverter(
    row.monitorFrequency,
    row.monitorFrequencyUnit
  );

  const deleteAlert = () => {
    axios
      .delete('/alerts', { data: { alert: row } })
      .then((result) => {
        setCurrentAlerts(result.data);
      })
      .catch((error) =>
        console.log('Error in CreateAlert handleClickCreate: ', error)
      );
  };
  const regex = new RegExp(alertSearchBox, 'i');
  if (alertSearchBox === '' || regex.test(row.alertName)) {
    return (
      <React.Fragment>
        <TableRow>
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
            <button id={row.alertName + 'delete'} onClick={deleteAlert}>
              <DeleteIcon style={{ fontSize: 20 }} />
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
                <Table
                  size='small'
                  aria-label='purchases'
                  style={{
                    marginBottom: '2rem',
                    marginTop: '1rem',
                    backgroundColor: 'white',
                    border: 'hidden',
                  }}
                >
                  <TableBody>
                    <TableRow key={row.monitorFrequency}>
                      <TableCell>Check Period</TableCell>
                      <TableCell>
                        {' '}
                        {reducedMonitorFreq + ' ' + row.monitorFrequencyUnit}
                      </TableCell>
                    </TableRow>
                    <TableRow key={row.emailAddress}>
                      <TableCell>Email Address</TableCell>
                      <TableCell>{row.emailAddress}</TableCell>
                    </TableRow>
                    <TableRow key={row.emailSubject}>
                      <TableCell>Email Subject</TableCell>
                      <TableCell>{row.emailSubject}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography variant='h6' paragraph component='div'>
                  Message
                </Typography>
                <Table
                  size='small'
                  aria-label='purchases'
                  style={{
                    marginBottom: '2rem',
                    marginTop: '1rem',
                    backgroundColor: 'white',
                    border: 'hidden',
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>{row.emailBody}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography variant='h6' paragraph component='div'>
                  Rule
                </Typography>
                <Table
                  size='small'
                  aria-label='purchases'
                  style={{
                    marginBottom: '2rem',
                    marginTop: '1rem',
                    backgroundColor: 'white',
                    border: 'hidden',
                  }}
                >
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
  return <tr></tr>;
}

Row.propTypes = {
  row: PropTypes.shape({
    alertName: PropTypes.string.isRequired,
    monitorFrequency: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    emailSubject: PropTypes.string.isRequired,
    emailBody: PropTypes.string.isRequired,
    indexPattern: PropTypes.string.isRequired,
    monitorFrequencyUnit: PropTypes.string.isRequired,
    editorContents: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [currentAlerts, setCurrentAlerts] = useRecoilState(currentAlertsState);
  const [alertSearchBox] = useRecoilState(alertSearchBoxState);
  useEffect(() => {
    axios
      .get('/alerts')
      .then((result) => setCurrentAlerts(result.data))
      .catch((error) => console.log('Error in Alerts useEffect: ', error));
  }, []);

  return (
    <TableContainer component={Paper} className='graphic-element'>
      <Table
        aria-label='collapsible table'
        padding='normal'
        size='small'
        style={{
          border: 'hidden',
          margin: 0,
          marginTop: '3rem',
          backgroundColor: 'whitesmoke',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontSize: '16px' }}>Alert Name</TableCell>
            <TableCell align='center' style={{ fontSize: '16px' }}>
              Index Pattern
            </TableCell>
            <TableCell align='center' style={{ fontSize: '16px' }}>
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentAlerts.map((alert) => (
            <Row key={alert.alertName} row={alert} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

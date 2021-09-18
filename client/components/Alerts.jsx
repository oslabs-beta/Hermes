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
<<<<<<< HEAD
import { currentAlertsInputState, alertSearchBoxState } from '../atom';
import axios from 'axios';
=======
import { currentAlertsState } from '../atom';
/*
const [currentAlerts, setCurrentAlerts] = useRecoilState(
  currentAlertsState
);*/
>>>>>>> dev

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
  const classes = useRowStyles();

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
          <button>
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
                  <TableRow key = {row.notificationFrequency}>
                    <TableCell>Check Period</TableCell>
                    <TableCell> {row.notificationFrequency}</TableCell>
                  </TableRow>
                  <TableRow key = {row.monitorFrequency}>
                    <TableCell>Renotify Every</TableCell>
                    <TableCell>{row.monitorFrequency}</TableCell>
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    alertName: PropTypes.string.isRequired,
    monitorFrequency: PropTypes.string.isRequired,
    notificationFrequency: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    emailSubject: PropTypes.string.isRequired,
    emailBody: PropTypes.string.isRequired,
    indexPattern: PropTypes.string.isRequired
  }).isRequired,
};

export default function CollapsibleTable() {
  const [currentAlerts, setCurrentAlerts] = useRecoilState(
    currentAlertsInputState
  );
  const [alertSearchBox] = useRecoilValue(alertSearchBoxState);

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

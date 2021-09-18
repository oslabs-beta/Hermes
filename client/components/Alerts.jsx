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
import { currentAlertsInputState } from '../atom';
import axios from 'axios';
/*
const [currentAlerts, setCurrentAlerts] = useRecoilState(
  currentAlertsInputState
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

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  console.log('these are props', props);
  const { row } = props;
  console.log('this is the row', row);
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
          {row.monitorFrequency}
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
              <Typography variant='h6' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Renotify Every</TableCell>
                    <TableCell>Email Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key = {row.alertName+'1'}>
                    <TableCell> {row.notificationFrequency}</TableCell>
                    <TableCell> {row.emailAddress}</TableCell>
                  </TableRow>
                  {/*row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))*/}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
/*
Row.propTypes = {
  row: PropTypes.shape({
    alertName: PropTypes.string.isRequired,
    monitorFrequency: PropTypes.string.isRequired,
    //fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        notificationFrequency: PropTypes.number.isRequired,
        emailSubject: PropTypes.string.isRequired,
        emailAddress: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};*/
Row.propTypes = {
  row: PropTypes.shape({
    alertName: PropTypes.string.isRequired,
    monitorFrequency: PropTypes.string.isRequired,
    notificationFrequency: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
  }).isRequired,
};
/*
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  //createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];
*/
export default function CollapsibleTable() {
  const [currentAlerts, setCurrentAlerts] = useRecoilState(
    currentAlertsInputState
  );
  console.log('current alerts', currentAlerts);
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
              Check Period
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
            <Row key={alert.alertName} row={alert} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

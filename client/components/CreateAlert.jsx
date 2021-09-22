import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditorContainer from './EditorContainer';
import { Link } from '@material-ui/core';
import {
  indexPatternsState,
  createAlertInputState,
  currentAlertsState,
  lastChosenIndexPatternState,
  monitorFrequencyInputState,
} from '../atom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import SelectBox from './SelectBox';

const defaultStateValues = {
  alertName: '',
  monitorFrequency: '',
  monitorFrequencyUnit: '',
  emailAddress: '',
  emailSubject: '',
  emailBody:
    'Within the last hour, there was at least one log with "ERROR" in it. The message was: {{log}}',
  indexPattern: '',
};

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [indexPatterns, setIndexPatterns] = useRecoilState(indexPatternsState);
  const [createAlertInput, setCreateAlertInput] = useRecoilState(
    createAlertInputState
  );
  const [currentAlerts, setCurrentAlerts] = useRecoilState(currentAlertsState);
  const [lastChosenIndexPattern, setLastChosenIndexPattern] = useRecoilState(
    lastChosenIndexPatternState
  );
  const [monitorFrequency, setMonitorFrequency] = useRecoilState(
    monitorFrequencyInputState
  );

  useEffect(() => {
    axios
      .get('/indexpatterns')
      .then((result) => setIndexPatterns(result.data))
      .catch((error) => console.log('Error in CreateAlert useEffect: ', error));
  }, []);
  useEffect(() => {
    let activateCreateButton = true;
    for (const key in createAlertInput) {
      if (createAlertInput[key] === '' && key !== 'indexPattern')
        activateCreateButton = false;
    }
    if (lastChosenIndexPattern === '') activateCreateButton = false;
    setDisableButton(!activateCreateButton);
  }, [createAlertInput, lastChosenIndexPattern]);

  const handleChange = (event) => {
    const newCreateAlertInput = { ...createAlertInput };
    //the Editor component automatically sends the value instead of the event to the handleChange function
    if (typeof event === 'string') {
      newCreateAlertInput.editorContents = event;
      setCreateAlertInput(newCreateAlertInput);
    } else {
      newCreateAlertInput[event.target.id] = event.target.value;
      setCreateAlertInput(newCreateAlertInput);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const newCreateAlertInput = Object.assign(
      { ...createAlertInput },
      defaultStateValues
    );
    setMonitorFrequency('');
    setCreateAlertInput(newCreateAlertInput);
  };

  // add new alert to the state that contains all user's alerts
  const handleClickCreate = () => {
    const newAlert = {
      ...createAlertInput,
      indexPattern: lastChosenIndexPattern,
    };
    axios
      .post('/alerts', { alert: newAlert })
      .then((result) => {
        setCurrentAlerts(result.data);
        setOpen(false);
        const newCreateAlertInput = Object.assign(
          { ...createAlertInput },
          defaultStateValues
        );
        setMonitorFrequency('');
        setCreateAlertInput(newCreateAlertInput);
      })
      .catch((error) =>
        console.log('Error in CreateAlert handleClickCreate: ', error)
      );
  };

  // handle change func passed down to the index pattern select box
  const handleDropdownChange = (event) => {
    setLastChosenIndexPattern(event.target.value);
  };
  // unit options for dropdowns
  const units = ['day(s)', 'hour(s)', 'minute(s)', 'second(s)'];
  // array from 1 to 60
  const numbers = Array.from({ length: 60 }, (_, i) => i + 1);

  // converts a frequency to milliseconds
  const frequencyConverter = (frequency, value) => {
    let adjustedFrequency = frequency;
    switch (value) {
    case 'day(s)':
      adjustedFrequency *= 86400 * 1000;
      break;
    case 'hour(s)':
      adjustedFrequency *= 3600 * 1000;
      break;
    case 'minute(s)':
      adjustedFrequency *= 60 * 1000;
      break;
    case 'second(s)':
      adjustedFrequency *= 1000;
      break;
    default:
      console.log('Error in frequencyConverter');
      break;
    }
    return adjustedFrequency;
  };

  const handleMonitorFrequencyChange = (event) => {
    setMonitorFrequency(event.target.value);
  };
  const handleMonitorFrequencyUnitChange = (event) => {
    // convert frequency to milliseconds and add to state
    const convertedMonitorFrequency = frequencyConverter(
      monitorFrequency,
      event.target.value
    );
    setCreateAlertInput({
      ...createAlertInput,
      monitorFrequency: convertedMonitorFrequency,
      monitorFrequencyUnit: event.target.value,
    });
  };
  return (
    <div>
      <Button
        style={{
          background:
            'linear-gradient( to right bottom, var(--color-card-primary), var(--color-primary-light))',
          color: '#faf9f9',
        }}
        onClick={handleClickOpen}
      >
        Create Alert
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id='form-dialog-title'>Create Alert</DialogTitle>
        <DialogContent>
          <DialogContentText margin='dense'>
            Configure your alert details below.
          </DialogContentText>
          <div className='create-alert-details'>
            <TextField
              size='small'
              required
              margin='normal'
              label='Alert Name'
              id='alertName'
              variant='outlined'
              className='create-alert-input'
              value={createAlertInput.alertName}
              onChange={handleChange}
              style={{ marginRight: '.25rem' }}
            />
            <SelectBox
              optionsArray={indexPatterns}
              labelText='Index Pattern'
              valueProp={lastChosenIndexPattern}
              handleChange={handleDropdownChange}
              styleProp={{ marginLeft: '.25rem' }}
              inputLabelId='index-pattern-dropdown-label'
              selectId='index-pattern-dropdown'
            />
            <SelectBox
              optionsArray={numbers}
              labelText='Monitoring Frequency'
              valueProp={monitorFrequency}
              handleChange={handleMonitorFrequencyChange}
              styleProp={{ marginRight: '.25rem', marginLeft: '.25rem' }}
              inputLabelId='monitor-frequency-dropdown-label'
              selectId='monitor-frequency-dropdown'
            />
            <SelectBox
              optionsArray={units}
              labelText='Unit'
              valueProp={createAlertInput.monitorFrequencyUnit}
              handleChange={handleMonitorFrequencyUnitChange}
              styleProp={{ marginRight: '.25rem', marginLeft: '.25rem' }}
              inputLabelId='monitor-frequency-unit-dropdown-label'
              selectId='monitor-frequency-unit-dropdown'
            />
          </div>
          <DialogContentText margin='dense'>
            Use the editor below to enter the customized rule for your alert.
          </DialogContentText>
          <div className='editor-container-div'>
            <EditorContainer
              editorContents={createAlertInput.editorContents}
              handleChange={handleChange}
            />
          </div>
          <div className='action-details'>
            <TextField
              size='small'
              required
              margin='normal'
              id='emailAddress'
              label='Email Address'
              type='email'
              variant='outlined'
              className='create-alert-input'
              value={createAlertInput.emailAddress}
              onChange={handleChange}
              style={{ marginRight: '.25rem' }}
            />
            <TextField
              size='small'
              required
              margin='normal'
              label='Subject'
              id='emailSubject'
              variant='outlined'
              className='create-alert-input'
              value={createAlertInput.emailSubject}
              onChange={handleChange}
              style={{ marginRight: '.25rem', marginLeft: '.25rem' }}
            />
          </div>
          <DialogContentText margin='dense'>
            In the email body, you can use&nbsp;
            <Link
              href='https://mustache.github.io/mustache.5.html'
              target='_blank'
            >
              &#123;&#123; mustache &#125;&#125;
            </Link>
            &nbsp;template syntax to access any field from the log that had the
            highest score of your hits.
          </DialogContentText>
          <TextField
            size='small'
            required
            id='emailBody'
            multiline
            margin='dense'
            rows={4}
            label='Email Body'
            variant='outlined'
            fullWidth
            value={createAlertInput.emailBody}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            color='primary'
            disabled={disableButton}
            onClick={handleClickCreate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

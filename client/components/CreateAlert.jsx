import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditorContainer from './EditorContainer';
import sendEmail from '../../server/email_smtp';
import {
  indexPatternsState,
  createAlertInputState,
  currentAlertsInputState,
  lastChosenIndexPatternState,
} from '../atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import SelectBox from './SelectBox';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [indexPatterns, setIndexPatterns] = useRecoilState(indexPatternsState);
  const [createAlertInput, setCreateAlertInput] = useRecoilState(
    createAlertInputState
  );
  const [currentAlerts, setCurrentAlerts] = useRecoilState(
    currentAlertsInputState
  );
  const lastChosenIndexPattern = useRecoilValue(lastChosenIndexPatternState);
  useEffect(() => {
    axios
      .get('/indexpatterns')
      .then((result) => setIndexPatterns(result.data))
      .catch((error) => console.log('Error in CreateAlert useEffect: ', error));
  }, []);

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
  };

  // add new alert to the state that contains all user's alerts
  const handleClickCreate = () => {
    console.log(createAlertInput);
    const newCurrentAlerts = [...currentAlerts];
    newCurrentAlerts.push({
      ...createAlertInput,
      indexPattern: lastChosenIndexPattern,
    });
    setCurrentAlerts(newCurrentAlerts);
    console.log(currentAlerts);
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
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
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
            <TextField
              size='small'
              required
              margin='normal'
              label='Recheck Every'
              id='monitorFrequency'
              variant='outlined'
              className='create-alert-input'
              value={createAlertInput.monitorFrequency}
              onChange={handleChange}
              style={{ marginRight: '.25rem', marginLeft: '.25rem' }}
            />
            <TextField
              size='small'
              required
              margin='normal'
              label='Renotify Every'
              id='notificationFrequency'
              variant='outlined'
              className='create-alert-input'
              value={createAlertInput.notificationFrequency}
              onChange={handleChange}
              style={{ marginRight: '.25rem', marginLeft: '.25rem' }}
            />
            <SelectBox indexPatterns={indexPatterns} />
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
          <TextField
            size='small'
            required
            id='emailBody'
            multiline
            margin='normal'
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
          <Button color='primary' onClick={handleClickCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

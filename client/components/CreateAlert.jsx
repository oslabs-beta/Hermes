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
import { indexPatternsState } from '../atom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import SelectBox from './SelectBox';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [indexPatterns, setIndexPatterns] = useRecoilState(indexPatternsState);
  useEffect(() => {
    console.log('CreateAlert is updating');
    axios
      .get('/indexpatterns')
      .then((array) => setIndexPatterns(array))
      .catch((error) => console.log('Error in CreateAlert useEffect: ', error));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <TextField margin='normal' label='Alert Name' variant='outlined' />
            <TextField
              margin='normal'
              label='Recheck Every'
              variant='outlined'
            />
            <TextField
              margin='normal'
              label='Renotify Every'
              variant='outlined'
            />
            <SelectBox indexPatterns={indexPatterns} />
          </div>
          <DialogContentText margin='dense'>
            Use the editor below to enter the customized rule for your alert.
          </DialogContentText>
          <div className='editor-container-div'>
            <EditorContainer />
          </div>
          <div className='action-details'>
            <TextField margin='normal' label='Name' variant='outlined' />
            <TextField
              margin='normal'
              id='name'
              label='Email Address'
              type='email'
              variant='outlined'
            />
            <TextField margin='normal' label='Subject' variant='outlined' />
          </div>
          <TextField
            id='outlined-multiline-static'
            multiline
            margin='normal'
            rows={4}
            label='Email Body'
            variant='outlined'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

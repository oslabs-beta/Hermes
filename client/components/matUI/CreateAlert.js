import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button style= {{background: 'linear-gradient( to right bottom, var(--color-card-primary), var(--color-primary-light))', color: '#faf9f9'}} onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <div className="create-alert-details">
            <TextField margin='dense' label='Alert Name'/>
            <TextField margin='dense' label='Recheck Every'/>
            <TextField margin='dense' label='Renotify Every'/>
          </div>
          <div className="action-details">
					  <TextField margin='normal' label='Name'/>
            <TextField
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
            />
					  <TextField margin='normal' label='Subject'/>
            
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

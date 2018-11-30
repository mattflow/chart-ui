import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

export default function ConfirmAlert(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onNoClick}
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you would like to perform this action?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onNoClick} color="secondary">
          No
        </Button>
        <Button onClick={props.onYesClick} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
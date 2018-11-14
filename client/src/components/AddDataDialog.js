import React from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
} from '@material-ui/core';
import { SwatchesPicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2,
  },
  label: {
    display: 'block',
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
});

function AddDataDialog(props) {
  const { classes } = props;
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>Add Data</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.bottomMargin}
          label="Label"
          fullWidth
          type="text"
          value={props.label}
        >
        </TextField>
        <TextField
          className={classes.bottomMargin}
          label="Value"
          fullWidth
          type="number"
          value={props.value}
        >
        </TextField>
        <InputLabel
          className={classes.label}
        >
          Color
        </InputLabel>
        <SwatchesPicker
          className={classes.bottomMargin}
          color={props.color} 
        />
        <DialogActions>
          <Button color="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={props.handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles, { withTheme: true })(AddDataDialog);
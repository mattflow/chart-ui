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

class AddDataDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
      value: '',
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
    }
  }

  handleConfirmClick = () => {
    const r = this.state.color.r;
    const g = this.state.color.g;
    const b = this.state.color.b;
    const backgroundColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
    const borderColor = `rgba(${r}, ${g}, ${b})`;
    this.props.handleAdd(this.state.label, this.state.value, backgroundColor, borderColor);
    this.setState({
      label: '',
      value: '',
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
    });
    this.props.handleClose();
  }

  handleLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  }

  handleValueChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handleColorChange = (color) => {
    this.setState({
      color: color.rgb,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            className={classes.bottomMargin}
            label="Label"
            fullWidth
            type="text"
            value={this.props.label}
            onChange={this.handleLabelChange}
          >
          </TextField>
          <TextField
            className={classes.bottomMargin}
            label="Value"
            fullWidth
            type="number"
            value={this.props.value}
            onChange={this.handleValueChange}
          >
          </TextField>
          <InputLabel
            className={classes.label}
          >
            Color
          </InputLabel>
          <SwatchesPicker
            className={classes.bottomMargin}
            color={this.state.color} 
            onChange={this.handleColorChange}
          />
          <DialogActions>
            <Button color="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleConfirmClick}>
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddDataDialog);
import React from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import StarIcon from '@material-ui/icons/Star';


export default class FeedbackDialog extends React.Component {
  onClose = () => {
    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose}
      >
        <DialogTitle>
          Feedback
        </DialogTitle>
        <DialogContent>
          <Typography variant="body">
            How has your experience been?
          </Typography>
          <Toolbar>
            <StarRatingComponent />
          </Toolbar>
          <TextField multiline label="Comments" />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.onClose}>Skip</Button>
          <Button color="primary" onClick={this.onClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
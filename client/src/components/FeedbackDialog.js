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
} from '@material-ui/core';


export default class FeedbackDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      surveyStarted: false,
      dontAskCheck: false,
    };
  }

  onClose = () => {
    if (this.state.dontAskCheck) {
      localStorage.setItem('dontAsk', "true");
    }
    this.props.onClose();
  }

  getActions(step) {
    if (step >= 2) {
      return <Button onClick={this.props.onClose} color="primary">Download</Button>;
    } else {
      return (
        <div>
          <Button color="secondary">Skip</Button>
          <Button color="primary">Submit</Button>
        </div>
      );
    }
  }

  handleSkipClick = () => {
    this.setState(prevState => ({
      activeStep: prevState + 1,
    }));
  }

  handleCompleteSurveyClick = () => {
    this.setState({
      surveyStarted: true,
    });
  }

  handleDontAskChange = () => {
    this.setState(prevState => ({
      dontAskCheck: !prevState.dontAskCheck,
    }));
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose}
      >
        <DialogTitle>
          User Feedback
        </DialogTitle>
        <DialogContent>
          {this.state.surveyStarted ? (
            <Stepper activeStep={this.state.activeStep}>
              <Step>
                <StepLabel>Ease of Use</StepLabel>
              </Step>
              <Step>
                <StepLabel>Feedback</StepLabel>
              </Step>
              <Step>
                <StepLabel>Complete</StepLabel>
              </Step>
            </Stepper>
          ) : (
            <DialogContentText>
              I am always looking for user feedback to improve this tool.
              If you wouldn't mind, you can complete a short, optional survey to help
              me make this free site better!
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {this.state.surveyStarted ? this.getActions(this.state.activeStep) : (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.dontAskCheck}
                    value="dontAskCheck"
                    color="primary"
                    onChange={this.handleDontAskChange}
                  />
                }
                label="Don't ask again"
              />
              <Button color="secondary" onClick={this.onClose}>Skip</Button>
              <Button color="primary" onClick={this.handleCompleteSurveyClick}>Complete Survey</Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}
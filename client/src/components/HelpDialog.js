import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  appBar: {
    position: 'relative',
    //marginBottom: theme.spacing.unit * 2,
  },
  flex: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
  },
  helpSection: {
    marginBottom: theme.spacing.unit * 3,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  render() {
    const { classes } = this.props;
    let title = '';
    if (this.props.type === 'bar') {
      title = 'Bar Chart Help';
    }
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 20 }}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <div>
                <div className={classes.helpSection}>
                  <Typography variant="h5" gutterBottom>
                    Setting a title
                  </Typography>
                  <Typography variant="body" gutterBottom>
                    The title of the chart can be set by typing the desired text into the input labeled "Title." This input
                    is located in the "Details" section on the left side of the page (Top of the page on mobile).
                  </Typography>
                </div>
                <div className={classes.helpSection}>
                  <Typography variant="h5" gutterBottom>
                    Setting Axis Labels
                  </Typography>
                  <Typography variant="body" gutterBottom>
                    The axis labels on the chart can be set by typing the desired text into the inputs labeled "X Axis Label" or "Y Axis Label."
                    These inputs are located in the "Details" section on the left side of the page (Top of the page on mobile).
                  </Typography>
                </div>
                <div className={classes.helpSection}>
                  <Typography variant="h5" gutterBottom>
                    Adding Data to the Chart
                  </Typography>
                  <Typography variant="body" gutterBottom>
                    Data can be added to the chart by selecting the "ADD DATA" button on the top-left of the page. This will
                    open a dialog popup where you can enter the label (what appears below the bar), value (the height of the bar), and color.
                    When finished filling out these fields, pressing the "CONFIRM" button at the bottom of the popup will
                    add the new data item.
                  </Typography>
                </div>
                <div className={classes.helpSection}>
                  <Typography variant="h5" gutterBottom>
                    Editing Existing Data
                  </Typography>
                  <Typography variant="body" gutterBottom>
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullScreenDialog);
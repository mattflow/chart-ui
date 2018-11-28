import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TinyChart from '../components/TinyChart';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    width: '100%',
  },
});

function Showcase(props) {
  const { classes } = props;
  return (
    <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Showcase
            <hr />
          </Typography>
        </Grid>
        <Grid item lg={3} md={6} sm={12}>
          <Paper className={classes.paper}>
            <TinyChart index={0} />
            <Button color="primary">View</Button>
          </Paper>
        </Grid>
        <Grid item lg={3} md={6} sm={12}>
          <Paper className={classes.paper}>
            <TinyChart index={1} />
            <Button color="primary">View</Button>
          </Paper>
        </Grid>
        <Grid item lg={3} md={6} sm={12}>
          <Paper className={classes.paper}>
            <TinyChart index={2} />
            <Button color="primary">View</Button>
          </Paper>
        </Grid>
        <Grid item lg={3} md={6} sm={12}>
          <Paper className={classes.paper}>
            <TinyChart index={3} />
            <Button color="primary">View</Button>
          </Paper>
        </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(Showcase);
import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';

export default function Line() {
  return (
    <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Line Graph
            <hr />
          </Typography>
          <Typography variant="body1">Coming soon!</Typography>
        </Grid>
    </Grid>
  );
};
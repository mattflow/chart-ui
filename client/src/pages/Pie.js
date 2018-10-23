import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';

export default function Pie() {
  return (
    <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Pie Chart
            <hr />
          </Typography>
          <Typography variant="h5">Coming soon!</Typography>
        </Grid>
    </Grid>
  );
};
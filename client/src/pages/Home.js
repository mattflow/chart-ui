import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>Welcome to Chart UI!</Typography>
        <Typography variant="body1" gutterBottom>
          Chart UI is a free and easy to use interface for creating great looking charts.
          Charting programs can be difficult to use and often cost money. This tool helps
          users of all ages create visually appealing charts and graphs for any purpose.
          It uses chart.js behind the scenes but provides the user with an easy interface
          for adding multiple datasets and data points.
        </Typography>
        <Typography variant="body1" gutterBottom>
          This method of creating graphs is similar to creating a graph by hand, except
          easier to update, delete and add new data on the fly. Many users will have less
          headaches with this method than they would entering all the data at once, and
          generating an all-or-nothing graph afterwards like in Excel.
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can get started by choosing your chart type in the menu!
        </Typography>
      </Grid>
    </Grid>
  );
};

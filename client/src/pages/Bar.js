import React, { Component } from 'react';
import Chart from 'chart.js';
import { withStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Grid,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Toolbar,
} from '@material-ui/core';

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Data {
  constructor(value, backgroundColor, borderColor) {
    this.value = value;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
  }
}

class Dataset {
  constructor(label) {
    this.label = label;
    this.data = [];
    this.backgroundColor = [];
    this.borderColor = [];
    this.borderWidth = 1;
  }

  addData(data) {
    this.data.push(data.value);
    this.backgroundColor.push(data.backgroundColor);
    this.borderColor.push(data.borderColor);
  }
}

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: [],
    };
    this.chart = undefined;
  }
  componentDidMount() {
    const ctx = document.getElementById('chart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  handleNewDatasetClick = () => {
    const dataset = new Dataset(`Dataset ${this.state.datasets.length + 1}`);
    const newState = update(this.state, {
      datasets: {$push: [dataset]},
    });

    this.setState(newState);

    this.chart.data.datasets.push(dataset);
    this.chart.update();
  }

  handleChartClearClick = () => {
    this.setState({
      labels: [],
      datasets: [],
    });
    this.chart.labels = [];
    this.chart.data.datasets = [];
    this.chart.update();
  }

  handleDatasetLabelChange = (index) => {
    return (e) => {
      const newState = update(this.state, {
        datasets: {[index]: {label: {$set: e.target.value}}}
      });
      this.setState(newState);

      this.chart.data.datasets[index].label = e.target.value;
      this.chart.update();
    }
  }

  handleChartDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', this.chart.toBase64Image());
    element.setAttribute('download', 'barchart.png');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Bar Chart
            <hr />
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.bottomMargin}>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleNewDatasetClick}
            >
              Add Dataset
            </Button>
            <Button
              color="secondary"
              className={classes.button}
              onClick={this.handleChartClearClick}
            >
              Clear Chart
            </Button>
          </div>
          <div className={classes.bottomMargin}>
            {this.state.datasets.map((dataset, index) => 
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <TextField
                    type="text"
                    value={dataset.label}
                    fullWidth
                    onChange={this.handleDatasetLabelChange(index)}
                  />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Button
                    color="primary"
                    className={classes.button}
                  >
                    Add Data
                  </Button>
                  <Button
                    color="secondary"
                  >
                    Remove Dataset
                  </Button>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <canvas id="chart"></canvas>
          <Toolbar>
            <Button
              color="secondary"
              onClick={this.handleChartDownload}
            >
              Download Chart
            </Button>
          </Toolbar>
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(styles, { withTheme: true })(Bar);
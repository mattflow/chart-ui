import React, { Component } from 'react';
import Chart from 'chart.js';
import { withStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Paper,
  TextField,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import AddDataDialog from '../components/AddDataDialog';

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  tablePaper: {
    padding: 0,
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
    //this.borderWidth = 1;
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
      label: '',
      labels: [],
      data: [],
      backgroundColor: [],
      borderColor: [],
      addDataDialogOpen: false,
    };
    this.chart = undefined;
  }
  componentDidMount() {
    const ctx = document.getElementById('chart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        }],
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

  handleAddDataClick = () => {
    this.setState({
      addDataDialogOpen: true,
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
      label: '',
      labels: [],
      data: [],
      backgroundColor: [],
      borderColor: [],
    });
    this.chart.data.labels = [];
    this.chart.data.datasets = [{
      label: '',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }];
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
    element.setAttribute('target', '_blank');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  handleAddDataDialogClose = () => {
    this.setState({
      addDataDialogOpen: false,
    });
  }

  handleLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });

    this.chart.data.datasets[0].label = e.target.value;
    this.chart.update();
  }

  handleDataAdd = (label, data, backgroundColor, borderColor) => {
    const newState = update(this.state, {
      labels: {$push: [label]},
      data: {$push: [data]},
      backgroundColor: {$push: [backgroundColor]},
      borderColor: {$push: [borderColor]},
    });

    this.chart.data.labels.push(label);
    this.chart.data.datasets.forEach(dataset => {
      dataset.data.push(data);
      dataset.backgroundColor.push(backgroundColor);
      dataset.borderColor.push(borderColor);
    });

    this.chart.update();

    this.setState(newState);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Bar Chart
            <hr />
          </Typography>
        </Grid>
        <AddDataDialog 
          open={this.state.addDataDialogOpen} 
          handleClose={this.handleAddDataDialogClose}
          handleAdd={this.handleDataAdd}
        />
        <Grid item xs={12} md={6} lg={4}>
          <div className={classes.bottomMargin}>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleAddDataClick}
            >
              Add Data
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
            <Paper className={classes.paper} elevation={1}>
              <TextField
                type="text"
                value={this.state.label}
                onChange={this.handleLabelChange}
                label="Dataset Name"
                fullWidth
                gutterBottom
              />
            </Paper>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Data
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.tablePaper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Label</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.labels.map((label, index) => (
                      <TableRow style={{ backgroundColor: this.state.backgroundColor[index] }}>
                        <TableCell>{label}</TableCell>
                        <TableCell>{this.state.data[index]}</TableCell>
                        <TableCell>
                          <IconButton aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {/*this.state.datasets.map((dataset, index) => 
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
                    onClick={this.handleAddDataClick}
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
            )*/}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
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
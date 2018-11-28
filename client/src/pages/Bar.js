import React, { Component } from 'react';
import Chart from 'chart.js';
import { withStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Sortable from 'sortablejs';
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
      xlabel: '',
      ylabel: '',
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
            scaleLabel: {
              display: true,
              labelString: '',
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: '',
            },
          }],
        },
      },
    });
    const dataTable = document.getElementById('dataTable');
    const sortableDataTable = Sortable.create(dataTable);
  }

  handleAddDataClick = () => {
    this.setState({
      addDataDialogOpen: true,
    });
  }

  handleChartClearClick = () => {
    this.setState({
      label: '',
      ylabel: '',
      xlabel: '',
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
    this.chart.options.scales.xAxes[0].scaleLabel.labelString = '';
    this.chart.options.scales.yAxes[0].scaleLabel.labelString = '';
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

  handleXLabelChange = (e) => {
    this.setState({
      xlabel: e.target.value,
    });

    this.chart.options.scales.xAxes[0].scaleLabel.labelString = e.target.value;
    this.chart.update();
  }

  handleYLabelChange = (e) => {
    this.setState({
      ylabel: e.target.value,
    });

    this.chart.options.scales.yAxes[0].scaleLabel.labelString = e.target.value;
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

  handleDataDelete = (index) => {
    return () => {
      const newState = update(this.state, {
        data: {$splice: [[index, 1]]},
        labels: {$splice: [[index, 1]]},
        backgroundColor: {$splice: [[index, 1]]},
        borderColor: {$splice: [[index, 1]]},
      });
      this.setState(newState);
      this.chart.data.labels.splice(index, 1);
      this.chart.data.datasets.forEach(dataset => {
        dataset.data.splice(index, 1);
        dataset.backgroundColor.splice(index, 1);
        dataset.borderColor.splice(index, 1);
      });
      this.chart.update();
    }
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
                className={classes.bottomMargin}
              />
              <TextField
                type="text"
                value={this.state.xlabel}
                onChange={this.handleXLabelChange}
                label="X Axis Label"
                fullWidth
                gutterBottom
                className={classes.bottomMargin}
              />
              <TextField
                type="text"
                value={this.state.ylabel}
                onChange={this.handleYLabelChange}
                label="Y Axis Label"
                fullWidth
                gutterBottom
                className={classes.bottomMargin}
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
                  <TableBody id="dataTable">
                    {this.state.labels.map((label, index) => (
                      <TableRow style={{ backgroundColor: this.state.backgroundColor[index] }}>
                        <TableCell>{label}</TableCell>
                        <TableCell>{this.state.data[index]}</TableCell>
                        <TableCell>
                          <IconButton onClick={this.handleDataDelete(index)} aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
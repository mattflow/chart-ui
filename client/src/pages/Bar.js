import React, { Component } from 'react';
import Chart from 'chart.js';
import { withStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Sortable from 'sortablejs';
import CreateIcon from '@material-ui/icons/Create';
import HelpIcon from '@material-ui/icons/Help';
import ConfirmAlert from '../components/ConfirmAlert';
import HelpDialog from '../components/HelpDialog';
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
  tableIcon: {
    fontSize: '1.2rem',
  },
  helpButton: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
    zIndex: 999999999,
  },
  noPadding: {
    padding: 0,
  },
  draggableRow: {
    cursor: 'move',
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
      showConfirm: false,
      editData: undefined,
      showHelpDialog: false,
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
    Sortable.create(document.getElementById('dataTable'), {
      onUpdate: (e) => {
        const labels = [];
        const data = [];
        const backgroundColor = [];
        const borderColor = [];

        this.state.labels.forEach((label, i) => {
          if (i !== e.oldIndex) {
            if (i === e.newIndex) {
              labels.push(this.state.labels[e.oldIndex]);
              data.push(this.state.data[e.oldIndex]);
              backgroundColor.push(this.state.backgroundColor[e.oldIndex]);
              borderColor.push(this.state.borderColor[e.oldIndex]);
            }
            labels.push(this.state.labels[i]);
            data.push(this.state.data[i]);
            backgroundColor.push(this.state.backgroundColor[i]);
            borderColor.push(this.state.borderColor[i]);
          }
        });

        this.chart.data.labels = labels;
        this.chart.data.datasets.forEach(dataset => {
          dataset.data = data;
          dataset.backgroundColor = backgroundColor;
          dataset.borderColor = borderColor;
        });
        this.chart.update();

        this.setState({
          labels,
          data,
          backgroundColor,
          borderColor,
        });
      },
    });
    const data = JSON.parse(localStorage.getItem('data'));
    if (localStorage && data) {
      this.setState({
        label: data.label,
        labels: data.labels,
        data: data.data,
        backgroundColor: data.backgroundColor,
        borderColor: data.borderColor,
        xlabel: data.xlabel,
        ylabel: data.ylabel,
      });

      this.chart.data.labels = data.labels;
      this.chart.data.datasets.forEach(dataset => {
        dataset.label = data.label;
        dataset.data = data.data;
        dataset.backgroundColor = data.backgroundColor;
        dataset.borderColor = data.borderColor;
      });

      this.chart.options.scales.xAxes[0].scaleLabel.labelString = data.xlabel;
      this.chart.options.scales.yAxes[0].scaleLabel.labelString = data.ylabel;
      this.chart.update();
    }
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
    if (localStorage) {
      localStorage.removeItem('data');
    }
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

  handleShowHelpClick = () => {
    this.setState({
      showHelpDialog: true,
    });
  }

  handleHelpDialogClose = () => {
    this.setState({
      showHelpDialog: false,
    });
  }

  handleLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });

    this.chart.data.datasets[0].label = e.target.value;
    this.chart.update();
  }

  componentDidUpdate() {
    if (localStorage) {
      localStorage.setItem('data', JSON.stringify(this.state));
    }
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

  handleDataEdit = (label, data, backgroundColor, borderColor) => {
    const index = this.state.editData.index;
    const newState = update(this.state, {
      labels: {[index]: {$set: label}},
      data: {[index]: {$set: data}},
      backgroundColor: {[index]: {$set: backgroundColor}},
      borderColor: {[index]: {$set: borderColor}},
    });

    this.chart.data.labels[index] = label;
    this.chart.data.datasets.forEach(dataset => {
      dataset.data[index] = data;
      dataset.backgroundColor[index] = backgroundColor;
      dataset.borderColor[index] = borderColor;
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

  handleDataEditClick = (index) => {
    return () => {
      const rgb = this.chart.data.datasets[0].borderColor[index].replace(/[^\d,.]/g, '').split(',')
      const editData = {
        index,
        label: this.chart.data.labels[index],
        value: this.chart.data.datasets[0].data[index],
        color: {
          r: rgb[0],
          g: rgb[1],
          b: rgb[2],
        },
      };
      this.setState({
        editData,
      });
    };
  }

  handleEditDataDialogClose = () => {
    this.setState({
      editData: undefined,
    });
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
        <ConfirmAlert 
          open={this.state.showConfirm}
          onYesClick={() => {}}
          onNoClick={() => { this.setState({ showConfirm: false }); }}
        />
        <AddDataDialog 
          open={this.state.addDataDialogOpen} 
          handleClose={this.handleAddDataDialogClose}
          handleAdd={this.handleDataAdd}
        />
        <HelpDialog open={this.state.showHelpDialog} type="bar" onClose={this.handleHelpDialogClose} />
        {this.state.editData && <AddDataDialog
          open={true}
          handleClose={this.handleEditDataDialogClose}
          handleAdd={this.handleDataEdit}
          label={this.state.editData.label}
          value={this.state.editData.value}
          color={this.state.editData.color}
        />}
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
              <Typography className={classes.bottomMargin} variant="h6">
                Configuration
              </Typography>
              <TextField
                type="text"
                value={this.state.label}
                onChange={this.handleLabelChange}
                label="Title"
                fullWidth
                className={classes.bottomMargin}
              />
              <TextField
                type="text"
                value={this.state.xlabel}
                onChange={this.handleXLabelChange}
                label="X Axis Label"
                fullWidth
                className={classes.bottomMargin}
              />
              <TextField
                type="text"
                value={this.state.ylabel}
                onChange={this.handleYLabelChange}
                label="Y Axis Label"
                fullWidth
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
                      <TableCell padding="dense">Label</TableCell>
                      <TableCell padding="dense">Value</TableCell>
                      <TableCell padding="none"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody id="dataTable">
                    {this.state.labels.map((label, index) => (
                      <TableRow key={Math.random()} className={classes.draggableRow} style={{ backgroundColor: this.state.backgroundColor[index] }}>
                        <TableCell padding="dense">{label}</TableCell>
                        <TableCell padding="dense">{this.state.data[index]}</TableCell>
                        <TableCell padding="none">
                          <Toolbar className={classes.noPadding}>
                            <IconButton onClick={this.handleDataEditClick(index)} aria-label="Delete">
                              <CreateIcon className={classes.tableIcon} />
                            </IconButton>
                            <IconButton onClick={this.handleDataDelete(index)} aria-label="Delete">
                              <DeleteIcon className={classes.tableIcon} />
                            </IconButton>
                          </Toolbar>
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
        <Button style={{ display: this.state.showHelpDialog ? 'none' : 'block' }} variant="fab" color="secondary" aria-label="help" onClick={this.handleShowHelpClick} className={classes.helpButton}>
          <HelpIcon />
        </Button>
      </Grid>
    );
  }
};

export default withStyles(styles, { withTheme: true })(Bar);
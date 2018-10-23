import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Drawer,
  SwipeableDrawer,
  Divider,
  Toolbar,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  AppBar,
  IconButton,
  Typography,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const colorTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
    };
  }

  handleNavToggle = () => {
    this.setState(state => ({ navOpen: !state.navOpen }));
  }

  handleNavClick = (route) => {
    return () => {
      setTimeout(() => {
        this.props.history.push(route);
        this.setState({
          navOpen: false,
        });
      }, 150);
    };
  }

  render() {
    const { classes } = this.props;

    const drawerContent = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key="Home" onClick={this.handleNavClick('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="Bar" onClick={this.handleNavClick('/bar')}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Bar" />
          </ListItem>
          <ListItem button key="Line" onClick={this.handleNavClick('/line')}>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary="Line" />
          </ListItem>
          <ListItem button key="Pie" onClick={this.handleNavClick('/pie')}>
            <ListItemIcon>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary="Pie" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <MuiThemeProvider theme={colorTheme}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleNavToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Chart UI
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
              <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                variant="temporary"
                open={this.state.navOpen}
                onOpen={this.handleNavToggle}
                onClose={this.handleNavToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                {drawerContent}
              </SwipeableDrawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawerContent}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.array,
};

export default withRouter(withStyles(styles, { withTheme: true })(Layout));
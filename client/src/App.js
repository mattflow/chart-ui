import React, { Component } from 'react';
import { blue, pink } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

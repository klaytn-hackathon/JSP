/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';

import { Home, New } from '../pages';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3a84ff' },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Spoqa Han Sans, Spoqa Han Sans JP, Sans-serif',
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Route exact path="/" component={Home} />
        <Route exact path="/new" component={New} />
      </MuiThemeProvider>
    );
  }
}

export default App;

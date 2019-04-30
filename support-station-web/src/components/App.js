/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Grommet } from 'grommet';
import PageTemplate from './PageTemplate';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

class App extends Component {
  render() {
    return (
      <Grommet theme={theme}>
        <PageTemplate>Child</PageTemplate>
      </Grommet>
    );
  }
}

export default App;

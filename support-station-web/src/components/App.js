import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import NewContainer from '../containers/NewContainer';
import { Home, Show } from '../pages';
import reducers from '../reducers';

const store = createStore(
  reducers,
);

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3a84ff' },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Spoqa Han Sans, Spoqa Han Sans JP, Sans-serif',
  },
});

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/petitions/new" component={NewContainer} />
          <Route path="/petitions/:id" component={Show} />
        </Switch>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;

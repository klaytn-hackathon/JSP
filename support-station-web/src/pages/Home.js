import React from 'react';
import Grid from '@material-ui/core/Grid';

import Menu from '../components/Menu';
import Main from '../components/Main';

const Home = () => (
  <div>
    <Grid container spacing={0}>
      <Grid item xs>
        <Menu />
      </Grid>
      <Grid item xs={10}>
        <Main />
      </Grid>
    </Grid>
  </div>
);

export default Home;

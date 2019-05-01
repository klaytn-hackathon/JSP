/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import TopContent from './TopContent';
import MainContent from './MainContent';

const styles = theme => ({
  root: {
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '1px 0 10px 0 rgba(0, 0, 0, 0.03)',
  },
  mainHeader: {
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.05)',
    color: '#94979b',
    padding: theme.spacing.unit * 2,
  },
  content: {
    padding: theme.spacing.unit * 4,
  },
});

function Main(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Grid container spacing={0} direction="column" className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="row"
        spacing={0}
        className={classes.mainHeader}
      >
        <Grid item xs={1}>
          <Search />
        </Grid>
        <Grid item xs>
          Search
        </Grid>
      </Grid>

      <Grid container direction="column" className={classes.content}>
        <TopContent />
        <MainContent />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Main);

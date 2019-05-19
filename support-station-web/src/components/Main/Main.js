/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TopContent from './TopContent';
import MainContent from './MainContent';

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 4,
  },
});

function Main(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Grid container wrap="nowrap" direction="column" className={classes.content}>
      <TopContent />
      <MainContent />
    </Grid>
  );
}

export default withStyles(styles)(Main);

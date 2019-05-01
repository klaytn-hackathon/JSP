/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import {
  Grid, Typography,
} from '@material-ui/core';
import PetitionCard from '../PetitionCard';

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
  topContent: {
    padding: theme.spacing.unit * 4,
  },
  topContentText: {
    fontWeight: 'bold',
    marginBottom: '40px',
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
      <Grid container className={classes.topContent}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.topContentText}>
          TOP3
        </Typography>
        <Grid container spacing={16} direction="row">
          <Grid item xs={4}>
            <PetitionCard />
          </Grid>
          <Grid item xs={4}>
            <PetitionCard />
          </Grid>
          <Grid item xs={4}>
            <PetitionCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Main);

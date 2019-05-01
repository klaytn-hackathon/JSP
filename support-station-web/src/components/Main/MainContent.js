import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PetitionCard from './PetitionCard';

const styles = () => ({
  mainContentText: {
    fontWeight: 'bold',
    marginTop: '56px',
    marginBottom: '40px',
  },
});

function MainContent(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Grid container>
      <Typography gutterBottom variant="h5" component="h2" className={classes.mainContentText}>
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
  );
}
export default withStyles(styles)(MainContent);

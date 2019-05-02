import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PetitionCard from './PetitionCard';

const styles = () => ({
  topContentText: {
    fontWeight: 'bold',
    marginBottom: '40px',
  },
});

function TopContent(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Grid container>
      <Typography gutterBottom variant="h5" component="h2" className={classes.topContentText}>
        Top 3 Petitions
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
export default withStyles(styles)(TopContent);

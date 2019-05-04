import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PetitionCard from './PetitionCard';

const styles = () => ({
  mainContentText: {
    fontWeight: 'bold',
    marginTop: '56px',
    marginBottom: '40px',
  },
  linkButton: {
    textDecoration: 'none',
  },
  writeButtonContainer: {
    textAlign: 'right',
  },
  writeButton: {
    backgroundColor: '#3a84ff',
    borderRadius: '0px 0px 0px 0px;',
  },
  writeButtonText: {
    color: 'white',
  },
});

function MainContent(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;
  // eslint-disable-next-line no-undef
  const writeButton = sessionStorage.getItem('support_station_id')
    ? (
      <Link className={classes.linkButton} to="/new">
        <Button variant="contained" className={classes.writeButton}>
          <div className={classes.writeButtonText}>Write a petition</div>
        </Button>
      </Link>
    ) : ('');

  return (
    <div>
      <Typography gutterBottom variant="h5" component="h2" className={classes.mainContentText}>
        <Grid container direction="row">
          <Grid item xs>
            All Petitions
          </Grid>
          <Grid item xs className={classes.writeButtonContainer}>
            {writeButton}
          </Grid>
        </Grid>
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
    </div>
  );
}
export default withStyles(styles)(MainContent);

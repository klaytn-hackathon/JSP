import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CalendarToday, SupervisorAccount } from '@material-ui/icons';
import {
  Grid, Card, CardContent, CardHeader, Button,
} from '@material-ui/core';

const styles = () => ({
  cardTag: {
    backgroundColor: '#3a84ff',
  },
  cardTagText: {
    color: 'white',
  },
  cardContent: {
    padding: '12px',
  },
  cardFooter: {
    color: '#52575a',
    letterSpacing: '-0.9px',
    fontWeight: '300',
    fontSize: '14px',
    padding: '12px',
  },
});

function PetitionCard(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Card>
      <CardHeader
        avatar={(
          <Button variant="contained" className={classes.cardTag}>
            <div className={classes.cardTagText}>Environment</div>
          </Button>
        )}
      />
      <CardContent className={classes.cardContent}>Content</CardContent>
      <CardContent className={classes.cardFooter}>
        <Grid container direction="row">
          <Grid item xs={8}>
            <Grid container direction="row">
              <Grid item xs={2}>
                <CalendarToday fontSize="small" />
              </Grid>
              <Grid item xs>
                September 14, 2016
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container direction="row">
              <Grid item xs={4}>
                <SupervisorAccount fontSize="small" />
              </Grid>
              <Grid item xs>
                519,199명
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(PetitionCard);

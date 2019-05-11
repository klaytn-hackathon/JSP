import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CalendarToday, SupervisorAccount } from '@material-ui/icons';
import {
  Grid, Card, CardContent, CardHeader, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const styles = () => ({
  cardTag: {
    backgroundColor: '#3a84ff',
  },
  cardTagText: {
    color: 'white',
  },
  cardTitle: {
    padding: '20px',
    fontWeight: 'bold',
    fontFamily: 'Spoqa Han Sans, Spoqa Han Sans JP, Sans-serif',
  },
  cardFooter: {
    color: '#52575a',
    letterSpacing: '-0.9px',
    fontWeight: '300',
    fontSize: '14px',
    padding: '12px',
  },
  cardDate: {
    width: '69px',
    height: '20px',
    fontFamily: 'SpoqaHanSans',
    fontSize: '14px',
    fontWeight: '300',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.9px',
    color: '#52575a',
  },
});

function PetitionCard(props) {
  // eslint-disable-next-line react/prop-types
  const {
    id, classes, title, createdAt, supportCount,
  } = props;

  const formattedDate = moment.utc(createdAt).local().format('YYYY-MM-DD');
  return (
    <Fragment>
      <Link style={{ textDecoration: 'none' }} to={`/petitions/${id}`}>
        <Card>
          <CardHeader
            avatar={(
              <Button variant="contained" className={classes.cardTag}>
                <div className={classes.cardTagText}>Environment</div>
              </Button>
            )}
          />
          <CardContent className={classes.cardTitle}>{title}</CardContent>
          <CardContent className={classes.cardFooter}>
            <Grid container direction="row">
              <Grid item xs={8}>
                <Grid container direction="row">
                  <Grid item xs={2}>
                    <CalendarToday fontSize="small" />
                  </Grid>
                  <Grid item xs>
                    <span className={classes.cardDate}>
                      {formattedDate}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container direction="row">
                  <Grid item xs={4}>
                    <SupervisorAccount fontSize="small" />
                  </Grid>
                  <Grid item xs>
                    {supportCount}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>
    </Fragment>
  );
}

PetitionCard.defaultProps = {
  classes: {},
  title: '',
  createdAt: '',
  supportCount: 0,
};

PetitionCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  supportCount: PropTypes.number,
};

export default withStyles(styles)(PetitionCard);

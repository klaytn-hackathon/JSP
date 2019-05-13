import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import parser from 'html-react-parser';

const styles = theme => ({
  petitionContainer: {
    backgroundColor: 'white',
    padding: '50px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    textAlign: 'center',
    margin: '100px 0 100px 0',
  },
  titleText: {
    fontSize: '40px',
    fontWeight: 'bold',
    [theme.breakpoints.down('lg')]: {
      fontSize: '40px',
    },
    margin: '0 auto 45px auto',
  },
  supportCountText: {
    fontSize: '26px',
    marginBottom: '40px',
  },
  count: {
    color: '#034497',
  },
  petitionInfo: {
    padding: '15px',
    border: '1px solid #d1d1d1',
    borderRadius: '4px',
    backgroundColor: '#f6f6f6',
  },
  petitionInfoText: {
    fontWeight: '600',
  },
  petitionAuthorText: {
    marginTop: '10px',
    color: '#737273',
  },
  petitionAuthorNameText: {
    color: '#034497',
    fontWeight: 'bolder',
  },
  petitionContentContainer: {
    marginTop: '70px',
  },
  petitionContentHeader: {
    borderBottom: '1px solid #d1d1d1',
    paddingBottom: '10px',
    textAlign: 'left',
    marginBottom: '20px',
  },
  petitionContent: {
    padding: '10px',
    textAlign: 'left',
  },
});

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petition: {},
    };
  }

  componentDidMount() {
    this.getPetition();
  }

  getPetition() {
    const { match } = this.props;

    axios.get(`https://5wpzfbe239.execute-api.ap-northeast-2.amazonaws.com/staging/petitions/${match.params.id}`).then((response) => {
      if (response.status === 200) {
        this.setState({
          petition: response.data,
        });
      } else {
        console.log('Failed to fetch a petition.');
      }
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { petition } = this.state;

    const petitionCreatedAt = moment(petition.created_at).format('YYYY-MM-DD');
    const petitionEndAt = moment(petition.end_date).format('YYYY-MM-DD');
    const content = (petition.content && parser(petition.content)) || '';

    return (
      <Grid
        container
        spacing={40}
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.petitionContainer}
      >
        <Grid
          item
          xs={12}
        >
          <h3 className={classes.titleText}>
            {petition.title}
          </h3>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <div className={classes.supportCountText}>
            Signatures count: [
            <span className={classes.count}>{petition.support_count}</span>
            ]
          </div>
        </Grid>
        <Grid
          container
          direction="row"
          className={classes.petitionInfo}
        >
          <Grid item xs={6}>
            <span className={classes.petitionInfoText}>
              Petition Start At: &nbsp;
            </span>
            {petitionCreatedAt}
          </Grid>
          <Grid item xs={6}>
            <span className={classes.petitionInfoText}>
              Petition End At: &nbsp;
            </span>
            {petitionEndAt}
          </Grid>
        </Grid>
        <Grid
          item
          className={classes.petitionAuthorText}
        >
          User&nbsp;
          <span className={classes.petitionAuthorNameText}>{petition.author_id}</span>
          &nbsp; started this petition.
        </Grid>
        <Grid
          container
          direction="column"
          justify="flex-start"
          className={classes.petitionContentContainer}
        >
          <Grid item>
            <h4 className={classes.petitionContentHeader}>Content</h4>
          </Grid>
          <Grid item className={classes.petitionContent}>
            {content}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Show.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(Show);

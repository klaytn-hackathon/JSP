import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, withStyles, LinearProgress, Button,
} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import parser from 'html-react-parser';
import QRCode from 'qrcode.react';
import SupportButton from '../components/SupportButton';

const styles = theme => ({
  petitionContainer: {
    padding: theme.spacing.unit * 10,
    textAlign: 'center',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: '0',
      margin: '0',
    },
  },
  containerMeta: {
    textAlign: 'left',
  },
  titleText: {
    fontSize: '40px',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '30px',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
      padding: '15px',
    },
  },
  supportCountText: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  petitionCount: {
    marginBottom: '20px',
  },
  count: {
    fontWeight: 'bold',
  },
  petitionInfo: {
    padding: '15px',
    border: '1px solid #d1d1d1',
    borderRadius: '4px',
    backgroundColor: '#f6f6f6',
    [theme.breakpoints.down('lg')]: {
      padding: '5px',
      fontSize: '15px',
    },
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

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  petitionVerificationButton: {
    marginTop: '10px',
  },
  qrCode: {
    textAlign: 'center',
    marginTop: '60px',
  },
  qrCodeText: {
    marginBottom: '20px',
    fontWeight: '300',
  },
  petitionEnd: {
    color: '#2196f3',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
});

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petition: {},
      supportCount: 0,
    };
  }

  componentDidMount() {
    this.getPetition();
  }

  getPetition() {
    const { match } = this.props;

    axios.get(`${process.env.PETITION_ADDRESS}/${match.params.id}`).then((response) => {
      if (response.status === 200) {
        this.setState({
          petition: response.data,
        });
      } else {
        console.log('Failed to fetch a petition.');
      }
    });

    axios.get(`${process.env.SUPPORT_ADDRESS}?petition_id=${match.params.id}`).then((response) => {
      if (response.status === 200) {
        this.setState({
          supportCount: response.data.supports.length,
        });
      } else {
        console.log('Failed to fetch a petition.');
      }
    });
  }

  supportCompleted = (currentSupportCount) => {
    this.setState({
      supportCount: currentSupportCount,
    });
  }

  onVerifyButtonClicked = () => {
    const { petition } = this.state;

    const path = `${process.env.VERIFICATION_SERVER}?petition_id=${petition.id}`;

    // eslint-disable-next-line no-undef
    window.open(path, '_blank');
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes, match } = this.props;
    const { petition, supportCount } = this.state;

    const petitionCreatedAt = moment(petition.created_at).format('YYYY-MM-DD');
    const petitionEndAt = moment(petition.end_date).format('YYYY-MM-DD');
    const content = (petition.content && parser(petition.content)) || '';

    const completePercentage = Math.ceil(supportCount / petition.support_limit_count * 100);

    const isEnded = moment().unix() > moment(petition.end_date).add(1, 'days').unix();

    const petitionResult = isEnded ? (
      <div className={classes.petitionEnd}>
        This petition made change with
        {' '}
        {supportCount}
        {' '}
         supporters!
      </div>
    ) : (
      <Grid
        item
        className={classes.petitionCount}
      >
        <div className={classes.supportCountText}>
          <span className={classes.count}>
            {supportCount}
          &nbsp;Have signed.&nbsp;
          </span>
          {"Let's go to "}
          {petition.support_limit_count}
        </div>
        <LinearProgress variant="determinate" value={completePercentage} />
      </Grid>
    );

    // eslint-disable-next-line no-undef
    const currnetURL = window.location.href;

    return (
      <Fragment>
        <div className={classes.titleText}>
          {petition.title}
        </div>
        <Grid
          container
          spacing={40}
          className={classes.petitionContainer}
        >
          <Grid
            item
            xs={12}
            md={7}
          >
            <div className={classes.petitionContent}>
              {content}
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            className={classes.containerMeta}
          >
            <Grid
              container
              direction="column"
              wrap="nowrap"
            >
              {petitionResult}
              <Grid item>
                <span className={classes.petitionInfoText}>
                Petition Start At: &nbsp;
                </span>
                {petitionCreatedAt}
              </Grid>
              <Grid item>
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
              User
              <div className={classes.petitionAuthorNameText}>{petition.author_id}</div>
              started this petition.
            </Grid>
            <div style={{ textAlign: 'right' }}>
              <SupportButton
                petitionID={match.params.id}
                onSupportCompleted={this.supportCompleted}
                supportEnd={isEnded}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.petitionVerificationButton}
                onClick={this.onVerifyButtonClicked}
              >
                  Verify this petition
              </Button>
            </div>
            <Grid item className={classes.qrCode}>
              <div className={classes.qrCodeText}>Share this petition with friends!</div>
              <QRCode value={currnetURL} />
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Show.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(Show);

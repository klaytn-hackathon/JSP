import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../components/Menu';
import Main from '../components/Main';
import Snackbar from '../components/Snackbar';

function Home(props) {
  const { petitionPostState } = props;

  const afterCreatePetitionSnackBar = petitionPostState !== 'INITIAL'
    ? (
      <Snackbar
        postState={petitionPostState}
      />
    )
    : (
      ''
    );
  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs>
          <Menu />
        </Grid>
        <Grid item xs={10}>
          <Main />
        </Grid>
      </Grid>
      {afterCreatePetitionSnackBar}
    </Fragment>
  );
}

Home.propTypes = {
  petitionPostState: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  petitionPostState: state.created,
});

export default connect(mapStateToProps)(Home);

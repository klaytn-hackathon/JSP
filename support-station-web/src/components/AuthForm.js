import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

const styles = () => ({
  guideMessage: {
    color: 'grey',
    fontSize: '12px',
    marginTop: '30px',
    float: 'right',
  },
});

class AuthForm extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
  }

  onSignUp = () => {
    // eslint-disable-next-line no-undef
    window.open('https://baobab.klaytnwallet.com/create', '_newtab');
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.authForm} direction="column">
        <Grid item>
          <LoginForm />
        </Grid>
        <Grid item>
          <p className={classes.guideMessage}>
            <Button variant="contained" color="primary" onClick={this.onSignUp}>
              Sign Up
            </Button>
          </p>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AuthForm);

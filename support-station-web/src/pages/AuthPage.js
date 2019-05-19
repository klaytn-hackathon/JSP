import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AuthForm from '../components/AuthForm';

const styles = theme => ({
  authPage: {
    padding: theme.spacing.unit * 20,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2,
    },
  },
  loginDescription: {
    color: '#777',
    fontSize: '18px',
  },
});

const AuthPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Grid
      container
      direction="column"
      className={classes.authPage}
    >
      <Grid item>
        <h3>SIGN IN </h3>
        <p className={classes.loginDescription}>
          Please fill out the following form with your private key:
        </p>
      </Grid>
      <Grid item>
        <AuthForm />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(AuthPage);

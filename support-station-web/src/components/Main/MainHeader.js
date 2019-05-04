import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import LoginDialog from './LoginDialog';

const styles = theme => ({
  mainHeader: {
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.05)',
    color: '#94979b',
    padding: theme.spacing.unit * 2,
  },
  loginButton: {
    margin: theme.spacing.unit,
    color: '#3a84ff',
  },
});
class MainHeader extends Component {
  state = {
    open: false,
  };

  handleLogin = () => {
    this.setState({
      open: true,
    });
  };

  handleLogout = () => {
    // eslint-disable-next-line no-undef
    sessionStorage.removeItem('support_station_id');
    // eslint-disable-next-line no-undef
    window.location.reload();
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { open } = this.state;

    // eslint-disable-next-line no-undef
    const signInContent = sessionStorage.getItem('support_station_id')
      ? (
        <Button className={classes.loginButton} onClick={this.handleLogout}>
            Logout
        </Button>
      )
      : (
        <div>
          <Button className={classes.loginButton} onClick={this.handleLogin}>
            Login
          </Button>
          <LoginDialog
            open={open}
            onClose={this.handleClose}
          />
        </div>
      );

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        spacing={0}
        className={classes.mainHeader}
      >
        <Grid item xs={1}>
          <Search />
        </Grid>
        <Grid item xs={9}>
        Search
        </Grid>
        <Grid item xs={2}>
          { signInContent }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MainHeader);

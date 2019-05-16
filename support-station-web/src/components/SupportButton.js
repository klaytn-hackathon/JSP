import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import LoginDialog from './LoginDialog';

const styles = theme => ({
  loginButton: {
    padding: theme.spacing.unit * 2,
    marginTop: '15px',
  },
});

class SupportButton extends Component {
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

  onSupportButtonClicked = () => {
    const { petitionID } = this.props;
    console.log('petitionID', petitionID);

    axios.defaults.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };

    // eslint-disable-next-line no-undef
    const signerID = sessionStorage.getItem('support_station_id');
    const params = {
      signer_id: signerID,
      petition_id: parseInt(petitionID, 10),
    };

    axios.post(`${process.env.SUPPORT_ADDRESS}/supports`, params)
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    // eslint-disable-next-line no-undef
    const signInContent = sessionStorage.getItem('support_station_id')
      ? (
        <Button variant="contained" color="primary" className={classes.loginButton} onClick={this.onSupportButtonClicked}>
            Support this petition
        </Button>
      )
      : (
        <div>
          <Button variant="contained" color="primary" className={classes.loginButton} onClick={this.handleLogin}>
            Support this petition
          </Button>
          <LoginDialog
            open={open}
            onClose={this.handleClose}
          />
        </div>
      );

    return (
      <div>
        {signInContent}
      </div>
    );
  }
}

SupportButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  petitionID: PropTypes.string.isRequired,
};


export default withStyles(styles)(SupportButton);

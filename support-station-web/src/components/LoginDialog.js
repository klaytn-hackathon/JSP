/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogContent, DialogTitle, DialogContentText,
} from '@material-ui/core';
import GoogleLogin from 'react-google-login';

const styles = {
  dialogTitle: {
    background: '#3a84ff',
    marginBottom: '10px',
  },
  dialogTitleText: {
    color: 'white',
  },
  dialogContent: {
    textAlign: 'center',
  },
};

class LoginDialog extends Component {
  state = {
    maxWidth: 'xs',
    fullWidth: true,
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  googleResponse = (res) => {
    // eslint-disable-next-line no-undef
    sessionStorage.setItem('support_station_id', res.googleId);
    // eslint-disable-next-line no-undef
    window.location.reload();
  };

  onFailure = (error) => {
    console.log(error);
  }

  render() {
    const { open, classes } = this.props;
    const { maxWidth, fullWidth } = this.state;

    return (
      <Dialog
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        aria-labelledby="max-width-dialog-title"
        onClose={this.handleClose}
        open={open}
      >
        <DialogTitle className={classes.dialogTitle} id="max-width-dialog-title">
          <span className={classes.dialogTitleText}>Login</span>
        </DialogTitle>
        <DialogContent id="max-width-dialog-title">
          <DialogContentText className={classes.dialogContent}>
            <GoogleLogin
              clientId="155990669240-fkno501m2m1a93dnmfljdkpj8er2fdio.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.googleResponse}
              onFailure={this.onFailure}
              cookiePolicy="single_host_origin"
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginDialog);

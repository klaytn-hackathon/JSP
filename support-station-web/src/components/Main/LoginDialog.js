/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogContent, DialogContentText, Grid,
} from '@material-ui/core';
import GoogleLogin from 'react-google-login';

const styles = {

};

class LoginDialog extends Component {
  state = {
    maxWidth: 'sm',
    fullWidth: true,
  }

  handleClose = () => {
    const { onClose, selectedValue } = this.props;
    onClose(selectedValue);
  }

  handleListItemClick = (value) => {
    const { onClose } = this.props;
    onClose(value);
  }

  render() {
    const { open } = this.props;
    const { maxWidth, fullWidth } = this.state;

    return (
      <Dialog
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        aria-labelledby="max-width-dialog-title"
        onClose={this.handleClose}
        open={open}
      >
        <DialogContent id="max-width-dialog-title">
          <DialogContentText>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
              spacing={24}
            >
              <Grid item xs={12}>
                <GoogleLogin
                  clientId="155990669240-40kbd3r90bu3r4tpmqpvs2ciru9eg1la.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.handleListItemClick}
                  cookiePolicy="single_host_origin"
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedValue: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginDialog);

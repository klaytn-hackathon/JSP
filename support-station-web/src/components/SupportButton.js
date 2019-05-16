import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import LoginDialog from './LoginDialog';
import Contract from '../klaytn/petition_contract';
import { cav } from '../klaytn/caver';

const styles = theme => ({
  loginButton: {
    padding: theme.spacing.unit * 2,
    marginTop: '15px',
  },
  fabProgress: {
  },
});

class SupportButton extends Component {
  state = {
    open: false,
    supportDone: false,
    supportLoading: false,
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

  handleDialogClose = () => {
    this.setState({
      supportDone: false,
      supportLoading: false,
    });
  }

  onSupportButtonClicked = () => {
    const { supportLoading } = this.state;
    const { petitionID, onSupportCompleted } = this.props;

    if (!supportLoading) {
      this.setState({
        supportLoading: true,
      });
    }

    axios.defaults.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };

    // eslint-disable-next-line no-undef
    const signerID = sessionStorage.getItem('support_station_id');
    const params = {
      signer_id: signerID,
      petition_id: parseInt(petitionID, 10),
    };

    const walletInstance = cav.klay.accounts.privateKeyToAccount(process.env.SECRET_KEY);
    cav.klay.accounts.wallet.add(walletInstance);

    axios.post(`${process.env.SUPPORT_ADDRESS}`, params)
      .then((res) => {
        if (res.status === 201) {
          const signature = `${res.data.petition_id}_${res.data.signer_id}`;

          Contract.methods.sign(
            res.data.petition_id,
            res.data.signer_id,
            signature,
          ).send({
            from: walletInstance.address,
            gas: '20000000',
            value: '1',
          }).on('receipt', async () => {
            this.setState({
              supportDone: true,
              supportLoading: false,
            });

            const count = await Contract.methods.getSignaturesCount(res.data.petition_id)
              .call({
                from: walletInstance.address,
                gas: '20000000',
              });

            onSupportCompleted(count);
          }).on('error', (error) => {
            console.log('error', error);
          });
        }
      })
      .catch((err) => {
        console.error('Failed to request a support!', err);

        this.setState({
          supportDone: true,
          supportLoading: false,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { open, supportDone, supportLoading } = this.state;

    // eslint-disable-next-line no-undef
    const signInContent = sessionStorage.getItem('support_station_id')
      ? (
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={this.onSupportButtonClicked}
            disabled={supportLoading}
          >
            Support this petition
          </Button>
        </div>
      )
      : (
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={this.handleLogin}
          >
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
        <Dialog
          open={supportDone}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Results</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SupportButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  petitionID: PropTypes.string.isRequired,
  onSupportCompleted: PropTypes.func.isRequired,
};


export default withStyles(styles)(SupportButton);

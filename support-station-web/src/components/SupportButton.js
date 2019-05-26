import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import LoginDialog from './LoginDialog';
import Contract from '../klaytn/petition_contract';
import { cav } from '../klaytn/caver';

const styles = theme => ({
  loginButton: {
    padding: theme.spacing.unit * 2,
    marginTop: '35px',
  },
  supportButtonWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    right: '15%',
    marginRight: 15,
  },
});

class SupportButton extends Component {
  state = {
    open: false,
    supportDone: false,
    supportLoading: false,
    alreadySupported: false,
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

  checkAlreadySigned = async (signerID) => {
    const { petitionID } = this.props;

    const res = await axios.get(`${process.env.SUPPORT_ADDRESS}?petition_id=${petitionID}&signer_id=${signerID}`);
    if (res.status === 200) {
      if (res.data.supports.length > 0) {
        this.setState({
          alreadySupported: true,
        });
        return true;
      }
    }

    return false;
  }

  onSupportButtonClicked = async () => {
    const { supportLoading } = this.state;
    const { petitionID, onSupportCompleted } = this.props;

    if (!supportLoading) {
      this.setState({
        supportLoading: true,
      });
    }

    // eslint-disable-next-line no-undef
    const signerID = sessionStorage.getItem('support_station_id');
    const params = {
      signer_id: signerID,
      petition_id: parseInt(petitionID, 10),
    };

    if (await this.checkAlreadySigned(signerID)) {
      return;
    }

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
          }).on('receipt', async (receipt) => {
            this.setState({
              supportDone: true,
              supportLoading: false,
            });

            axios.patch(`${process.env.SUPPORT_ADDRESS}`, { id: res.data.id, transaction_id: receipt.transactionHash });

            const count = await Contract.methods.getSignaturesCount(res.data.petition_id)
              .call({
                from: walletInstance.address,
                gas: '20000000',
              });
            onSupportCompleted(count);

            this.setState({
              alreadySupported: true,
            });
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
    const { classes, supportEnd } = this.props;
    const {
      open, supportDone, alreadySupported, supportLoading,
    } = this.state;

    // eslint-disable-next-line no-undef
    const signInContent = sessionStorage.getItem('support_station_id')
      ? (
        <div className={classes.supportButtonWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={this.onSupportButtonClicked}
            disabled={supportLoading || supportEnd}
          >
            {alreadySupported ? 'Already supported' : 'Support this petition'}
          </Button>
          {
            supportLoading
            && !alreadySupported
            && <CircularProgress size={24} className={classes.buttonProgress} />
          }
        </div>
      )
      : (
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={this.handleLogin}
            disabled={supportEnd}
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
              Thank you for supporting this petition.
              <br />
              Your support has been saved in klaytn blockchain platform.
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
  supportEnd: PropTypes.bool.isRequired,
};


export default withStyles(styles)(SupportButton);

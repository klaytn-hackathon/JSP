import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Input from './Input';

import * as authActions from '../redux/actions/auth';
import { isValidPrivateKey } from '../utils/crypto';

import './LoginForm.scss';

class LoginForm extends Component {
  state = {
    privateKey: '',
    warningMessage: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin = () => {
    // eslint-disable-next-line react/prop-types
    const { login } = this.props;
    const { privateKey } = this.state;

    // eslint-disable-next-line no-unused-expressions
    isValidPrivateKey(privateKey)
      ? login(privateKey)
      : this.setState({ warningMessage: '* Invalid Private Key' });
  }

  render() {
    const { warningMessage } = this.state;
    return (
      <div className="LoginForm">
        <Input
          className="LoginForm__input"
          type="password"
          name="privateKey"
          label="Login with Private Key"
          placeholder="0x2c4078447..."
          onChange={this.handleChange}
          err={warningMessage}
        />
        <Button
          variant="contained"
          color="primary"
          className="LoginForm__button"
          onClick={this.handleLogin}
        >
          Log In
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: privateKey => dispatch(authActions.login(privateKey)),
});

export default connect(null, mapDispatchToProps)(LoginForm);

import React, { Component, Fragment } from 'react';
import {
  Editor,
  createEditorState,
} from 'medium-draft';
import {
  Grid, TextField, Typography, Button, CircularProgress,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import 'medium-draft/lib/index.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { stateToHTML } from 'draft-js-export-html';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Contract from '../klaytn/petition_contract';
import AuthPage from './AuthPage';
import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
  newPage: {
    minHeight: '1100px',
    padding: theme.spacing.unit * 20,
    background: 'white',
  },
  title: {
    fontSize: '1.5rem',
  },
  textField: {
    borderColor: '#aaa',
    border: '#d9d9d9 solid 1px',
    backgroundColor: 'white',
    boxShadow: 'inset 2px 2px 6px rgba(0, 0, 0, 0.05)',
  },
  content: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  buttonGroup: {
    textAlign: 'right',
  },
  link: {
    textDecoration: 'none',
  },
  signaturesLimit: {
    width: '70%',
  },
  dateField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  petitionEndDatePicker: {
    fontFamily: 'Spoqa Han Sans, Spoqa Han Sans JP, Sans-serif',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  submitButton: {
    marginRight: '10px',
  },
});

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: createEditorState(),
      redirect: false,
      signaturesLimitCount: 0,
      endDate: new Date(moment().format('YYYY-MM-DD')),
      loading: false,
    };

    // eslint-disable-next-line no-undef
    const walletFromSession = sessionStorage.getItem('walletInstance');
    this.wallet = JSON.parse(walletFromSession);

    // eslint-disable-next-line react/prop-types
    const { integrateWallet, removeWallet } = this.props;

    if (walletFromSession) {
      try {
        integrateWallet(this.wallet.privateKey);
      } catch (e) {
        removeWallet();
      }
    }

    this.onChange = (editorState) => {
      this.setState({
        editorState,
      });
    };

    this.onTitleTextChange = (event) => {
      this.setState({
        title: event.target.value,
      });
    };

    this.onNumberFieldChange = (event) => {
      this.setState({
        signaturesLimitCount: event.target.value,
      });
    };

    this.onDateChange = (date) => {
      this.setState({
        endDate: date,
      });
    };

    this.onSubmitClicked = () => {
      const { loading } = this.state;

      if (!loading) {
        this.setState(
          {
            loading: true,
          },
          () => {
            this.timer = setTimeout(() => {
              this.setState({
                loading: false,
              });
            }, 2000);
          },
        );
      }
    };

    this.onSubmit = (event) => {
      event.preventDefault();

      const {
        editorState, title, signaturesLimitCount, endDate,
      } = this.state;
      const { onSuccess, onFailed } = this.props;

      const supportLimitCount = parseInt(signaturesLimitCount, 10);

      const params = {
        author_id: this.wallet.address,
        title,
        content: stateToHTML(editorState.getCurrentContent()),
        support_limit_count: supportLimitCount,
        end_date: endDate,
      };

      axios.defaults.headers = {
        'Content-Type': 'application/json; charset=utf-8',
      };

      axios.post(`${process.env.PETITION_ADDRESS}`, params)
        .then((res) => {
          if (res.status === 201) {
            Contract.methods.register(
              res.data.id,
              this.wallet.address,
              res.data.title,
              res.data.content,
              res.data.support_limit_count,
            ).send({
              from: this.wallet.address,
              gas: '20000000',
              value: supportLimitCount * 20000000,
            }).on('receipt', () => {
              onSuccess();

              this.setState({
                redirect: true,
                loading: false,
              });
            }).on('error', (error) => {
              console.log('error', error);
            });
          } else {
            onFailed();
            this.setState({ redirect: true });
          }
        })
        .catch((err) => {
          console.log('err', err);

          this.setState({
            loading: false,
          });
          onFailed(err);
        });
    };

    this.refsEditor = React.createRef();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes, isLoggedIn } = this.props;
    const {
      editorState, title, redirect, signaturesLimitCount, endDate, loading,
    } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        {!isLoggedIn ? <AuthPage />
          : (
            <form onSubmit={this.onSubmit}>
              <Grid className={classes.newPage} container spacing={40} direction="column">
                <Grid item>
                  <Typography className={classes.title}>
              Petition Title
                  </Typography>
                  <TextField
                    id="standard-full-width"
                    className={classes.textField}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    value={title}
                    onChange={this.onTitleTextChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.content}>
              Content
                  </Typography>
                  <div className={classes.textField}>
                    <Editor
                      ref={this.refsEditor}
                      editorState={editorState}
                      onChange={this.onChange}
                      placeholder="Write your story"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-number"
                    label="Specify how many signatures you need for a petition"
                    value={signaturesLimitCount}
                    type="number"
                    className={classes.signaturesLimit}
                    onChange={this.onNumberFieldChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item className={classes.petitionEndDatePicker}>
                  <Grid container direction="column">
                    <div>Petition End Date</div>
                    <DatePicker
                      selected={endDate}
                      onChange={this.onDateChange}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  {!isLoggedIn && <AuthPage />}
                </Grid>
                <Grid item className={classes.buttonGroup}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.onSubmitClicked}
                    className={classes.submitButton}
                  >
                    Post
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  <Link className={classes.link} to="/">
                    <Button
                      variant="contained"
                      color="primary"
                    >
                      Cancel
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </form>
          )
        }
      </Fragment>
    );
  }
}

New.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailed: PropTypes.func.isRequired,
};

export default withStyles(styles)(New);

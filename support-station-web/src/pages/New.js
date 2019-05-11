import React, { Component } from 'react';
import {
  Editor,
  createEditorState,
} from 'medium-draft';
import {
  Grid, TextField, Typography, Button,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import 'medium-draft/lib/index.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { stateToHTML } from 'draft-js-export-html';

const styles = theme => ({
  newPage: {
    padding: theme.spacing.unit * 20,
    height: '100vh',
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
});

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: createEditorState(),
      redirect: false,
    };

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

    this.onSubmit = (event) => {
      event.preventDefault();

      const { editorState, title } = this.state;
      const { onSuccess, onFailed } = this.props;

      // eslint-disable-next-line no-undef
      const authorID = sessionStorage.getItem('support_station_id');
      const params = {
        author_id: authorID,
        title,
        content: stateToHTML(editorState.getCurrentContent()),
      };

      axios.defaults.headers = {
        'Content-Type': 'application/json; charset=utf-8',
      };
      axios.post(process.env.SERVER_ADDRESS, params)
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            onSuccess();
            this.setState({ redirect: true });
          } else {
            onFailed();
            this.setState({ redirect: true });
          }
        })
        .catch((err) => {
          onFailed(err);
        });
    };

    this.refsEditor = React.createRef();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { editorState, title, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
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
          <Grid item>
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
          <Grid item className={classes.buttonGroup}>
            <Button
              type="submit"
            >
              Post
            </Button>
            <Link className={classes.link} to="/">
              <Button>
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  }
}

New.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailed: PropTypes.func.isRequired,
};

export default withStyles(styles)(New);

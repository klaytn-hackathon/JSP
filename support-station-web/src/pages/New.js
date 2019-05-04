import React, { Component } from 'react';
import {
  Editor,
  createEditorState,
} from 'medium-draft';
import {
  Grid, TextField, Typography, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import 'medium-draft/lib/index.css';

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
      editorState: createEditorState(),
    };

    this.onChange = (editorState) => {
      this.setState({
        editorState,
      });
    };

    this.refsEditor = React.createRef();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { editorState } = this.state;

    return (
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
          <Button>
            Post
          </Button>
          <Link className={classes.link} to="/">
            <Button>
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(New);

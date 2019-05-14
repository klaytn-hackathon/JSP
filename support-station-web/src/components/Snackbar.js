import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { SnackbarContent, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import * as postAction from '../redux/actions/post';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: '#3a84ff',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
});

function MySnackbarContent(props) {
  const {
    classes, message, variant, ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant])}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

class CustomizedSnackbar extends React.Component {
  state = {
    open: true,
  }

  handleClose = () => {
    // eslint-disable-next-line react/prop-types
    const { postStateReset } = this.props;

    postStateReset();
    this.setState({ open: false });
  };

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      postState,
    } = this.props;
    const { open } = this.state;

    const content = postState === 'SUCCESS' ? (
      <MySnackbarContentWrapper
        variant="success"
        message="A petition is successfully registered."
      />
    ) : (
      <MySnackbarContentWrapper
        variant="error"
        message="Failed to register a petition."
      />
    );
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={this.handleClose}
      >
        { content }
      </Snackbar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postStateReset: () => dispatch(postAction.initializePostState()),
});

export default connect(null, mapDispatchToProps)(CustomizedSnackbar);

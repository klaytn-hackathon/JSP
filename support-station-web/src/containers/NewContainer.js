import { connect } from 'react-redux';
import { New } from '../pages';
import * as authActions from '../redux/actions/auth';
import * as postAction from '../redux/actions/post';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  onSuccess: () => dispatch(postAction.postSuccess()),
  onFailed: err => dispatch(postAction.postFailed(err)),
  integrateWallet: privateKey => dispatch(authActions.integrateWallet(privateKey)),
  removeWallet: () => dispatch(authActions.removeWallet()),
});

const NewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(New);

export default NewContainer;

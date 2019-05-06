import { connect } from 'react-redux';
import { New } from '../pages';
import * as actions from '../actions';

const mapStateToProps = state => ({
  created: state.created,
});

const mapDispatchToProps = dispatch => ({
  onSuccess: () => dispatch(actions.postSuccess()),
  onFailed: err => dispatch(actions.postFailed(err)),
});

const NewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(New);

export default NewContainer;

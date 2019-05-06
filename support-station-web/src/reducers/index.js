import * as types from '../actions';

const initialState = {
  created: 'INITIAL',
  error: null,
};

function onPetitionCreated(state = initialState, action) {
  switch (action.type) {
  case types.POST_SUCCESS:
    return {
      ...state,
      created: 'SUCCESS',
    };
  case types.POST_FAILED:
    return {
      created: 'FAILED',
      error: action.error,
    };
  default:
    return state;
  }
}

export default onPetitionCreated;

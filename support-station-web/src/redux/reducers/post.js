import { POST_SUCCESS, POST_FAILED } from '../actions/actionTypes';

const initialState = {
  created: 'INITIAL',
  error: null,
};

function onPetitionCreated(state = initialState, action) {
  switch (action.type) {
  case POST_SUCCESS:
    return {
      ...state,
      created: 'SUCCESS',
    };
  case POST_FAILED:
    return {
      created: 'FAILED',
      error: action.error,
    };
  default:
    return {
      ...state,
      created: 'INITIAL',
    };
  }
}

export default onPetitionCreated;

import {
  POST_SUCCESS,
  POST_FAILED,
  POST_INIT,
} from './actionTypes';

export const postSuccess = () => ({
  type: POST_SUCCESS,
});

export const postFailed = err => ({
  type: POST_FAILED,
  error: err,
});

export const initializePostState = () => ({
  type: POST_INIT,
});

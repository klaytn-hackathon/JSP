export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILED = 'POST_FAILED';

export const postSuccess = () => ({
  type: POST_SUCCESS,
});

export const postFailed = err => ({
  type: POST_FAILED,
  error: err,
});

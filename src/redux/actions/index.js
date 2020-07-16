import { getToken, getQuestions } from '../../services/api';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const RECEIVE_SUCCESS_TOKEN = 'RECEIVE_SUCCESS_TOKEN';
export const RECEIVE_SUCCESS_QUESTION = 'RECEIVE_SUCCESS_QUESTION';

const fetchingData = (bool) => ({
  type: FETCH_DATA,
  isFetching: bool,
});

const fetchingDataError = (error) => ({
  type: FETCH_DATA_ERROR,
  error,
});

const receiveSuccessToken = (apiResponse) => ({
  type: RECEIVE_SUCCESS_TOKEN,
  token: apiResponse.token,
});

export const fetchToken = () => (dispatch) => {
  dispatch(fetchingData(true));

  return (
    getToken().then((data) => {
      if (data.response_code === 0) {
        dispatch(fetchingData(false));
        dispatch(receiveSuccessToken(data));
      } else {
        dispatch(fetchingDataError('Algo deu errado! Token inválido'));
      }
    }),
    (error) => dispatch(fetchingDataError(error.message))
  );
};

const receiveSuccessQuestion = (apiResponse) => ({
  type: RECEIVE_SUCCESS_QUESTION,
  questions: apiResponse.results,
});

export const fetchQuestions = () => (dispatch) => {
  dispatch(fetchingData(true));

  return (
    getQuestions().then((data) => {
      if (data.response_code === 0) {
        dispatch(fetchingData(false));
        dispatch(receiveSuccessQuestion(data));
      } else {
        dispatch(fetchingDataError('Algo deu errado! Quest não existe'));
      }
    }),
    (error) => dispatch(fetchingDataError(error.message))
  );
};
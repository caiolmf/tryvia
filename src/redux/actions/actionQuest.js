import { getQuestions } from '../../services/api';

export const FETCH_DATA_QUESTION = 'FETCH_DATA_QUESTION';
export const RECEIVE_SUCCESS_QUESTION = 'RECEIVE_SUCCESS_QUESTION';
export const FETCH_ERROR_QUESTION = 'FETCH_ERROR_QUESTION';

const fetchingDataQuestion = (bool) => ({
  type: FETCH_DATA_QUESTION,
  isFetching: bool,
});

const fetchingErrorQuestion = (error) => ({
  type: FETCH_ERROR_QUESTION,
  error,
});

const receiveSuccessQuestion = (apiResponse) => ({
  type: RECEIVE_SUCCESS_QUESTION,
  questions: apiResponse.results,
});

export const fetchQuestions = (settings) => (dispatch) => {
  dispatch(fetchingDataQuestion(true));
  console.log(settings);
  return (
    getQuestions(settings).then((data) => {
      if (data.response_code === 0) {
        dispatch(receiveSuccessQuestion(data));
        dispatch(fetchingDataQuestion(false));
      } else {
        dispatch(fetchingErrorQuestion('Algo deu errado! Quest não existe'));
      }
    }),
    (error) => dispatch(fetchingErrorQuestion(error.message))
  );
};

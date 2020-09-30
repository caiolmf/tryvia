import { getToken } from '../../services/api';

export const FETCH_DATA_TOKEN = 'FETCH_DATA_TOKEN';
export const RECEIVE_SUCCESS_TOKEN = 'RECEIVE_SUCCESS_TOKEN';
export const FETCH_ERROR_TOKEN = 'FETCH_ERROR_TOKEN';

const fetchingDataToken = (bool) => ({
  type: FETCH_DATA_TOKEN,
  isFetching: bool,
});

const fetchingErrorToken = (error) => ({
  type: FETCH_ERROR_TOKEN,
  error,
});

const receiveSuccessToken = (apiResponse) => ({
  type: RECEIVE_SUCCESS_TOKEN,
  token: apiResponse.token,
});

export const fetchToken = () => (dispatch) => {
  dispatch(fetchingDataToken(true));

  return (
    getToken().then((data) => {
      if (data.response_code === 0) {
        dispatch(receiveSuccessToken(data));
        dispatch(fetchingDataToken(false));
      } else {
        dispatch(fetchingErrorToken('Algo deu errado! Token inválido'));
      }
    }),
    (error) => dispatch(fetchingErrorToken(error.message))
  );
};

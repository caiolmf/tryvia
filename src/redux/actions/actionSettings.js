import { getCategories } from '../../services/api';

export const FETCH_DATA_CATEGORIES = 'FETCH_DATA_CATEGORIES';
export const RECEIVE_SUCCESS_CATEGORIES = 'RECEIVE_SUCCESS_CATEGORIES';
export const FETCH_ERROR_CATEGORIES = 'FETCH_ERROR_CATEGORIES';
export const SET_SETTINGS = 'SET_SETTINGS';

const fetchingDataCategories = (bool) => ({
  type: FETCH_DATA_CATEGORIES,
  isFetching: bool,
});

const fetchingErrorCategories = (error) => ({
  type: FETCH_ERROR_CATEGORIES,
  error,
});

const receiveSuccessCategories = (apiResponse) => ({
  type: RECEIVE_SUCCESS_CATEGORIES,
  categories: apiResponse.trivia_categories,
});

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchingDataCategories(true));

  return (
    getCategories().then((data) => {
      if (data) {
        dispatch(receiveSuccessCategories(data));
        dispatch(fetchingDataCategories(false));
      } else {
        dispatch(fetchingErrorCategories('Algo deu errado! Categoria não existe'));
      }
    }),
    (error) => dispatch(fetchingErrorCategories(error.message))
  );
};

export const setSettings = (settings) => ({
  type: SET_SETTINGS,
  settings,
});

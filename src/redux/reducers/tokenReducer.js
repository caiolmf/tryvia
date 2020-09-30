import { FETCH_DATA_TOKEN, RECEIVE_SUCCESS_TOKEN, FETCH_ERROR_TOKEN } from '../actions/actionToken';

const initialState = {
  isFetchingToken: false,
  error: '',
  token: '',
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_TOKEN:
      return { ...state, isFetchingToken: action.isFetching };

    case RECEIVE_SUCCESS_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case FETCH_ERROR_TOKEN:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default tokenReducer;

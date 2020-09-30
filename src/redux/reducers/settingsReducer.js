import {
  FETCH_DATA_CATEGORIES,
  RECEIVE_SUCCESS_CATEGORIES,
  FETCH_ERROR_CATEGORIES,
  SET_SETTINGS,
} from '../actions/actionSettings';

const initialState = {
  settings: {
    category: '',
    difficulty: '',
    type: '',
  },
  isFetchingCategories: true,
  error: '',
  triviaCategories: {},
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_CATEGORIES:
      return { ...state, isFetchingCategories: action.isFetching };

    case RECEIVE_SUCCESS_CATEGORIES:
      return { ...state, triviaCategories: action.categories };

    case FETCH_ERROR_CATEGORIES:
      return { ...state, error: action.error };

    case SET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.settings } };

    default:
      return state;
  }
};

export default settingsReducer;

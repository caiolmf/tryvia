import { FETCH_DATA_QUESTION, FETCH_ERROR_QUESTION, RECEIVE_SUCCESS_QUESTION } from '../actions/actionQuest';

const initialState = {
  isFetchingQuestion: true,
  error: '',
  questions: [],
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_QUESTION:
      return { ...state, isFetchingQuestion: action.isFetching };

    case RECEIVE_SUCCESS_QUESTION:
      return {
        ...state,
        questions: action.questions,
      };

    case FETCH_ERROR_QUESTION:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default questionsReducer;

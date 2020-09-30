import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';
import userDataReducer from './userDataReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  tokenReducer,
  questionsReducer,
  userDataReducer,
  settingsReducer,
});

export default rootReducer;

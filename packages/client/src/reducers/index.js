import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import betsReducer from './betsReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  betsLoad: betsReducer
});

export default rootReducer;

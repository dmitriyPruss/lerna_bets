import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import tasksReducer from './tasksReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  tasksLoad: tasksReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import tasksSagaReducer from './tasksSagaReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  tasksLoad: tasksSagaReducer,
});

export default rootReducer;

import { createStore, combineReducers } from 'redux';
import { uiReducer, loginReducer, uploadReducer } from './reducers'; // Assuming this handles login-related state

const rootReducer = combineReducers({
  ui: uiReducer, // For managing UI state like showing/hiding panels
  login: loginReducer, // For managing login-related state
  upload: uploadReducer
});

const store = createStore(rootReducer);

export default store;
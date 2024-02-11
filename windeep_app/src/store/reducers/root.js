import { combineReducers } from 'redux';

import loggedInUserReducer from './user';
const rootReducer = combineReducers({
    loggedInUserReducer
});
export default rootReducer;
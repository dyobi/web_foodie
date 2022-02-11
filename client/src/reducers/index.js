import { combineReducers } from 'redux';

import userReducer from './user';
import foodReducer from './food';

const rootReducer = combineReducers({
	user: userReducer,
	food: foodReducer
});

export default rootReducer;
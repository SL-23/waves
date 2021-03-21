import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './product_reducer';

const rootReducer = combineReducers({
	user,
	products
});

export default rootReducer;
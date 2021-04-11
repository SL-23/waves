import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './product_reducer';
import site from './site_reducer';

const rootReducer = combineReducers({
	user,
	products,
	site
});

export default rootReducer;
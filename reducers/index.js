import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import loginDetails from './loginDetails';
import cartSummary from './cartSummary';
export default combineReducers({
    cart: cartReducer,
    user: loginDetails,
    cartSummary: cartSummary
});
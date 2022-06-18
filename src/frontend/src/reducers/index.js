import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

const bidReducer = (initialBid = null, action) => {
   if (action.type === 'BID_UPDATED'){
       return action.payload;
   }
   return initialBid;
}
const transactionReducer = (pending = null, action) => {
   if (action.type === 'ON_TRANSACTION_PENDING'){
       return action.payload;
   }
   return pending;
}
export default combineReducers({
   form: formReducer,
   bid: bidReducer,
   transactionPending: transactionReducer
});
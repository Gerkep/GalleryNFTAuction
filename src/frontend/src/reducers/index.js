import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

const bidReducer = (initialBid = null, action) => {
   if (action.type === 'BID_UPDATED'){
       return action.payload;
   }
   return initialBid;
}
export default combineReducers({
   form: formReducer,
   bid: bidReducer
});
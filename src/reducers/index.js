import { combineReducers } from "redux";

const bidReducer = (initialBid = null, action) => {
   if (action.type === 'BID_UPDATED'){
       return action.payload;
   }
   return initialBid;
}
const depositReducer = (deposit = null, action) => {
   if (action.type === 'SET_DEPOSIT'){
       return action.payload;
   }
   return deposit;
}
const userReducer = (user = null, action) => {
   if (action.type === 'SET_USER'){
       return action.payload;
   }
   return user;
}
const transactionReducer = (pending = null, action) => {
   if (action.type === 'ON_TRANSACTION_PENDING'){
       return action.payload;
   }
   return pending;
}
export default combineReducers({
   bid: bidReducer,
   deposit: depositReducer,
   user: userReducer,
   transactionPending: transactionReducer
});
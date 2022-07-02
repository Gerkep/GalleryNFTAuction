export const setHighestBid = (bid) => { 
    return {
        type: 'BID_UPDATED',
        payload: bid
    };
};
export const setDeposit = (deposit) => { 
    return {
        type: 'SET_DEPOSIT',
        payload: deposit
    };
};
export const setUser = (user) => { 
    return {
        type: 'SET_USER',
        payload: user
    };
};
export const setTransactionPending = (pending) => { 
    return {
        type: 'ON_TRANSACTION_PENDING',
        payload: pending
    };
};
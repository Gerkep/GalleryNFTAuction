export const setHighestBid = (bid) => { 
    return {
        type: 'BID_UPDATED',
        payload: bid
    };
};
export const setTransactionPending = (pending) => { 
    return {
        type: 'ON_TRANSACTION_PENDING',
        payload: pending
    };
};
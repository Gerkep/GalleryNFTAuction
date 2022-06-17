export const setHighestBid = (bid) => { 
    return {
        type: 'BID_UPDATED',
        payload: bid
    };
};
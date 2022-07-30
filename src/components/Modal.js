import React from 'react';
import ReactDOM from 'react-dom';
import "../style/modal.css";
import history from '../history';
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import { connect } from "react-redux";


class Modal extends React.Component {
    state = ({bid: 0, bidPending: false})

    updateBid = (event) => {
        this.setState({bid: event.target.value})
    }

    placeBid = async () => {
        this.setState({bidPending: true});
        const highestBid = parseFloat(this.props.bid);
        const currentBid = parseFloat(this.state.bid);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        let result = +currentBid + +this.props.deposit;
        if(result > highestBid){
            try{
                const tx = await auctionWithSigner.bid({ value: ethers.utils.parseEther(this.state.bid)})
                await tx.wait();
                this.setState({bidPending: false});
                history.push("/auction/bid/success");
            }catch (e){
                alert("Something went wrong. The transfer was not successful. Try again or contact us!");
                this.setState({bidPending: false});
            }
            this.setState({bidPending: false});

        }else{
            alert("Please offer more than the last bid")
        }
    }
    renderModal = () => {
        const currentBid = parseFloat(this.state.bid);
        const totalBid = +currentBid + +this.props.deposit;
        return(
            <div onClick={(e) => e.stopPropagation()} className="bid-modal">
                <p className='bid-info'>If you placed a bid earlier without withdrawing it, <b>it will add up!</b></p>
                <label className='bid-label'><b>ETH</b></label>
                <input type="number" placeholder='Value(ETH)' value={this.state.bid} onChange={this.updateBid} className="bid-input"/>
                <p className='bid-total'>Total bid: <b>{totalBid} ETH</b></p>
                {this.state.bidPending ?  <button className="button bid-modal-btn"><div className="loader">Loading...</div></button> : <button onClick={this.placeBid} className='button bid-modal-btn'>BID</button>}
            </div>
        )
    }
    render(){
        return ReactDOM.createPortal(
            <div onClick={() => history.push("/auction")} className='modal-background'>
                {this.renderModal()}
            </div>,
            document.querySelector('#modal')
        )
    }
}
const mapStateToProps = (state) => {
    return {bid: state.bid, deposit: state.deposit};
}
export default connect(mapStateToProps)(Modal);
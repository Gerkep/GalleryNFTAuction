import React from 'react';
import ReactDOM from 'react-dom';
import "../style/modal.css";
import history from '../history';
import api from '../api';
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import { connect } from "react-redux";


class Modal extends React.Component {
    state = ({bid: 0, bidPending: false})

    handleChange = (event) =>{
        this.setState({bid: event.target.value});
    }

    placeBid = async () => {
        this.setState({bidPending: true});
        const lastBid = parseFloat(this.props.bid);
        const currentBid = parseFloat(this.state.bid);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        const deposit = await auctionWithSigner.getDeposit();
        const depositInEth = ethers.utils.formatEther(deposit);
        const depositString = depositInEth.toString();
        const deposited = parseFloat(depositString);
        let result = currentBid + deposited;
        if(result > lastBid){
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
    render(){
        return ReactDOM.createPortal(
            <div onClick={() => history.push("/auction")} className='modal-background'>
                <div onClick={(e) => e.stopPropagation()} className="bid-modal">
                    <p className='bid-info'>If you placed a bid earlier without withdrawing it, it will add up!</p>
                    <label className='bid-label'><b>ETH</b></label>
                    <input type="number" placeholder='Value(ETH)' value={this.state.bid} onChange={this.handleChange} className="bid-input"/>
                    {this.state.bidPending ?  <button className="button bid-modal-btn"><div className="loader">Loading...</div></button> : <button onClick={this.placeBid} className='button bid-modal-btn'>BID</button>}
                </div>
            </div>,
            document.querySelector('#modal')
        )
    }
}
const mapStateToProps = (state) => {
    return {bid: state.bid};
}
export default connect(mapStateToProps)(Modal);
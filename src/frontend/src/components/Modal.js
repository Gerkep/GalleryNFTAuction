import React from 'react';
import ReactDOM from 'react-dom';
import "../style/modal.css";
import history from '../history';
import api from '../api';
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import { connect } from "react-redux";


class Modal extends React.Component {
    state = ({bid: 0})

    handleChange = (event) =>{
        this.setState({bid: event.target.value});
    }

    placeBid = async () => {
        const lastBid = parseFloat(this.props.bid);
        if(this.state.bid > lastBid){
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const auctionWithSigner = AuctionContract.connect(signer);
            await auctionWithSigner.bid({ value: ethers.utils.parseEther(this.state.bid)})
            history.push("/success");
        }else{
            alert("Please offer more than the last bid")
        }
    }
    render(){
        return ReactDOM.createPortal(
            <div onClick={() => history.push("/auction")} className='modal-background'>
                <div onClick={(e) => e.stopPropagation()} className="bid-modal">
                    <p className='bid-info'>Use '<b>.</b>' and not comma when <br/> using decimals.</p>
                    <label className='bid-label'><b>ETH</b></label>
                    <input type="number" placeholder='Value(ETH)' value={this.state.bid} onChange={this.handleChange} className="bid-input"/>
                    <button onClick={this.placeBid} className='button bid-modal-btn'>BID</button>
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
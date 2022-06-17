import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";
import "../style/auction.css"
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import Modal from "../components/Modal";
import { connect } from "react-redux";

class AuctionBid extends React.Component {
    state = ({auctions: []})
    componentDidMount = async () => {
        const auctions = await api.get("/auction/list").then((result) => result.data)
        this.setState({auctions: auctions});
    }
    renderAuction = () => {
        const auction = this.state.auctions.map((auction) => {
            console.log("Auction" + this.props.bid)
            return(
                <div className="auction-content">
                    <div className="auction-header">
                        <div className="hl page-hl desktop"></div>
                        <h1 className="page-header">LIVE!</h1>
                        <div className="countdown-container">
                            <p className="countdown"><p className="desktop countdown-text">Ends in:</p><b>{auction.timestamp}</b></p>
                        </div>
                    </div>
                    <div className="painting-container">
                        <div className="auction-image"></div>
                        <h2 className="painting-name">{auction.title}</h2>
                        <h3 className="artist">{auction.artist}</h3>
                        <div className="bid-container">
                            <p className="last-bid">Last bid: {auction.initialPrice}</p>
                            <button className="bid-btn button"><div className="offer-img"></div>MAKE OFFER</button>
                        </div>
                    </div>
                    <div className="painting-about">
                        <h3 className="painting-about-header">ABOUT PAINTING</h3>
                        <p className="painting-about-text">{auction.description}</p>
                    </div>
                </div>
            )
        });
        return (
            <div>{auction}</div>
        );
    }
    render(){
        return(
            <div className="auction-page">
                <Navbar />
                {this.renderAuction()}
                <Modal />
                <Footer />
            </div>
        )
    }

}
export default AuctionBid;
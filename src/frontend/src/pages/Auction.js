import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";
import "../style/auction.css"
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import { setHighestBid } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'
import Countdown from "../components/Countdown";

class AuctionPage extends React.Component {
    state = ({auctions: [], highestBid: '', startTimeState: 0, endTimeState: 0})
    componentDidMount = async () => {
        const auctions = await api.get("/auction/list").then((result) => result.data)
        await provider.send("eth_requestAccounts", []);
        const auctionWithProvider = AuctionContract.connect(provider);
        const highestBid = await auctionWithProvider.getHighestBid();
        const startTime = await auctionWithProvider.getStartTime();
        const endTime = await auctionWithProvider.getEndTime();
        const startTimeAsNumber = startTime.toNumber()* 1000;
        const endTimeAsNumber = endTime.toNumber()* 1000;
        const highestBidInETH = ethers.utils.formatEther(highestBid);
        const highestBidAsNumber = highestBidInETH.toString();
        this.setState({auctions: auctions, highestBid: highestBidAsNumber, startTimeState: startTimeAsNumber, endTimeState: endTimeAsNumber, deposit: '', depositShowed: false});

        //opacity from 0 to 1 observer
        const appearing = document.querySelectorAll('.appearing');

        //appering animation containers
            function handleIntersection(entries) {
             entries.map((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
                }
            });
            }
        const observer = new IntersectionObserver(handleIntersection);
        appearing.forEach(appear => observer.observe(appear));
    }
    withdraw = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        await auctionWithSigner.withdraw();
    }
    showDeposit = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        const deposit = await auctionWithSigner.getDeposit();
        const depositInEth = ethers.utils.formatEther(deposit);
        const depositString = depositInEth.toString() + "Ξ";
        this.setState({deposit: depositString, depositShowed: true})
    }
    renderAuction = () => {
        const currentTime = Date.now();
        this.props.setHighestBid(this.state.highestBid);
        const auction = this.state.auctions.map((auction) => {
            return(
                <div className="auction-content">
                    <div className="auction-header">
                        <div className="hl page-hl desktop"></div>
                        <h1 className="page-header">LIVE!</h1>
                        <div className="countdown-container appearing">
                            <p className="countdown">
                                <div className="desktop countdown-text">
                                    {currentTime < this.state.startTimeState ? <div>Starts in: <Countdown targetDate={this.state.startTimeState}/></div> : <div>Ends in: <Countdown targetDate={this.state.endTimeState}/></div>}
                                </div></p>
                        </div>
                    </div>
                    <div className="painting-container">
                        <ReactPlayer className="auction-image appearing" playing={true} loop={true} url={auction.imageURL} />
                        <h2 className="painting-name appearing">{auction.title}</h2>
                        <h3 className="artist appearing">{auction.artist}</h3>
                        <div className="bid-container">
                            <p className="last-bid">Highest bid: {this.state.highestBid}Ξ</p>
                            <Link to="/auction/bid"><button className="bid-btn button"><div className="offer-img"></div>MAKE OFFER</button></Link>
                        </div>
                    </div>
                    <div className="withdraw-container mobile">
                            <div className="withdraw-info"><p className="withdraw-header">Your Deposit: {this.state.deposit}</p>{this.state.depositShowed ? '' : <button onClick={this.showDeposit} className="show-deposit"></button>}</div>
                            <button onClick={this.withdraw} className="button withdraw-btn">WITHDRAW</button>
                            <p className="withdraw-note">If you withdraw your bid <b>you won't win this auction.</b></p>
                    </div>
                    <div className="painting-about appearing">
                        <h3 className="painting-about-header">ABOUT PAINTING</h3>
                        <p className="painting-about-text">{auction.description}</p>
                    </div>
                    <div className="withdraw-container desktop">
                            <div className="withdraw-info"><p className="withdraw-header">Your Deposit: {this.state.deposit}</p>{this.state.depositShowed ? '' : <button onClick={this.showDeposit} className="show-deposit"></button>}</div>
                            <button onClick={this.withdraw} className="button withdraw-btn">WITHDRAW</button>
                            <p className="withdraw-note">If you withdraw your bid <b>you won't win this auction.</b></p>
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
                <Footer />
            </div>
        )
    }

}

export default connect(null, {setHighestBid})(AuctionPage);
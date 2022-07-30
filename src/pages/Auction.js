import React from "react";
import Navbar from "../components/MainNavbar";
import Footer from "../components/Footer";
// import api from "../api";
import "../style/auction.css"
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import { setHighestBid, setDeposit } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'
import Countdown from "../components/Countdown";
import PageLoader from "../components/PageLoader";

class AuctionPage extends React.Component {
    state = ({auctions: [], highestBid: '', startTimeState: 0, endTimeState: 0, withdrawalPending: false, loadingContent: false})
    componentWillMount = () => {
        this.setState({loadingContent: true})
    }
    componentDidMount = async () => {
        try{
            // const auctions = await api.get("/auction/list").then((result) => result.data)
            // await provider.send("eth_requestAccounts", []);
            // const auctionWithProvider = AuctionContract.connect(provider);
            // const highestBid = await auctionWithProvider.getHighestBid();
            // const startTime = await auctionWithProvider.getStartTime();
            // const endTime = await auctionWithProvider.getEndTime();
            // const startTimeAsNumber = startTime.toNumber()* 1000;
            // const endTimeAsNumber = endTime.toNumber()* 1000;
            // const highestBidInETH = ethers.utils.formatEther(highestBid);
            // const highestBidAsNumber = highestBidInETH.toString();
            // this.setState({auctions: auctions, highestBid: highestBidAsNumber, startTimeState: startTimeAsNumber, endTimeState: endTimeAsNumber, deposit: '', depositShowed: false});
            // this.setState({loadingContent: false})
        }catch(e){
            alert("Ooops! Your browser can't handle web3 or you don't have a Metamask account. Try Google Chrome with Metamask extension set up! PS. Remember to change your network to RINKEBY!")
        }

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
        this.state = { loadingContent: false }
    }
    withdraw = async () => {
        this.setState({withdrawalPending: true});
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        try{
            const tx = await auctionWithSigner.withdraw();
            await tx.wait();
            this.setState({withdrawalPending: false});
            alert("Withdrawal successful.")
        }catch(e){
            this.setState({withdrawalPending: false});
            alert("Something went wrong. Try again or contact us to resolve this issue.")
        }
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
    placeBid = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        const deposit = await auctionWithSigner.getDeposit();
        const depositInEth = ethers.utils.formatEther(deposit);
        this.props.setDeposit(depositInEth);
    }
    renderAuction = () => {
        const currentTime = Date.now();
        this.props.setHighestBid(this.state.highestBid);
        const auction = this.state.auctions.map((auction) => {
            return(
                <div className="auction-content">
                    <div className="auction-header">
                        <div className="hl page-hl desktop"></div>
                        {currentTime < this.state.startTimeState ? <h1 className="page-header">SOON!</h1> : <h1 className="page-header">LIVE!</h1>}
                        <div className="countdown-container appearing">
                            <p className="countdown">
                                <div className="desktop countdown-text">
                                    {currentTime < this.state.startTimeState ? <div>Starts in: <Countdown targetDate={this.state.startTimeState}/></div> : <div>Ends in: <Countdown targetDate={this.state.endTimeState}/></div>}
                                </div></p>
                        </div>
                        <div className="withdraw-container desktop">
                            <div className="withdraw-info"><p className="withdraw-header">Your Deposit: {this.state.deposit}</p>{this.state.depositShowed ? '' : <button onClick={this.showDeposit} className="show-deposit"></button>}</div>
                            <button onClick={this.withdraw} className="button withdraw-btn">WITHDRAW</button>
                            <p className="withdraw-note">If you withdraw your bid <b>you won't win this auction.</b></p>
                        </div>
                    </div>
                    <div className="painting-container">
                        <ReactPlayer className="auction-image appearing" playing={true} loop={true} url={auction.imageURL} />
                        <h2 className="painting-name appearing">{auction.title}</h2>
                        <h3 className="artist appearing">{auction.artist}</h3>
                        {currentTime < this.state.startTimeState ? 
                            '' :
                            <div className="bid-container">
                                <p className="last-bid">Highest bid: {this.state.highestBid}Ξ</p>
                                <Link to="/auction/bid" onClick={this.placeBid}><button className="bid-btn button"><div className="offer-img"></div>MAKE OFFER</button></Link>
                            </div>
                        }
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
                </div>
            )
        });
        return (
            <div>{auction}</div>
        );
        this.setState({loadingContent: false})
    }
    render(){
        return(
            <div className="auction-page">
                <Navbar />
                {this.state.loadingContent ? <PageLoader /> : ''}
                {this.renderAuction()}
                <Footer />
            </div>
        )
    }

}

export default connect(null, {setHighestBid, setDeposit})(AuctionPage);
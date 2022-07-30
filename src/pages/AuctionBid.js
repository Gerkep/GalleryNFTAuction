import React from "react";
import Navbar from "../components/MainNavbar";
import Footer from "../components/Footer";
// import api from "../api";
import "../style/auction.css"
import Modal from "../components/Modal";

class AuctionBid extends React.Component {
    state = ({auctions: []})
    componentDidMount = async () => {
        // const auctions = await api.get("/auction/list").then((result) => result.data)
        // this.setState({auctions: auctions});
    }
    renderAuction = () => {
            return(
                <div className="auction-content">
                    <div className="auction-header">
                        <div className="hl page-hl desktop"></div>
                        <h1 className="page-header">LIVE!</h1>
                        <div className="countdown-container">
                            1d 12h 12m 12s
                        </div>
                    </div>
                    <div className="painting-container">
                        <div className="auction-image" id="fake-image"></div>
                        <h2 className="painting-name">dfgae</h2>
                        <h3 className="artist">wrgaer</h3>
                        <div className="bid-container">
                            <p className="last-bid">Last bid: erwgtae</p>
                            <button className="bid-btn button"><div className="offer-img"></div>MAKE OFFER</button>
                        </div>
                    </div>
                    <div className="painting-about">
                        <h3 className="painting-about-header">ABOUT PAINTING</h3>
                        <p className="painting-about-text">desfasdf</p>
                    </div>
                </div>
            )
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
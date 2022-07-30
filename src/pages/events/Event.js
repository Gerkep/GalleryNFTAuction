import EventsNavbar from "../../components/EventsNavbar";
import "../../style/events/event.css"
const Event = (props) => {
    return(
        <div className="event-page">
            <EventsNavbar openPage="events"/>
            <div className="background-dim"></div>
            <div className="about-events-container event-about mobile">
                    <h1 className="about-events-header">MATA X VG</h1>
                    <p className="about-events-description event-info mobile">
                        Collect the <b>entire chorus</b> of  “Papuga” and <b>meet MATA on the backstage</b>!
                    </p>
            </div>
            <div className="mint-container">
                <div className="desktop">
                    <h1 className="about-mint-header">MATA X VICTOR GALLERY</h1>
                </div>
                <p className="mint-time">01d 23h 12m 34s</p>
                <div className="nft-content">
                <div className="nft-preview"></div>
                <div className="mint-about-nft">
                    <h2 className="nft-title">"PAPUGA"</h2>
                    <p className="nft-description desktop">
                    Disclaimer: This is an NFT(digital proof of ownership). If you don't have any previous experience with NFT/cryptocurrency, don't worry! Just take your time, set everything up before the minting process starts and you'll be fine. Here you can find how to do it: onboarding. This tutorial should help you get started and prepare you to buy our NFT. <br></br><br></br>Are you ready? Let's go! <br></br>Collect five of these and meet Mata in person before the concert! 
                    </p>
                    <div className="mint-about-container">
                        <div className="supply"><b>5/15</b></div>
                        <div className="mint-value-container">
                            <img alt="Ehtereum" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png" className="cryptocurrency-icon"></img>
                            <p className="value">0.1</p>
                        </div>
                    </div>
                    <button className="mint-btn">MINT!</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Event;
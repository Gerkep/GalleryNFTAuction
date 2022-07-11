import EventsNavbar from "../../components/EventsNavbar";
import "../../style/events/event.css"
const Event = (props) => {
    return(
        <div className="event-page">
            <EventsNavbar openPage="events"/>
            <div className="background-dim"></div>
            <div className="about-events-container mobile">
                    <h1 className="about-events-header">MATA X VG</h1>
                    <p className="about-events-description event-info mobile">
                        Collect the <b>entire chorus</b> of  “Papuga” and <b>meet MATA on the backstage</b>!
                    </p>
            </div>
            <div className="mint-container">
                <div className="desktop">
                    <h1 className="about-mint-header">MATA X VICTOR GALLERY</h1>
                    <p className="about-events-description event-info desktop">
                    Unforgetable event by one of the most well known young stars in Poland. Collect the <b>entire chorus</b> of his most popular song “Papuga” and <b>meet him on the backstage</b>!
                    </p>
                </div>
                <p className="mint-time">01d 23h 12m 34s</p>
                <div className="nft-preview"></div>
                <h2 className="nft-title">PAPUGA</h2>
                <div className="mint-about-container">
                    <p className="supply">5/15</p>
                    <div className="mint-value-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png" className="cryptocurrency-icon"></img>
                        <p className="value">0.1</p>
                    </div>
                </div>
                <button className="mint-btn">MINT</button>
            </div>
        </div>
    )
}

export default Event;
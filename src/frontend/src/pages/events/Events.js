import EventsNavbar from "../../components/EventsNavbar";
import PageLoader from "../../components/PageLoader";

import "../../style/events/events.css"
import history from "../../history";
import React from "react";

class Events extends React.Component {

    state = ({loadingContent: false})

    componentWillMount = () => {
        this.setState({loadingContent: true})
    }

    componentDidMount() {
        this.setState({loadingContent: false})
    }
    openEvent = () => {
        history.push("/events/1")
    }

    render(){
        return(
            <div>
                <EventsNavbar openPage="events"/>
                {this.state.loadingContent ? <PageLoader /> : ''}
                <div className="about-events-container">
                    <div className="events-header-container">
                    <button className="desktop button connect-wallet">CONNECT WALLET</button>
                        <h1 className="about-events-header">ART X MUSIC</h1>
                        <p className="about-events-description">
                            Events organised by the rising stars of Gen Z’s
                            favorite music combined with stunning visuals prepared by 
                            Victor Gallery.
                        </p>
                    </div>
                </div>
                <div className="events-container">
                    <div onClick={this.openEvent} className="event-highlight">
                        <div className="highlight-content">
                            <h2 className="event-highlight-header">MATA X VG</h2>
                            <h1 className="event-highlight-song">PAPUGA</h1>
                            <p className="event-highlight-date">21.11.2022</p>
                            <div className="event-highlight-location-container">
                                <div className="highlight-location-icon"></div>
                                <div className="highlight-location">Warsaw</div>
                            </div>
                        </div>
                    </div>
                    <div onClick={this.openEvent} className="event-highlight" id="nr2">
                        <div className="highlight-content">
                            <h2 className="event-highlight-header">OKI X VG</h2>
                            <h1 className="event-highlight-song">JEŻYK</h1>
                            <p className="event-highlight-date">01.12.2022</p>
                            <div className="event-highlight-location-container">
                                <div className="highlight-location-icon"></div>
                                <div className="highlight-location">Warsaw</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events;
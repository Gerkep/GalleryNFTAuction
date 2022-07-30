import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/events/event-navbar.css"

const Navbar = (props) => {

    return(
        <div className="event-navbar">
            <Link to="/"><div className="event-logo desktop"></div></Link>
            {props.openPage == "events" ? <Link to="/events"><div className="event-navbar-image" id="events-image-selected"></div></Link> :  <Link to="/events"><div className="event-navbar-image" id="events-image"></div></Link>}
            {props.openPage == "marketplace" ? <Link to="/marketplace"><div className="event-navbar-image" id="marketplace-image-selected"></div></Link> :  <Link to="/marketplace"><div className="event-navbar-image" id="marketplace-image"></div></Link>}
            {props.openPage == "profile" ? <Link to="/profile"><div className="event-navbar-image" id="profile-image-selected"></div></Link> :  <Link to="/profile"><div className="event-navbar-image" id="profile-image"></div></Link>}
        </div>
    )
}

export default Navbar;
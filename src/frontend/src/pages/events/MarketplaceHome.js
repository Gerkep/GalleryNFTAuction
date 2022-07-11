import ComingSoon from "../ComingSoon";
import EventsNavbar from "../../components/EventsNavbar";

const MarketplaceHome = (props) => {
    return(
        <div>
            <EventsNavbar openPage="marketplace"/>
            <ComingSoon what="MARKETPLACE"/>
        </div>
    )
}

export default MarketplaceHome;
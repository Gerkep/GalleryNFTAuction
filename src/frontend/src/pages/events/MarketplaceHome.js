import ComingSoon from "../ComingSoon";
import Navbar from "./Navbar";

const MarketplaceHome = (props) => {
    return(
        <div>
            <Navbar openPage="marketplace"/>
            <ComingSoon what="MARKETPLACE"/>
        </div>
    )
}

export default MarketplaceHome;
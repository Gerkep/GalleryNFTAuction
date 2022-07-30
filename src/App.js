import React from "react";
import { Router, Route, Switch} from 'react-router-dom';
import history from "./history";
import AuctionPage from "./pages/Auction";
import MainPage from "./pages/MainPage";
import CollectionPage from "./pages/Collection";
import AuctionBid from "./pages/AuctionBid";
import Dashboard from "./pages/Dashboard";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";
import "./style/main.css"
import LoginPage from "./pages/LoginPage";
import Events from "./pages/events/Events";
import MarketplaceHome from "./pages/events/MarketplaceHome";
import Profile from "./pages/events/Profile"
import Event from "./pages/events/Event";

 const App = () => {
    return(
            <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={MainPage} />
                        <Route path="/auction" exact component={AuctionPage} />
                        <Route path="/auction/bid" exact component={AuctionBid} />
                        <Route path="/auction/bid/success" exact component={SuccessPage} />
                        <Route path="/collection" exact component={CollectionPage} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/dashboard/auction" exact component={MainPage} />
                        <Route path="/dashboard/collection" exact component={MainPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/events" exact component={Events} />
                        <Route path="/marketplace" exact component={MarketplaceHome} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/events/:id" exact component={Event} />
                        <Route path="*" component={ErrorPage} />
                    </Switch>
            </Router>
    )
}

export default App;
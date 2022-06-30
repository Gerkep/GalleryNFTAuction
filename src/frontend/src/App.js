import React from "react";
import { Router, Route, Switch} from 'react-router-dom';
import history from "./history";
import AuctionPage from "./pages/Auction";
import MainPage from "./pages/MainPage";
import CollectionPage from "./pages/Collection";
import AuctionDashboard from "./pages/AuctionDashboard";
import CollectionDashboard from "./pages/CollectionDashbard";
import AuctionBid from "./pages/AuctionBid";
import Dashboard from "./pages/Dashboard";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";
import "./style/main.css"


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
                        <Route path="/dashboard/auction" exact component={AuctionDashboard} />
                        <Route path="/dashboard/collection" exact component={CollectionDashboard} />
                        <Route path="/error" component={ErrorPage} />
                        <Route path="*" component={ErrorPage} />
                    </Switch>
            </Router>
    )
}

export default App;
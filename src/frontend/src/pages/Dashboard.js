import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import history from "../history";
import api from "../api";
import { Field, reduxForm } from 'redux-form';
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import "../style/collection.css";
import { Link } from "react-router-dom";

import "../style/dashboard.css"

class Dashboard extends React.Component {
    render(){
        return (
            <div className="dashboard-page">
                <Navbar/>
                <div className="hl page-hl desktop"></div>
                <h1 className="page-header">DASHBOARD</h1>
                <div className="dashboard-container">
                    <Link to="/dashboard/auction" className="dashboard-link"><button className="button dashboard-choice">Auction Dashboard</button></Link>
                    <Link to="/dashboard/collection" className="dashboard-link"><button className="button dashboard-choice">Collection Dashboard</button></Link>
                </div>
            </div>
        )
    }
}

export default Dashboard;
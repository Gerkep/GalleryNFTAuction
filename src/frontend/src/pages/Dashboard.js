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

class Dashboard extends React.Component {
    render(){
        return (
            <div className="dashboard-page">
                <Navbar/>
                <Link to="/dashboard/auction"><button>Auction Dashboard</button></Link>
                <Link to="/dashboard/collection"><button>Collection Dashboard</button></Link>
            </div>
        )
    }
}

export default Dashboard;
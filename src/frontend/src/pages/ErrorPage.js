import React from "react";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../style/success.css"
import "../style/dashboard.css"


const Dashboard = () => {
        return (
            <div className="dashboard-page">
                <MainNavbar/>
                    <h1 className="bid-header">OOPS! THERE IS NOTHING INTERESTING HERE...</h1>
                    <Link to="/" className="success-link">Back to main page</Link>
                <Footer />
            </div>
        )
}

export default Dashboard;
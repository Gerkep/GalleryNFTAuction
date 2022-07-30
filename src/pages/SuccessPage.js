import React from "react";
import Navbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../style/success.css"
import Confetti from 'react-confetti'
import "../style/dashboard.css"
import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }

const Dashboard = () => {
        const { height, width } = useWindowDimensions();
        return (
            <div className="dashboard-page">
                <Navbar/>
                <Confetti
                    width={width}
                    height={height}
                />
                    <h1 className="bid-header">BID SUCCESSFUL!</h1>
                    <Link to="/auction" className="success-link">Back to auction</Link>
                <Footer />
            </div>
        )
}

export default Dashboard;
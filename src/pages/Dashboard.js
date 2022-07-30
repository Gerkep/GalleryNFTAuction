import React, { useEffect, useState } from "react";
import Navbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import history from "../history";
import { auth, db, logout } from "../firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { connect } from "react-redux";
import { setUser } from "../actions";
import { ethers } from "ethers";
import "../style/collection.css";
import { Link } from "react-router-dom";
import "../style/login.css";
import "../style/dashboard.css"

const Dashboard = (props) => {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return history.push("/");
        fetchUserName();
      }, [user, loading]);

    const renderDashboard = () => {
        if(user?.email != "gerke.contact@gmail.com"){
            history.push("/error")
        }else{
            const email = user?.email;
            props.setUser(email);
            return(
                <div>
                    <div className="hl page-hl desktop"></div>
                    <h1 className="page-header">DASHBOARD</h1>
                    <div className="dashboard-container">
                        <Link to="/dashboard/auction" className="dashboard-link"><button className="button dashboard-choice">AUCTION</button></Link>
                        <Link to="/dashboard/collection" className="dashboard-link"><button className="button dashboard-choice">COLLECTION</button></Link>
                        <button className="button logout-btn" onClick={logout}>
                            LOGOUT
                        </button>
                    </div>
                </div>
            )
        }
    }

        return (
            <div className="dashboard-page">
                <Navbar/>
                {renderDashboard()}
            </div>
        )
}

export default connect(null, {setUser})(Dashboard);
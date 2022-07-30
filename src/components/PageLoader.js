import React from "react";
import Navbar from "../components/MainNavbar";
import "../style/collection.css";

class PageLoader extends React.Component {

    render(){
        return (
            <div>
                <div className="page-loader-container">
                    <div className="loader-page">
                </div>
            </div>
            </div>
        )
    }
}


export default PageLoader;
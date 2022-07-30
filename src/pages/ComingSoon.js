import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/coming.css"

const ComingSoon = (props) => {

    return(
        <div className="coming-header-container">
            <h1 className="coming-header">{props.what} COMING SOON!</h1>
        </div>
    )
}

export default ComingSoon;
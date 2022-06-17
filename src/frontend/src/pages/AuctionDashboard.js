import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import history from "../history";
import api from "../api";
import { Field, reduxForm } from 'redux-form';
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import "../style/collection.css";

class AuctionDashboard extends React.Component {
    renderError = ({error, touched}) => {
        if (touched && error){
            return (
                <div className="error-text">{error}</div>
            );
        }
    }

    renderTextField = ({input, meta}) => {
        const className = `text-field ${meta.error && meta.touched ? 'field-error' : meta.touched ? 'field-correct' : ''}`;
        return (
            <div>
                {this.renderError(meta)}
                <input className={className} {...input} placeholder={input.name}/>
            </div>

        )
    }

    onSubmit = async (formValues) => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        await auctionWithSigner.start(formValues.StartTime, formValues.EndTime, ethers.utils.parseEther(formValues.InitialPrice));
        const artwork = {
            "title": formValues.ArtworkTitle,
            "artist": formValues.Author,
            "imageURL": formValues.ImageURI,
            "description": formValues.Description
        }
        const auction = {
            "title": formValues.ArtworkTitle,
            "artist": formValues.Author,
            "imageURL": formValues.ImageURI,
            "description": formValues.Description,
            "startTimestamp": formValues.StartTime,
            "endTimestamp": formValues.EndTime,
            "initialPrice": ethers.utils.parseEther(formValues.InitialPrice).toString()

        }
        await api.delete("/auction/delete");
       await api.post("/artwork/add", artwork);
       await api.post("/auction/add", auction);
       history.push("/auction");
    }

    endAuction = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        await auctionWithSigner.end();
        await api.delete("/auction/delete");
    }
    pauseAuction = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        await auctionWithSigner.setPause(true);
    }
    unpauseAuction = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        await auctionWithSigner.setPause(false);
    }
    render(){
        return (
            <div className="dashboard-page">
                <Navbar/>
                    <h1 className="dashboard-header">AUCITON DASHBOARD</h1>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="auction-form">
                            <Field name="ArtworkTitle" component={this.renderTextField}/>
                            <Field name="Author" component={this.renderTextField}/>
                            <Field name="ImageURI" component={this.renderTextField}/>
                            <Field name="Description" component={this.renderTextField}/>
                            <Field name="StartTime" component={this.renderTextField}/>
                            <Field name="EndTime" component={this.renderTextField}/>
                            <Field name="InitialPrice" component={this.renderTextField}/>
                        <button className="submit-btn">ADD</button>
                    </form>
                    <button onClick={this.endAuction} className="submit-btn">END AUCTION</button>
                    <br/>
                    <button onClick={this.pauseAuction}>PAUSE</button>
                    <button onClick={this.unpauseAuction}>UNPAUSE</button>
            </div>
        )
    }
}
const validate = (formValues) => {
    const errors ={};
    if(!(formValues.ArtworkTitle)){
        errors.ArtworkTitle = 'Enter artwork title'
    }
    return errors;
}

const formWrapped = reduxForm({
    form: 'artwork',
    validate
})(AuctionDashboard);

export default formWrapped;
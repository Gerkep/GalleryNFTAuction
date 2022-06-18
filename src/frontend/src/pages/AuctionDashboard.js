import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import history from "../history";
import api from "../api";
import { Field, reduxForm } from 'redux-form';
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import "../style/dashboard.css";

class AuctionDashboard extends React.Component {
    state = ({startPending: false})
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
        this.setState({startPending: true});
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        const tx = await auctionWithSigner.start(formValues.StartTime, formValues.EndTime, ethers.utils.parseEther(formValues.InitialPrice));
        await tx.wait();
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
       this.setState({startPending: false});
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
                    <div className="hl page-hl desktop"></div>
                    <h1 className="page-header">AUCITON DASHBOARD</h1>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="auction-form">
                        <div className="form-first-column">
                            <Field name="ArtworkTitle" component={this.renderTextField}/>
                            <Field name="Author" component={this.renderTextField}/>
                            <Field name="ImageURI" component={this.renderTextField}/>
                            <Field name="Description" component={this.renderTextField}/>
                        </div>
                        <div className="form-second-column">
                            <Field name="StartTime" component={this.renderTextField}/>
                            <Field name="EndTime" component={this.renderTextField}/>
                            <Field name="InitialPrice" component={this.renderTextField}/>
                            {this.state.startPending ? <button className="submit-btn button">PENDING...</button> : <button className="submit-btn button">ADD</button>}
                        </div>
                        <div className="third-column">
                            <button onClick={this.endAuction} className="submit-btn button">END AUCTION</button>
                            <button onClick={this.pauseAuction} className="submit-btn button">PAUSE</button>
                        <button onClick={this.unpauseAuction} className="submit-btn button">UNPAUSE</button>
                        </div>
                    </form>

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
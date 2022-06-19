import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import history from "../history";
import api from "../api";
import { Field, reduxForm } from 'redux-form';
import { AuctionContract, provider } from "../ethereum/Contracts";
import { ethers } from "ethers";
import "../style/dashboard.css";
import "../style/auctiondashboard.css"

class AuctionDashboard extends React.Component {
    state = ({startPending: false, endPending: false, pausePending: false, unpausePending: false})
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
        try{
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
            this.setState({startPending: false});
            await api.delete("/auction/delete");
            await api.post("/artwork/add", artwork);
            await api.post("/auction/add", auction);
            history.push("/auction");
        }catch (e) {
            alert("Can't start auction. Check if previous auction is finished or paused.")
        }

       this.setState({startPending: false});

    }

    endAuction = async () => {
        this.setState({endPending: true})
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        try{
           const tx = await auctionWithSigner.end();
           await tx.wait();
           this.setState({endPending: false})
           await api.delete("/auction/delete");
           alert("Auction ended successfully.")
        }catch (e){
            this.setState({endPending: false})
            alert("Something went wrong. Check if the auction has ended.")
        }
    }
    pauseAuction = async () => {
        this.setState({pausePending: true})
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        try{
            const tx = await auctionWithSigner.setPause(true);
            await tx.wait();
            alert("Auction paused.")
        }catch(e){
            alert("Can't pause auction. Check if it's running.")
        }
        
        this.setState({pausePending: false})
    }
    unpauseAuction = async () => {
        this.setState({unpausePending: true})
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const auctionWithSigner = AuctionContract.connect(signer);
        try{
            const tx = await auctionWithSigner.setPause(false);
            await tx.wait();
        }catch(e){
            alert("Can't unpause auction. Check if it's running.")
        }
        alert("Auction unpaused.")
        this.setState({unpausePending: false})
    }
    render(){
        return (
            <div className="dashboard-page">
                <Navbar/>
                    <div className="hl page-hl desktop"></div>
                    <h1 className="page-header">AUCITON DASHBOARD</h1>
                    <div className="auction-forms">
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
                                {this.state.startPending ? <button className="submit-btn button"><div className="loader">Loading...</div></button> : <button className="submit-btn button">ADD</button>}
                            </div>
                        </form>
                        <div className="third-column">
                            {this.state.endPending ? <button className="submit-btn button"><div className="loader">Loading...</div></button> : <button onClick={this.endAuction} className="submit-btn button">END AUCTION</button>}
                            {this.state.pausePending ? <button className="submit-btn button"><div className="loader">Loading...</div></button> : <button onClick={this.pauseAuction} className="submit-btn button">PAUSE</button>}
                            {this.state.unpausePending ? <button className="submit-btn button"><div className="loader">Loading...</div></button> : <button onClick={this.unpauseAuction} className="submit-btn button">UNPAUSE</button>}
                        </div>
                    </div>

                    

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
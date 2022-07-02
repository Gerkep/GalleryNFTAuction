import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import history from "../history";
import api from "../api";
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import "../style/collection.css";

class CollectionDashboard extends React.Component {

    state = ({id: 0})
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
        const artwork = {
            "title": formValues.ArtworkTitle,
            "artist": formValues.Author,
            "imageURL": formValues.ImageURI,
            "description": formValues.Description,
            "openseaLink": formValues.OpenseaLink
        }
       await api.post("/artwork/add", artwork);
       history.push("/collection")
    }
    handleChange = (event) =>{
        this.setState({id: event.target.value});
      }
    deleteFromCollection = async (event) => {
        event.preventDefault();
        await api.delete(`/artwork/${this.state.id}/delete`);
        history.push("/collection")
    }
    renderForm = () => {
        if(this.props.user != "gerke.contact@gmail.com"){
            history.push("/error")
        }else{
            return(
                <div className="auction-form">
                    <div className="form-first-column">
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                                <Field name="ArtworkTitle" component={this.renderTextField}/>
                                <Field name="Author" component={this.renderTextField}/>
                                <Field name="ImageURI" component={this.renderTextField}/>
                                <Field name="Description" component={this.renderTextField}/>
                                <Field name="OpenseaLink" component={this.renderTextField}/>
                                <button className="submit-btn button">ADD</button>
                        </form>
                    </div>
                    <div className="form-second-column">
                        <form onSubmit={this.deleteFromCollection}>
                            <input type="number" className="text-field" id="delete-field" placeholder="ArtworkId" value={this.state.id} onChange={this.handleChange}></input>
                            <input type="submit" className="submit-btn button" value="DELETE"></input>
                        </form>
                    </div>
                </div>
            )
        }
    }
    render(){
        return (
            <div className="dashboard-page">
                <Navbar/>
                    <div className="hl page-hl desktop"></div>
                    <h1 className="page-header">COLLECTION DASHBOARD</h1>
                    {this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.user};
};

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
})(CollectionDashboard);

export default connect(mapStateToProps)(formWrapped);
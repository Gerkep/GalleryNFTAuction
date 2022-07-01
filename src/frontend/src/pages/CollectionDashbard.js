import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import history from "../history";
import api from "../api";
import { Field, reduxForm } from 'redux-form';
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
    render(){
        return (
            <div className="dashboard-page">
                <Navbar/>
                    <div className="hl page-hl desktop"></div>
                    <h1 className="page-header">COLLECTION DASHBOARD</h1>
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
            </div>
        )
    }
}
const validate = (formValues) => {
    const errors ={};
    if(!(formValues.ArtworkTitle)){
        errors.ArtworkTitle = 'Enter artwork title'
    }
    // if(!(formValues.LastName)){
    //     errors.LastName = 'Enter your last name'
    // }
    // if(!(formValues.Email)){
    //     errors.Email = 'Enter correct email'
    // }
    // if(!(formValues.Telephone)){
    //     errors.Telephone = 'Enter correct telephone number'
    // }else if(formValues.Telephone.charAt(0) !== '+'){
    //     errors.Telephone = 'Remember about + and code)'
    // }
    // if(!(formValues.StreetAndNumber)){
    //     errors.StreetAndNumber = 'Enter your street and number'
    // }
    // if(!(formValues.PostalCode)){
    //     errors.PostalCode = 'Enter correct postal code'
    // }
    // if(!(formValues.City)){
    //     errors.City = 'Enter correct city'
    // }
    // let foundCountry = 0;
    // const countries = ["Poland", "United States"];
    // for (let i = 0; i<countries.length; i++){
    //     if(formValues.Country === countries[i]){
    //         foundCountry = 1
    //     }
    // }
    // if(foundCountry !== 1){
    //     errors.Country = 'We cannot deliver to your country yet;( Check spelling and make sure you provided your country name in English'
    // }
    // if(!(formValues.Country)){
    //     errors.Country = 'Enter correct country name'
    // }
    return errors;
}

const formWrapped = reduxForm({
    form: 'artwork',
    validate
})(CollectionDashboard);

export default formWrapped;
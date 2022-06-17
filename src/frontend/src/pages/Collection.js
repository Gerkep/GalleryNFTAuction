import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/collection.css";
import api from "../api";
import ReactPlayer from 'react-player'

class CollectionPage extends React.Component {

    state = ({artworkList: []})
    componentDidMount = async () => {
        await api.get("/artwork/list").then((response) =>{
            this.setState({artworkList: response.data})
        })
        .catch(function (ex) {
            console.log('Response parsing failed. Error: ', ex);
        });;
    }

    renderArtworks = () => {
        console.log(this.state.artworkList)
        const artworksToRender = this.state.artworkList.map((artwork) => {
            return(
                <div className="artwork-container">
                    <ReactPlayer className="artwork" playing={true} loop={true} url={artwork.imageURL} />
                    <div className="artwork-name">{artwork.title}</div>
                    {artwork.openseaLink ? <a href={artwork.openseaLink} className="opensea-link">View on opensea</a> : ''}
                </div>
            )
        });
        return(
            <div className="collection-container">{artworksToRender}</div>
        );
    }
    render(){
        return(
            <div className="collection-page">
                <Navbar />
                    <div className="hl page-hl desktop"></div>
                    <h1 className="page-header">COLLECTION</h1>
                        {this.renderArtworks()}
                <Footer />
            </div>
        )
    }
}

export default CollectionPage;
import React from "react";
import Navbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import "../style/collection.css";
import ReactPlayer from 'react-player'
import PageLoader from "../components/PageLoader";

class CollectionPage extends React.Component {

    state = ({artworkList: [], loadingContent: false})

    componentWillMount = () => {
        this.setState({loadingContent: true})
    }

    componentDidMount = async () => {
        // await api.get("/artwork/list").then((response) =>{
        //     this.setState({artworkList: response.data})
        // })
        // .catch(function (ex) {
        //     console.log('Response parsing failed. Error: ', ex);
        // });;

        //opacity from 0 to 1 observer
        const appearing = document.querySelectorAll('.appearing');

        //appering animation containers
        function handleIntersection(entries) {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
                }
            });
            }
        const observer = new IntersectionObserver(handleIntersection);
        appearing.forEach(appear => observer.observe(appear));
        this.setState({loadingContent: false})
    }

    renderArtworks = () => {
        const artworksToRender = this.state.artworkList.map((artwork) => {
            return(
                <div className="artwork-container appearing">
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
                {this.state.loadingContent ? <PageLoader /> : ''}
                    <div className="hl page-hl desktop"></div>
                    <h1 className="page-header">COLLECTION</h1>
                        {this.renderArtworks()}
                <Footer />
            </div>
        )
    }
}

export default CollectionPage;
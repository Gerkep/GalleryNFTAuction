import React from "react";
import Navbar from "../components/MainNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";

class MainPage extends React.Component {

    state = ({loadingContent: false})

    componentWillMount = () => {
        this.setState({loadingContent: true})
    }
    componentDidMount(){
                const appearing = document.querySelectorAll('.appearing');

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
    render(){
        return(
            <div>
                <Navbar />
                {this.state.loadingContent ? <PageLoader /> : ''}
                <div className="welcome-container">
                    <div className="main-img appearing" id="colorful-img"></div>
                    <div className="main-img appearing" id="red-img"></div>
                    <div className="vl desktop appearing" id="main-vl"></div>
                    <h1 className="slogan appearing">Cooking <b>Art</b><br/>in <b>Gen Z</b> Style</h1>
                    <h3 className="main-description appearing">Mixing conventional art with latest technology advancements and favorite Gen Z’s artists<span> 🧪 </span></h3>
                    <Link to="/events"><button className="button main-btn appearing">CHECK OUT EVENTS!</button></Link>
                </div>
                <div className="about-container">
                    <div className="vl"></div>
                    <h2 className="about-header mobile appearing">Living Art.</h2>
                    <h2 className="about-header desktop appearing">Art X<br></br>Modern Music.</h2>
                    <p className="about-description appearing">Your favorite artist's concerts in amazing atmosphere of animated art and <b>sick visual effects</b> prepared by our gallery. 
                    </p>
                    <Link to="/collection"><button className="button collection-btn">See upcoming events</button></Link>
                    <div className="iphone-mockup mockup-appear"></div>
                </div>
                <div className="benefits-conatiner">
                    <div className="hl"></div>
                    <h2 className="benefits-header appearing">What you get?</h2>
                    <div className="benefits">
                        <div className="benefit appearing">
                            <div className="benefit-illustration " id="vip-illustration"></div>
                            <p className="benefit-description">Opportunity to meet your favorite artist.</p>
                        </div>
                        <div className="benefit appearing">
                            <div className="benefit-illustration" id="tokens-illustration"></div>
                            <p className="benefit-description">Gift Tokens for which you can buy NFTs cheaper!</p>
                        </div>
                        <div className="benefit appearing">
                            <div className="benefit-illustration" id="community-illustration"></div>
                            <p className="benefit-description">Access to newest singles before everyone else.</p>
                        </div>
                    </div>
                </div>
                <div className="cta-btn-container appearing">
                    <Link to="/events">
                        <button className="button cta-btn">
                            JOIN OUR UPCOMING EVENTS!
                        </button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }
}

export default MainPage;
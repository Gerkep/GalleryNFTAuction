import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

class MainPage extends React.Component {

    componentDidMount(){
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
    }
    render(){
        return(
            <div>
                <Navbar />
                <div className="main-img appearing" id="colorful-img"></div>
                <div className="main-img appearing" id="red-img"></div>
                <div className="vl desktop appearing" id="main-vl"></div>
                <h1 className="slogan appearing">One Art,<br/>Different People.</h1>
                <h3 className="main-description appearing">Combining conventional, physical art<br></br> with the latest technology advancements. </h3>
                <Link to="/auction"><button className="button main-btn appearing">CHECK LIVE AUCTION!</button></Link>
                <div className="about-container">
                    <div className="vl"></div>
                    <h2 className="about-header mobile appearing">Living Art.</h2>
                    <h2 className="about-header desktop appearing">Art Brought<br></br> To Life.</h2>
                    <p className="about-description appearing">We’ve done our best<br className="mobile"/> transforming real world<br className="mobile"/> paintings into digital art.<br className="mobile"/> 
                        We literally brought art to <br className="mobile"/>life by animating real<br className="mobile"/> paintings and thus creating<br className="mobile"/> artwork with a soul.
                    </p>
                    <Link to="/collection"><button className="button collection-btn">See our artwork</button></Link>
                    <div className="iphone-mockup mockup-appear"></div>
                </div>
                <div className="hl"></div>
                <h2 className="benefits-header appearing">What you get?</h2>
                <div className="benefits">
                    <div className="benefit appearing">
                        <div className="benefit-illustration " id="picture-illustration"></div>
                        <p className="benefit-description">Physical artwork which you can and on your wall.</p>
                    </div>
                    <div className="benefit appearing">
                        <div className="benefit-illustration" id="tokens-illustration"></div>
                        <p className="benefit-description">Tokens- buy art, tickets or even book a barber!</p>
                    </div>
                    <div className="benefit appearing">
                        <div className="benefit-illustration" id="metaverse-illustration"></div>
                        <p className="benefit-description">Your artwork displayed in the metaverse gallery.</p>
                    </div>
                </div>
                <div className="cta-btn-container appearing">
                    <Link to="/auction">
                        <button className="button cta-btn">
                            CHECK OUT LIVE AUCTION NOW!
                        </button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }
}

export default MainPage;
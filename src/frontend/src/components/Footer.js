import React from "react";
import { Link } from "react-router-dom";
import "../style/footer.css"
const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-logo-container">
                <div className="footer-logo"></div>
            </div>
            <div className="footer-section" id="customer-service-section">
                <h4 className="footer-section-header">Customer Service</h4>
                <div className="footer-links">
                    <a href="" className="footer-link">Returns</a>
                    <a href="" className="footer-link">Privacy Policy</a>
                    <a href="" className="footer-link">Terms & Conditions</a>
                    <a href="" className="footer-link">Suppliers</a>
                </div>
            </div>
            <div className="footer-section" id="connect-section">
                <h4 className="footer-section-header">Connect With Us</h4>
                <div className="footer-links">
                    <a href="" className="footer-link">Contact Form</a>
                    <a href="" className="footer-link">Twitter</a>
                    <a href="" className="footer-link">Instagram</a>
                </div>
            </div>
            <div className="contact">
                <div className="contact-container">
                    <div className="contact-illustration" id="telephone-illustration"></div><p className="telephone">+48 608 830 369</p>
                </div>
                <div className="contact-container">
                    <div className="contact-illustration" id="email-illustration"></div><p className="email">victorgallery.oneart@gmail.com</p>
                </div>
                <div className="contact-container">
                    <div className="contact-illustration" id="address-illustration"></div><p className="address">Regatowa 31, 60-480 Poznań</p>
                </div>
            </div>
            <div className="contribution">
                <p>Copyright © 2021 Victor Gallery. All rights reserved.</p><br/> <br className="mobile"/><p className="designer">Designed & Developed by Piotr Gerke.</p>
            </div>
        </footer>
    )
}

export default Footer;
// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaLinkedin
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <>
      <br /><br /><br />
      <hr />
      <footer className="footer bg-light position-relative">
        <div className="d-flex justify-content-around flex-wrap p-3">
          <div className="text-dark m-3">
            <div className="text-secondary">FlexibilityHub</div>

            <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</Link>
            <div>Live streams</div>
          </div>

          {/* <div className="text-dark m-3">
            <div className="text-secondary">Support</div>
            <div>Community</div>
            <div>Guidelines</div>
          </div> */}
{/* 
          <div className="text-dark m-3">
            <div className="text-secondary">Help</div>
            <div>Terms & Condition</div>
            <div>Privacy policy</div>
            <div>Cookies Settings</div>
          </div> */}

          <div className="text-dark m-3">
            <div className="text-secondary" style={{ fontSize: '25px' }}>Follow Us</div>
            <ul className="list-unstyled">
              <li className="text-start">
                <FaMapMarkerAlt  />
                ABC Street, Gujarat
              </li>
              <li>
                <FaPhone />
                +91-6353325697
              </li>
              <li>
                <a href="mailto:rajpatel123@gmail.com" >
                  <MdEmail  />
                  raiyaniprincy26@gmail.com
                </a>
              </li>
            </ul>

            <div className="d-flex justify-content-center">
              <a href="#" style={{ padding: '10px', color: 'black', fontSize: '20px' }}><FaFacebook /></a>
              <a href="#" style={{ padding: '10px', color: 'black', fontSize: '20px' }}><FaTwitter /></a>
              <a href="#" style={{ padding: '10px', color: 'black', fontSize: '20px' }}><FaInstagram /></a>
              <a href="#" style={{ padding: '10px', color: 'black', fontSize: '20px' }}><FaGoogle /></a>
              <a href="#" style={{ padding: '10px', color: 'black', fontSize: '20px' }}><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;


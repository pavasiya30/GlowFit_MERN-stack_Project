// src/components/HeroSection.js

import React from 'react';
import './HeroSection.css';
import { useNavigate, Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-container container-fluid">
      <h1 className="hero-title">Glow online with balance</h1>
      <p className="hero-subtitle">
        Over 500 yoga and meditation classes and guided programs.
      </p>
      <div className="hero-button-container">
         <Link className="nav-link a1 b1" to="/follow">
          <button type="button" className="btn btn-danger hero-button">
         Try free for limited classes          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;


// src/components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <div className="container-fluid text-center" style={{ paddingBottom: '10%', paddingTop: '8%' }}>
      <h1 className="a1" style={{ fontWeight: 'bold', fontSize: '70px' }}>
        Glow online with balance
      </h1>
      <p className="a1" style={{ fontWeight: 'bold', fontSize: '15px', opacity: '0.6' }}>
        over 500 yoga and meditation classes and guided programs.
      </p>
      <button className="btn btn-danger head-button mt-3">Try us free for 14 days</button>
    </div>
  );
};

export default Hero;

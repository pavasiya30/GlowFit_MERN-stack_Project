// src/components/ProgramSection.js
import React from 'react';

const ProgramCard = ({ title, price, highlight }) => (
  <div className="col-md-4">
    <div style={{ backgroundColor: highlight ? 'rgb(84, 5, 121)' : 'rgb(221, 197, 228)', padding: '5% 4% 6% 4%' }}>
      <h5 style={{ textAlign: 'center', color: highlight ? 'rgb(221, 197, 228)' : 'rgb(84, 5, 121)', fontWeight: 'bold' }}>
        {title.toUpperCase()}
      </h5>
      <h1 style={{ textAlign: 'center', color: highlight ? 'rgb(221, 197, 228)' : 'rgb(84, 5, 121)' }}>
        ₹{price}<span style={{ fontSize: '18px', fontWeight: 300 }}>/mo</span>
      </h1>
    </div>
    <div className="border border-2" style={{ backgroundColor: 'aliceblue', color: 'black' }}>
      <br />
      <p style={{ textAlign: 'center' }}>Personal Trainer</p><hr />
      <p style={{ textAlign: 'center' }}>Special Class</p><hr />
      <p style={{ textAlign: 'center' }}>Free Tutorials</p><hr />
      <p style={{ textAlign: 'center' }}>Group Training</p>
      <div style={{ textAlign: 'center', paddingBottom: '5%' }}>
        <a href="/signup">
          <button className="button2" style={{ backgroundColor: highlight ? 'rgb(84, 5, 121)' : '' }}>Join Now</button>
        </a>
      </div>
    </div>
  </div>
);

const ProgramSection = () => {
  return (
    <div className="container-fluid">
      <div className="line" style={{ width: '60%', paddingLeft: '40%' }}>
        <hr className="line-hr" />
        <p className="para" style={{ fontSize: '22px', textAlign: 'center', color: 'rgb(84, 5, 121)' }}>Yoga Package</p>
        <hr className="line-hr" />
      </div>
      <h1 style={{ textAlign: 'center', color: 'rgb(84, 5, 121)' }}>Yoga Pricing Plan</h1><br />
      <div className="row container" style={{ paddingLeft: '12%' }}>
        <ProgramCard title="Basic" price="3000" />
        <ProgramCard title="Standard" price="5000" highlight />
        <ProgramCard title="Premium" price="6500" />
      </div>
    </div>
  );
};

export default ProgramSection;

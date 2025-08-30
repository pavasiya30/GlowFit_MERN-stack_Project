// src/components/InfoSection.js
import React from 'react';
import './InfoSection.css';

const InfoSection = () => {
  const infoBlocks = [
    {
      img: "https://www.ekhartyoga.com/media/image/articles/1.svg",
      title: "Styles to suit you",
      desc: "Find your flow with Vinyasa, go inward with Yin, develop presence with meditation, move energy with Qigong."
    },
    {
      img: "https://www.ekhartyoga.com/media/image/articles/2.svg",
      title: "Yoga anytime",
      desc: "Energise your morning, re-focus at lunchtime, unwind in the evening, sleep deeply at night."
    },
    {
      img: "https://www.ekhartyoga.com/media/image/articles/3.svg",
      title: "Top-level teachers",
      desc: "Learn from and connect with passionate yoga and meditation experts."
    },
    {
      img: "https://www.ekhartyoga.com/media/image/articles/1.svg",
      title: "Yoga on the go",
      desc: "Download and practice your favourite classes anytime, anywhere using our app."
    }
  ];

  return (
    <div className="container-fluid a2 info-section">
      <div className="row">
        <div className="col-md-12 right_section">
          {infoBlocks.map((block, index) => (
            <div className="square_block border border-2" key={index}>
              <img src={block.img} alt={block.title} className="icon" />
              <h4>{block.title}</h4>
              <p className="sp">{block.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;

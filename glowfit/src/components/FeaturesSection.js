import React from 'react';
import './FeaturesSection.css';
import yoga1 from '../assets/yoga1.jpg';
import yoga2 from '../assets/yoga2.jpg';
import yoga3 from '../assets/yoga3.jpg';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Beginner Friendly",
      description: "Start your yoga journey with our carefully curated beginner classes. Learn proper form and breathing techniques from expert instructors.",
     
      image: yoga1
    },
    {
      id: 2,
      title: "Advanced Practice",
      description: "Challenge yourself with advanced poses and sequences designed to enhance strength, flexibility, and mindfulness.",
 
      image: yoga2
    },
    {
      id: 3,
      title: "Meditation & Mindfulness",
      description: "Discover inner peace through guided meditation sessions and mindfulness practices for mental wellness.",
   
      image: yoga3
    }
  ];

  return (
    <div className="features-section">
      <div className="container">
        <div className="features-header">
          <h2 className="features-title">Why Choose Our Yoga Platform?</h2>
          <p className="features-subtitle">
            Experience the perfect blend of traditional yoga wisdom and modern convenience
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-image-container">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="feature-image"
                  onError={(e) => {
                    e.target.src = yoga1; // fallback image
                  }}
                />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default FeaturesSection;

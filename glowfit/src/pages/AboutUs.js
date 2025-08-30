import React from 'react';
import './AboutUs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import x1 from '../assets/t2.jpg';
import x2 from '../assets/yoga1.jpg';
import x3 from '../assets/y2.5.jpg';
import x4 from '../assets/yoga10.jpg';
import aboutYoga from '../assets/yoga15.jpg'
import promoImage from '../assets/yoga21.jpg';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <>
      <div className="container scroll-container">
        <img src={x1} alt="Cinque Terre" />
        <img src={x2} alt="Forest" />
        <img src={x3} alt="Northern Lights" />
        <img src={x4} alt="Mountains" />
      </div>

      {/* ✅ About Section */}
      {/* <div className="container text-center mt-5">
        <h2 className="mb-3">Welcome to GlowFit</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "800px", margin: "0 auto" }}>
          At <b>Flexibility Hub</b>, we believe in empowering your body and mind through the art of yoga 
          and holistic wellness. Our premium programs are designed to improve flexibility, build strength, 
          and enhance inner peace.  
          <br /><br />
          Whether you are a beginner or an advanced practitioner, our expert-led sessions and guided 
          meditation classes will help you achieve your fitness goals while nurturing mental clarity.
        </p>

        <h4 className="mt-4">join us and embrace a healthier, more balanced lifestyle!</h4>
      </div> */}


      <div className="about-page font-sans" >
        {/* Hero Section */}
        <section
          className="container relative py-20 text-center text-white"
          style={{
            background: "linear-gradient(135deg, rgb(84, 5, 121), rgb(221, 197, 228))",
            height: "160px"
          }}
        >
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">About GlowFit</h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed opacity-90">
            Empowering your mind, body, and spirit through yoga, meditation, and holistic fitness.
          </p>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            {/* <img style={{width:'100%', height:'50%'}}
            src={aboutYoga}
            alt="GlowFit Yoga"
            className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          /> */}
          </div>
          <div>
            <h2 className="text-4xl font-bold text-purple-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At <b>GlowFit</b>, we aim to redefine fitness by blending traditional yoga with modern wellness practices.
              Our programs are designed to help you not only build strength and flexibility but also achieve emotional balance and peace of mind.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From beginner-friendly sessions to advanced challenges, we provide a supportive environment where every member thrives.
            </p>
          </div>
        </section>

        {/* Why Choose GlowFit */}
        <section
          className="py-16 container"
          style={{ backgroundColor: "rgb(221, 197, 228)" }}
        ><br></br>
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-purple-900 mb-12">Why Choose GlowFit?</h2> <br></br>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all"><br></br>
                <h3 className="text-xl font-semibold mb-3 text-purple-900"> Expert Guidance</h3>
                <p className="text-gray-600">
                  Train with certified instructors who bring years of yoga and fitness expertise.
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all"><br></br>
                <h3 className="text-xl font-semibold mb-3 text-purple-900"> Holistic Wellness</h3>
                <p className="text-gray-600">
                  Experience yoga, meditation, mindfulness, and workouts under one roof.
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all"><br></br>
                <h3 className="text-xl font-semibold mb-3 text-purple-900">Supportive Community</h3>
                <p className="text-gray-600">
                  Join a family that motivates, inspires, and grows together on the path to wellness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="container yoga-promo">
          <div className="row">
            <div className="col-md-4 text-col">
              <h1 className="promo-title" style={{color:'rgb(84, 5, 121),'}}>Make yoga part of your life</h1>
              <p className="promo-subtitle" style={{color:'rgb(84, 5, 121),'}}>Sharing the love of yoga to create positive change in the world</p>
            </div>
            <div className="col-md-4 image-col">
              <img src={promoImage} alt="Yoga Promotion" className="promo-image" />
            </div>
            <div className="col-md-3 cta-col">
              <a href="/follow">
                <button className="cta-button" style={{color:'rgb(84, 5, 121)'}}>Try 14 days for free</button>
              </a>
              <p className="cta-text">
                Then enjoy full membership for 1600₹ / month per month, and cancel any time
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;


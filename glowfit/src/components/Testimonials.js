// src/components/Testimonials.js
import React from 'react';

const testimonials = [
  {
    text: "Esther, you are a true champion to me... Your variety of teachers is phenomenal...",
    name: "Maila",
    date: "November 4th 2018",
    initial: "M"
  },
  {
    text: "You folks at FlexibilityHub always seem to give us the exact class we need.",
    name: "Cindy",
    date: "September 17th 2020",
    initial: "C"
  },
  {
    text: "Outstanding quality of teachers and teachings here at EkhartYoga.",
    name: "Carole",
    date: "June 14th 2019",
    initial: "C"
  },
  {
    text: "Subscribing to FlexibilityHub has been the best choice for my mental, spiritual and physical health.",
    name: "Melissa",
    date: "November 4th 2018",
    initial: "M"
  },
  {
    text: "Subscribing to FlexibilityHub has helped establish a home practice I look forward to each day.",
    name: "Maila",
    date: "November 4th 2018",
    initial: "M"
  }
];

const Testimonials = () => {
  return (
    <div className="container mt-5">
      <h1 className="a1 text-center" style={{ fontWeight: 'bolder', fontSize: '50px' }}>
        What our members say
      </h1>
      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {testimonials.map((item, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div className="container border border-2 carousel_div">
                {item.text}
              </div>
              <div className="carousel-caption" style={{ paddingTop: '50px' }}>
                <p className="a1">{item.name} — Member since {item.date}</p>
                <button className="btn carousel_btn">{item.initial}</button>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;

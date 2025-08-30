import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './MemberShowcase.css';

const MemberShowcase = () => {
  const { user, isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({ text: '', rating: 5 });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to static testimonials if API fails
      setReviews([
        {
          _id: '1',
          text: "Esther, you are a true champion to me in the sense that you entered the yoga arena with genuine integrity... Your variety of teachers is phenomenal, I've always recommended your site, and you in particular, as a safe online yoga space for people to turn to.",
          userName: "Maila",
          createdAt: "2018-11-04",
        },
        {
          _id: '2',
          text: "You folks at FlexibilityHub-yoga always seem to give us the exact class we need. It's like opening a gift just for me. Love and gratitude.",
          userName: "Cindy",
          createdAt: "2020-09-17",
        },
        {
          _id: '3',
          text: "I never cease to be amazed at the outstanding quality of the teachers and teachings here. I've lost count of the number of times that I have recommended this online yoga studio to others.",
          userName: "Carole",
          createdAt: "2019-06-14",
        },
        {
          _id: '4',
          text: "Subscribing to FlexibilityHub-yoga has been the best choice for my mental, spiritual and physical health. I have established a home practice I look forward to each day.",
          userName: "Melissa",
          createdAt: "2018-11-04",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setEditForm({ text: review.text, rating: review.rating });
  };

  const handleUpdateReview = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/reviews/${editingReview._id}`, {
        text: editForm.text,
        rating: editForm.rating
      });
      
      // Update the reviews list
      setReviews(reviews.map(review => 
        review._id === editingReview._id ? response.data : review
      ));
      setEditingReview(null);
      setEditForm({ text: '', rating: 5 });
      
      // Show success message
      alert('Review updated successfully!');
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Error updating review: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await axios.delete(`http://localhost:5001/api/reviews/${reviewId}`);
      setReviews(reviews.filter(review => review._id !== reviewId));
      
      // Show success message
      alert('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review: ' + (error.response?.data?.message || error.message));
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  const isUserReview = (review) => {
    return isLoggedIn && user && (user.id === review.userId || user._id === review.userId);
  };

  if (loading) {
    return (
      <div className="member-showcase-section">
        <div className="container">
          <h1 className="section-heading">What our members say</h1>
          <div className="loading-message">Loading reviews...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="member-showcase-section">
      {/* Members Say Section */}
      <div className="container-fluid">
        <h1 className="section-heading">What our members say</h1>
      </div>
      <div className="container">
        <div id="memberCarousel" className="carousel slide" data-bs-ride="carousel">
          {/* Carousel indicators */}
          <div className="carousel-indicators">
            {reviews.map((_, i) => (
              <button
                key={i}
                data-bs-target="#memberCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
              ></button>
            ))}
          </div>

          {/* Carousel items */}
          <div className="carousel-inner">
            {reviews.map((review, i) => (
                             <div key={review._id} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                 <div className={`carousel_div container border border-2 ${editingReview && editingReview._id === review._id ? 'edit-mode' : ''}`}>
                  {editingReview && editingReview._id === review._id ? (
                    // Edit mode
                    <div className="edit-review-form">
                      <div className="form-group">
                        <label>Rating:</label>
                        <select 
                          value={editForm.rating} 
                          onChange={(e) => setEditForm({...editForm, rating: parseInt(e.target.value)})}
                          className="rating-select"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                          <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                          <option value={3}>⭐⭐⭐ (3 stars)</option>
                          <option value={2}>⭐⭐ (2 stars)</option>
                          <option value={1}>⭐ (1 star)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Review:</label>
                                                 <textarea
                           value={editForm.text}
                           onChange={(e) => setEditForm({...editForm, text: e.target.value})}
                           className="review-textarea"
                           rows="3"
                           required
                         />
                      </div>
                      <div className="edit-actions">
                        <button onClick={handleUpdateReview} className="save-btn">Save</button>
                        <button onClick={() => setEditingReview(null)} className="cancel-btn">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    // Display mode
                    <>
                      <div className="review-text">{review.text}</div>
                      <div className="review-rating">{renderStars(review.rating)}</div>
                      {isUserReview(review) && (
                        <div className="review-actions">
                          <button 
                            onClick={() => handleEditReview(review)}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteReview(review._id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="carousel-caption" style={{ paddingTop: '50px' }}>
                  <p className="a1" style={{ display: 'inline-block' }}>
                    {review.userName} Member since-{formatDate(review.createdAt)}
                  </p>
                  <div>
                    <button type="button" className="btn carousel_btn">{getInitial(review.userName)}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#memberCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#memberCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberShowcase;

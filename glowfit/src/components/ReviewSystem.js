import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './ReviewSystem.css';

const ReviewSystem = () => {
  const { user, isLoggedIn } = useAuth();
  const [newReview, setNewReview] = useState({ text: '', rating: 5 });
  const [loading, setLoading] = useState(false);
  const [userHasReview, setUserHasReview] = useState(false);
  const [userReview, setUserReview] = useState(null);

  // Check user review on component mount
  useEffect(() => {
    if (isLoggedIn && user) {
      checkUserReview();
    }
  }, [isLoggedIn, user]);

  const checkUserReview = async () => {
    try {
      const userId = user.id || user._id;
      const response = await axios.get(`http://localhost:5001/api/reviews/user/${userId}`);
      setUserHasReview(response.data.hasReview);
      setUserReview(response.data.review);
    } catch (error) {
      console.error('Error checking user review:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.text.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/reviews', {
        text: newReview.text,
        rating: newReview.rating,
        userId: user.id || user._id,
        userName: user.name
      });
      
      setNewReview({ text: '', rating: 5 });
      setUserHasReview(true);
      setUserReview(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response?.data?.hasReview) {
        setUserHasReview(true);
        setUserReview(error.response.data.review);
      }
      alert(error.response?.data?.message || 'Error submitting review');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5001/api/reviews/${reviewId}`);
      
      // If user deleted their own review, reset the user review state
      if (userReview && userReview._id === reviewId) {
        setUserHasReview(false);
        setUserReview(null);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="review-system">
      <div className="container">
        <h2 className="review-title">Share Your Experience</h2>
        <p className="review-subtitle">Help others discover the benefits of yoga with your feedback</p>
        
        {/* Add Review Form - Only for logged in users */}
        {isLoggedIn && !userHasReview && (
          <div className="add-review-section">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label>Your Rating:</label>
                <select 
                  value={newReview.rating} 
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
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
                <label>Your Review:</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  placeholder="Share your yoga journey experience..."
                  className="review-textarea"
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* Show message when user already has a review */}
        {isLoggedIn && userHasReview && (
          <div className="user-review-section">
            <h3>Review Status</h3>
            <div className="user-review-card">
              <div className="review-status-message">
                <p>✅ You already gave your review!</p>
                <p>You can update or delete your review from the "What our members say" section below.</p>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default ReviewSystem;

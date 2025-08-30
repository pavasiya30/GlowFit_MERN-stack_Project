
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './Follow.css';

// Trial videos data
const trialVideos = [
  {
    id: 1,
    title: "Beginner Yoga Flow - 15 Minutes",
    description: "Perfect for beginners! This gentle flow introduces basic yoga poses and breathing techniques. Great for morning energy boost.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE",
    thumbnail: "https://img.youtube.com/vi/v7AYKMP6rOE/maxresdefault.jpg",
    instructor: "Sarah Johnson",
    difficulty: "Beginner",
    category: "Flow"
  },
  {
    id: 2,
    title: "Core Strength & Balance - 18 Minutes",
    description: "Build core strength and improve balance with this intermediate session. Focus on stability and controlled movements.",
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/4pKly2JojMw",
    thumbnail: "https://img.youtube.com/vi/4pKly2JojMw/maxresdefault.jpg",
    instructor: "Mike Chen",
    difficulty: "Intermediate",
    category: "Strength"
  },
  {
    id: 3,
    title: "Evening Relaxation - 12 Minutes",
    description: "Wind down your day with this calming session. Perfect for stress relief and better sleep preparation.",
    duration: "12 min",
    videoUrl: "https://www.youtube.com/embed/0kMRLJ6Qw3U",
    thumbnail: "https://img.youtube.com/vi/0kMRLJ6Qw3U/maxresdefault.jpg",
    instructor: "Emma Davis",
    difficulty: "All Levels",
    category: "Relaxation"
  },
  {
    id: 4,
    title: "Flexibility & Stretching - 20 Minutes",
    description: "Improve your flexibility with this comprehensive stretching session. Great for post-workout recovery.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    instructor: "Alex Rodriguez",
    difficulty: "All Levels",
    category: "Flexibility"
  }
];

const FollowSection = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  // Trial state
  const [trialStatus, setTrialStatus] = useState({
    trialUsed: false,
    trialCompleted: false,
    videosCompleted: 0,
    totalVideos: 4,
    subscriptionStatus: 'inactive'
  });
  
  // UI state
  const [showTrialVideos, setShowTrialVideos] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [loading, setLoading] = useState(false);

  // Fetch trial status
  const fetchTrialStatus = async () => {
    if (!user?.id) {
      console.log('No user ID available for fetchTrialStatus');
      return;
    }
    
    console.log('Fetching trial status for user ID:', user.id);
    try {
      const response = await axios.get(`http://localhost:5001/api/user/trial-status/${user.id}`);
      console.log('Trial status response:', response.data);
      setTrialStatus(response.data);
    } catch (error) {
      console.error('Error fetching trial status:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
    }
  };

  useEffect(() => {
    console.log('FollowSection useEffect - isLoggedIn:', isLoggedIn);
    console.log('FollowSection useEffect - user:', user);
    console.log('FollowSection useEffect - user?.id:', user?.id);
    
    if (isLoggedIn && user?.id) {
      fetchTrialStatus();
    }
  }, [isLoggedIn, user?.id]);

  const handleStartTrial = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    console.log('User object:', user);
    console.log('User ID:', user?.id);
    console.log('Is logged in:', isLoggedIn);

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5001/api/user/start-trial/${user.id}`);
      console.log('Trial start response:', response.data);
      await fetchTrialStatus();
      setShowTrialVideos(true);
      alert('🎉 Your 14-day free trial has started! Enjoy 4 exclusive videos.');
    } catch (error) {
      console.error('Error starting trial:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      if (error.response?.status === 400) {
        alert('Trial already used. Please subscribe to continue.');
      } else {
        alert('Error starting trial. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const completeVideo = async (videoId) => {
    if (!user?.id) return;

    try {
      const response = await axios.post(`http://localhost:5001/api/user/complete-video/${user.id}`);
      await fetchTrialStatus();
      
      if (response.data.trialCompleted) {
        alert('🎉 Congratulations! You have completed all trial videos.');
      } else {
        alert(`Video completed! ${response.data.videosCompleted}/${response.data.totalVideos} videos done.`);
      }
      
      closeVideo();
    } catch (error) {
      console.error('Error completing video:', error);
      alert('Error completing video. Please try again.');
    }
  };

  const skipVideo = async (videoId) => {
    if (!user?.id) return;

    try {
      const response = await axios.post(`http://localhost:5001/api/user/skip-video/${user.id}`);
      await fetchTrialStatus();
      
      if (response.data.trialCompleted) {
        alert('🎉 Trial completed!');
      } else {
        alert(`Video skipped! ${response.data.videosCompleted}/${response.data.totalVideos} videos done.`);
      }
      
      closeVideo();
    } catch (error) {
      console.error('Error skipping video:', error);
      alert('Error skipping video. Please try again.');
    }
  };

  const isVideoCompleted = (videoId) => {
    return trialStatus.videosCompleted >= videoId;
  };

  return (
    <div className="follow-section">
      {!showTrialVideos ? (
        // Initial trial offer section
        <div className="trial-offer-section">
          <div className="trial-offer-content">
            <h2>Try Us Free for Limited Access</h2>
            <p>Get access to 4 exclusive yoga videos and experience the power of our platform</p>
            
            <div className="trial-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🎬</span>
                <span>4 Exclusive Videos (10-20 minutes each)</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">⏱️</span>
                <span>14 Days Free Access</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span>Watch or Skip at Your Own Pace</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💳</span>
                <span>No Credit Card Required</span>
              </div>
            </div>

            {trialStatus.trialUsed && trialStatus.trialCompleted ? (
              <div className="trial-completed">
                <p>✅ You have completed your trial!</p>
              </div>
            ) : trialStatus.trialUsed && !trialStatus.trialCompleted ? (
              <div className="trial-active">
                <p>🎬 Your trial is active! {trialStatus.videosCompleted}/{trialStatus.totalVideos} videos completed.</p>
                <button 
                  className="continue-trial-btn"
                  onClick={() => setShowTrialVideos(true)}
                >
                  Continue Trial
                </button>
              </div>
            ) : (
              <button 
                className="start-trial-btn"
                onClick={handleStartTrial}
                disabled={loading}
              >
                {loading ? 'Starting...' : 'Start Free Trial'}
              </button>
            )}
          </div>
        </div>
      ) : (
        // Trial videos section
        <div className="trial-videos-section">
          <div className="trial-videos-header">
            <h2>🎬 Your Trial Videos</h2>
            <p>Complete all 4 videos to finish your trial</p>
            <div className="trial-progress">
              <span>Progress: {trialStatus.videosCompleted}/{trialStatus.totalVideos} videos</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(trialStatus.videosCompleted / trialStatus.totalVideos) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="trial-videos-grid">
            {trialVideos.map((video) => (
              <div key={video.id} className="trial-video-card">
                <div className="video-thumbnail" onClick={() => openVideo(video)}>
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-overlay">
                    <span className="play-icon">▶️</span>
                  </div>
                  {isVideoCompleted(video.id) && (
                    <div className="completed-badge">✓ Completed</div>
                  )}
                  <div className="video-duration">{video.duration}</div>
                </div>
                
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <div className="video-meta">
                    <span className="instructor">👤 {video.instructor}</span>
                    <span className="difficulty">📊 {video.difficulty}</span>
                    <span className="category">🏷️ {video.category}</span>
                  </div>
                  <button 
                    className="watch-btn"
                    onClick={() => openVideo(video)}
                    disabled={isVideoCompleted(video.id)}
                  >
                    {isVideoCompleted(video.id) ? 'Watch Again' : 'Watch Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <h3>{selectedVideo.title}</h3>
              <button className="video-modal-close" onClick={closeVideo}>×</button>
            </div>
            <div className="video-player-container">
              <iframe
                width="100%"
                height="400"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-footer">
              <div className="video-details">
                <p><strong>Instructor:</strong> {selectedVideo.instructor}</p>
                <p><strong>Duration:</strong> {selectedVideo.duration}</p>
                <p><strong>Difficulty:</strong> {selectedVideo.difficulty}</p>
                <p><strong>Category:</strong> {selectedVideo.category}</p>
              </div>
              <div className="video-actions">
                <button 
                  className="skip-btn"
                  onClick={() => skipVideo(selectedVideo.id)}
                >
                  Skip Video
                </button>
                <button 
                  className="complete-btn"
                  onClick={() => completeVideo(selectedVideo.id)}
                >
                  Complete Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default FollowSection;


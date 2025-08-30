import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

import './Dashboard.css';

// Import all necessary images for the classes section
import x1 from '../assets/yoga14.jpg';
import x2 from '../assets/yoga13.1.jpg';
import x3 from '../assets/yoga19.jpg';
import x4 from '../assets/x4.1.jpg';
import x5 from '../assets/yoga18.jpg';
import x6 from '../assets/yoga14.jpg';
import x7 from '../assets/yoga15.jpg';
import x8 from '../assets/y2.jpg';
import x9 from '../assets/yoga16.jpg';
import xp1 from '../assets/yoga17.jpg';
import xp2 from '../assets/yoga22.jpg';
import xp3 from '../assets/yoga23.jpg';
import xp4 from '../assets/yoga24.jpg';
import xp5 from '../assets/yoga10.jpg';
import xp6 from '../assets/yoga12.jpg';
import xp7 from '../assets/yoga13.jpg';
import xp8 from '../assets/y4.avif';
import xp9 from '../assets/yoga8.jpg';
import nature1 from '../assets/nature.jpg';
import nature2 from '../assets/nature.jpg';
import promoImage from '../assets/yoga21.jpg';

// Additional yoga images for more variety
import y1 from '../assets/y1.jpg';
import y2 from '../assets/y2.jpg';
import y3 from '../assets/y3.jpg';
import y4 from '../assets/y4.avif';
import y5 from '../assets/y5.jpg';
import y6 from '../assets/y6.jpg';
import y7 from '../assets/y7.avif';
import y8 from '../assets/y2.3.avif';
import y9 from '../assets/y9.avif';
import y10 from '../assets/y10.webp';
import y11 from '../assets/y11.webp';
import y12 from '../assets/y12.jpg';
import y13 from '../assets/y13.avif';
import y14 from '../assets/y14.avif';
import y15 from '../assets/y15.avif';
import y16 from '../assets/y3.3.jpg';
import y17 from '../assets/y2.1.avif';
import y18 from '../assets/y2.2.jpg';
import y19 from '../assets/y12.1.jpg';
import y20 from '../assets/y23.jpg';
import y23 from '../assets/y23.jpg';
import y24 from '../assets/y24.jpg';
import y25 from '../assets/y25.jpg';
import y26 from '../assets/y26.jpg';
import y27 from '../assets/y27.jpg';

// Create comprehensive image mappings
const classImages = {
  'Power Vinyasa Yoga': x6,
  'Restorative Yoga': x2,
  'Morning Yoga Flow': x3,
  'Ashtanga Flow': x4,
  'Hatha Yoga for Beginners': x5,
  'Yoga with Props': x6,
  'Vinyasa Yoga': x7,
  'Gentle Yoga': x8,
  'Sunset Flow': x9,
  // Add more mappings for different class titles
  'Yin Yoga': y1,
  'Power Yoga': y2,
  'Meditation': y3,
  'Pranayama': y4,
  'Core Yoga': y5,
  'Flexibility Flow': y6,
  'Strength Building': y7,
  'Relaxation': y8,
  'Balance Practice': y9,
  'Mindfulness': y10,
  'Breathing Exercise': y11,
  'Stretching': y12,
  'Deep Stretch': y13,
  'Morning Meditation': y14,
  'Evening Flow': y15,
  'Weekend Practice': y16,
  'Quick Flow': y17,
  'Full Body': y18,
  'Upper Body': y19,
  'Lower Body': y20,



  'Hip Opening': y23,
  'Shoulder Mobility': y24,
  'Spine Health': y25,
  'Joint Care': y26,
  'Recovery': y27,
};

// Program images mapping
const programImages = {
  '1-Month Yoga Challenge': xp1,
  '30-Day Flexibility Boost': xp2,
  'Mindful Meditation Series': xp3,
  'Core Strength Program': xp4,
  'Advanced Arm Balances': xp5,
  // Add more program mappings
  'Beginner Yoga Journey': y1,
  'Intermediate Flow': y2,
  'Advanced Practice': y3,
  'Meditation Mastery': y4,
  'Strength Building': y5,
  'Flexibility Focus': y6,
  'Mindfulness Training': y7,
  'Breathing Techniques': y8,
  'Balance & Stability': y9,
  'Recovery & Rest': y10,
  'Power Building': y11,
  'Gentle Healing': y12,
  'Dynamic Movement': y13,
  'Static Holds': y14,
  'Flow Sequences': y15,
  'Inversion Practice': y16,
  'Backbend Series': y17,
  'Forward Fold': y18,
  'Twist Practice': y19,
  'Hip Opening': y20,
  'Leg Strength': y23,
  'Arm Strength': y24,
  'Full Body Integration': y25,
  'Mind-Body Connection': y26,
  'Spiritual Practice': y27,
};

// Video images mapping
const videoImages = {
  'Introduction to Yoga': y1,
  'Basic Poses': y2,
  'Sun Salutation': y3,
  'Meditation Guide': y4,
  'Breathing Exercise': y5,
  'Stretching Routine': y6,
  'Core Workout': y7,
  'Relaxation': y8,
  'Balance Practice': y9,
  'Strength Training': y10,
  'Flexibility': y11,
  'Mindfulness': y12,
  'Deep Stretch': y13,
  'Morning Flow': y14,
  'Evening Practice': y15,
  'Weekend Session': y16,
  'Quick Workout': y17,
  'Full Body': y18,
  'Upper Body': y19,
  'Lower Body': y20,

  'Hip Opening': y23,
  'Shoulder Mobility': y24,
  'Spine Health': y25,
  'Joint Care': y26,
  'Recovery Session': y27,
};

// Function to get image for any content type
const getAssetImage = (content, contentType = 'class') => {
  const title = content.title || content.name || '';
  
  // Try to find exact match first
  if (contentType === 'class' && classImages[title]) {
    return classImages[title];
  }
  if (contentType === 'program' && programImages[title]) {
    return programImages[title];
  }
  if (contentType === 'video' && videoImages[title]) {
    return videoImages[title];
  }
  
  // If no exact match, use a hash-based approach to consistently assign images
  const hash = title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const allImages = [x1, x2, x3, x4, x5, x6, x7, x8, x9, xp1, xp2, xp3, xp4, xp5, 
                     y1, y2, y3, y4, y5, y6, y7, y8, y9, y10, y11, y12, y13, y14, 
                     y15, y16, y17, y18, y19, y20,y23, y24, y25, y26, y27];
  
  return allImages[Math.abs(hash) % allImages.length];
};

const programData = [
  { src: xp1, title: '1-Month Yoga Challenge', description: 'Deepen your practice.' },
  { src: xp2, title: '30-Day Flexibility Boost', description: 'Improve your range of motion.' },
  { src: xp3, title: 'Mindful Meditation Series', description: 'Find inner peace.' },
  { src: xp4, title: 'Core Strength Program', description: 'Build a strong core.' },
  { src: xp5, title: 'Advanced Arm Balances', description: 'Master new poses.' },
];
const playlistData = [
  { 
    src: xp6, 
    title: 'Relaxing Melodies',
    videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1',
    description: 'Peaceful yoga music for relaxation and meditation'
  },
  { 
    src: xp7, 
    title: 'High-Energy Beats',
    videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1',
    description: 'Energetic beats for power yoga and dynamic flows'
  },
  { 
    src: xp8, 
    title: 'Instrumental Focus',
    videoUrl: 'https://www.youtube.com/embed/lTRiuFIWV54?autoplay=1',
    description: 'Instrumental music for focused practice sessions'
  },
  { 
    src: xp9, 
    title: 'Nature Sounds',
    videoUrl: 'https://www.youtube.com/embed/q76bMs-NwRk?autoplay=1',
    description: 'Natural ambient sounds for grounding and mindfulness'
  },
];

// --- MOCK DATA FOR USER PROGRESS --
const mockBookings = [
  {
    _id: "book1",
    status: "confirmed",
    date: "2023-11-20T10:00:00Z",
    time: "10:00 AM",
    class: {
      name: "Sunrise Flow Yoga",
      image: "https://placehold.co/60x60/8B5CF6/FFFFFF?text=Yoga",
      instructor: { name: "Jane Doe" },
    },
  },
  {
    _id: "book2",
    status: "pending",
    date: "2023-11-22T15:00:00Z",
    time: "03:00 PM",
    class: {
      name: "Power Vinyasa",
      image: "https://placehold.co/60x60/F97316/FFFFFF?text=Power",
      instructor: { name: "John Smith" },
    },
  },
];

const mockProgressData = [
  { name: "Week 1", classes: 3 },
  { name: "Week 2", classes: 5 },
  { name: "Week 3", classes: 4 },
  { name: "Week 4", classes: 7 },
];

const mockClassHistory = [
  {
    class: { name: "Gentle Hatha" },
    date: "2023-11-15T09:00:00Z",
    rating: 5,
  },
  {
    class: { name: "Evening Meditation" },
    date: "2023-11-13T19:00:00Z",
    rating: 4,
  },
];

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('progress');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allClasses, setAllClasses] = useState([]); 
  const [allPrograms, setAllPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);  
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [favoriteClasses, setFavoriteClasses] = useState([]);
  const [completedClasses, setCompletedClasses] = useState([]);
  const [completedPrograms, setCompletedPrograms] = useState([]);
  const [watchedClasses, setWatchedClasses] = useState([]); // New state for watched classes
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showProgramVideos, setShowProgramVideos] = useState(false);
  const [trialProgress, setTrialProgress] = useState({
    used: false,
    videosCompleted: 0,
    totalVideos: 4,
    completed: false
  });

  // Fetch user progress from backend
  const fetchUserProgress = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      console.log('🔄 Fetching user progress for user ID:', user.id);
      const response = await axios.get(`http://localhost:5001/api/user/progress/${user.id}`);
      const progress = response.data;
      
      console.log('📥 Fetched user progress:', progress);
      
      // Set completed classes
      if (progress.completedClasses && Array.isArray(progress.completedClasses)) {
        console.log('✅ Setting completed classes:', progress.completedClasses);
        setCompletedClasses(progress.completedClasses);
      }
      
      // Set completed programs
      if (progress.completedPrograms && Array.isArray(progress.completedPrograms)) {
        console.log('✅ Setting completed programs:', progress.completedPrograms);
        setCompletedPrograms(progress.completedPrograms);
      }
      
      // Set favorite classes
      if (progress.favoriteClasses && Array.isArray(progress.favoriteClasses)) {
        console.log('✅ Setting favorite classes:', progress.favoriteClasses);
        setFavoriteClasses(progress.favoriteClasses);
      }

      // Set watched classes
      if (progress.watchedClasses && Array.isArray(progress.watchedClasses)) {
        console.log('✅ Setting watched classes:', progress.watchedClasses);
        setWatchedClasses(progress.watchedClasses);
      }
      
      // Set trial progress
      if (progress.trialProgress) {
        console.log('✅ Setting trial progress:', progress.trialProgress);
        setTrialProgress(progress.trialProgress);
      }
    } catch (error) {
      console.error('❌ Error fetching user progress:', error);
    }
  }, [user?.id]);

  // Save user progress to backend
  const saveUserProgress = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const progressData = {
        completedClasses: completedClasses.map(cls => cls._id || cls),
        completedPrograms: completedPrograms.map(prog => prog._id || prog),
        favoriteClasses: favoriteClasses.map(cls => cls._id || cls),
        watchedClasses: watchedClasses.map(cls => cls._id || cls),
        trialProgress: trialProgress
      };
      
      console.log('💾 Saving user progress:', progressData);
      await axios.post(`http://localhost:5001/api/user/progress/${user.id}`, progressData);
      console.log('✅ Progress saved successfully');
    } catch (error) {
      console.error('❌ Error saving user progress:', error);
    }
  }, [user?.id, completedClasses, completedPrograms, favoriteClasses, watchedClasses, trialProgress]);

  // Fetch trial status from backend
  const fetchTrialStatus = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.get(`http://localhost:5001/api/user/trial-status/${user.id}`);
      setTrialProgress({
        used: response.data.trialUsed,
        videosCompleted: response.data.videosCompleted,
        totalVideos: response.data.totalVideos,
        completed: response.data.trialCompleted
      });
    } catch (error) {
      console.error('Error fetching trial status:', error);
    }
  }, [user?.id]);

  // Calculate overall progress percentage based on completed classes, programs and trial
  const calculateOverallProgress = useCallback(() => {
    const totalClasses = allClasses.length;
    const totalPrograms = allPrograms.length;
    const completedClassesCount = completedClasses.length;
    const completedProgramsCount = completedPrograms.length;
    const trialProgressCount = trialProgress.videosCompleted;
    
    // Calculate progress percentage
    const classProgress = totalClasses > 0 ? (completedClassesCount / totalClasses) * 50 : 0; // 50% weight for classes
    const programProgress = totalPrograms > 0 ? (completedProgramsCount / totalPrograms) * 30 : 0; // 30% weight for programs
    const trialProgressPercent = (trialProgressCount / 4) * 20; // 20% weight for trial (4 videos max)
    
    const overallProgress = Math.min(100, classProgress + programProgress + trialProgressPercent);
    
    return Math.round(overallProgress);
  }, [allClasses.length, allPrograms.length, completedClasses.length, completedPrograms.length, trialProgress.videosCompleted]);

  // Start trial function
  const startTrial = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.post(`http://localhost:5001/api/user/start-trial/${user.id}`);
      setTrialProgress({
        used: true,
        videosCompleted: 0,
        totalVideos: 4,
        completed: false
      });
      
      // Save trial progress to backend
      await saveUserProgress();
      
      alert('🎉 Trial started successfully! You can now access 4 trial videos.');
    } catch (error) {
      console.error('Error starting trial:', error);
      alert('Error starting trial. Please try again.');
    }
  };

  // Complete trial video function
  const completeTrialVideo = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.post(`http://localhost:5001/api/user/complete-video/${user.id}`);
      setTrialProgress(prev => ({
        ...prev,
        videosCompleted: response.data.videosCompleted,
        completed: response.data.trialCompleted
      }));
      
      // Save trial progress to backend
      await saveUserProgress();
      
      if (response.data.trialCompleted) {
        alert('🎉 Trial completed!');
      } else {
        alert(`✅ Video completed! ${response.data.videosCompleted}/${response.data.totalVideos} videos done.`);
      }
    } catch (error) {
      console.error('Error completing video:', error);
      alert('Error completing video. Please try again.');
    }
  };
  
  const [dashboardData, setDashboardData] = useState({
    bookings: mockBookings,
    classHistory: mockClassHistory,
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/classes");
        setAllClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch programs from backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin/programs");
        setAllPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  // Fetch user progress and trial status when user is available
  useEffect(() => {
    if (user?.id) {
      fetchUserProgress();
      fetchTrialStatus();
    }
  }, [user?.id, fetchUserProgress, fetchTrialStatus]);

  // Save progress whenever it changes (but not on initial load)
  useEffect(() => {
    if (user?.id && (completedClasses.length > 0 || completedPrograms.length > 0 || favoriteClasses.length > 0 || watchedClasses.length > 0 || trialProgress.used)) {
      // Save progress whenever any progress data changes
      saveUserProgress();
    }
  }, [completedClasses, completedPrograms, favoriteClasses, watchedClasses, trialProgress]); // Removed saveUserProgress from dependencies

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setShowModal(true);
  };

  const openPlaylistModal = (playlist) => {
    setSelectedVideo(playlist.videoUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setShowModal(false);
  };

  // Function to handle program selection
  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setShowProgramVideos(true);
  };

  // Function to close program videos section
  const closeProgramVideos = () => {
    setSelectedProgram(null);
    setShowProgramVideos(false);
  };

  // Function to mark a class as watched
  const markAsWatched = async (classId) => {
    try {
      // Find the class in allClasses
      const classToWatch = allClasses.find(cls => cls._id === classId);
      if (!classToWatch) return;

      // Add to watched classes if not already watched
      if (!watchedClasses.some(watched => watched._id === classId)) {
        setWatchedClasses(prev => [...prev, classToWatch]);
        
        // Save to backend
        await saveUserProgress();
        
        alert('Class marked as watched! 👀');
      } else {
        alert('Class already watched! ✅');
      }
    } catch (error) {
      console.error('Error marking class as watched:', error);
      alert('Error marking class as watched. Please try again.');
    }
  };

  // Function to mark a class as completed
  const markAsCompleted = async (classId) => {
    try {
      // Find the class in allClasses
      const classToComplete = allClasses.find(cls => cls._id === classId);
      if (!classToComplete) return;

      // Add to completed classes if not already completed
      if (!completedClasses.some(comp => comp._id === classId)) {
        setCompletedClasses(prev => [...prev, classToComplete]);
        
        // Save to backend
        await saveUserProgress();
        
        alert('Class marked as completed! 🎉');
      } else {
        alert('Class already completed! ✅');
      }
    } catch (error) {
      console.error('Error marking class as completed:', error);
      alert('Error marking class as completed. Please try again.');
    }
  };

  // Function to mark a program as completed
  const markProgramAsCompleted = async (programId) => {
    try {
      // Find the program in allPrograms
      const programToComplete = allPrograms.find(prog => prog._id === programId);
      if (!programToComplete) return;

      // Add to completed programs if not already completed
      if (!completedPrograms.some(comp => comp._id === programId)) {
        setCompletedPrograms(prev => [...prev, programToComplete]);
        
        // Save to backend
        await saveUserProgress();
        
        alert('Program marked as completed! 🎉');
      } else {
        alert('Program already completed! ✅');
      }
    } catch (error) {
      console.error('Error marking program as completed:', error);
      alert('Error marking program as completed. Please try again.');
    }
  };

  // Function to check if a class is in favorites
  const isClassFavorite = (classId) => {
    const isFavorite = favoriteClasses.some(fav => fav._id === classId || fav === classId);
    console.log(`🔍 Checking if class ${classId} is favorite:`, isFavorite, 'favoriteClasses:', favoriteClasses);
    return isFavorite;
  };

  // Function to check if a class is completed
  const isClassCompleted = (classId) => {
    const isCompleted = completedClasses.some(comp => comp._id === classId || comp === classId);
    console.log(`🔍 Checking if class ${classId} is completed:`, isCompleted, 'completedClasses:', completedClasses);
    return isCompleted;
  };

  // Function to check if a class is watched
  const isClassWatched = (classId) => {
    const isWatched = watchedClasses.some(watched => watched._id === classId || watched === classId);
    console.log(`🔍 Checking if class ${classId} is watched:`, isWatched, 'watchedClasses:', watchedClasses);
    return isWatched;
  };

  // Function to check if a program is completed
  const isProgramCompleted = (programId) => {
    const isCompleted = completedPrograms.some(comp => comp._id === programId || comp === programId);
    console.log(`🔍 Checking if program ${programId} is completed:`, isCompleted, 'completedPrograms:', completedPrograms);
    return isCompleted;
  };

  // Function to toggle favorite status
  const toggleFavorite = async (classId) => {
    try {
      // Find the class in allClasses
      const classToToggle = allClasses.find(cls => cls._id === classId);
      if (!classToToggle) return;

      // Check if class is already in favorites
      const isAlreadyFavorite = isClassFavorite(classId);
      
      if (isAlreadyFavorite) {
        // Remove from favorites
        setFavoriteClasses(prev => prev.filter(fav => fav._id !== classId));
        alert('Removed from favorites! 💔');
      } else {
        // Add to favorites
        setFavoriteClasses(prev => [...prev, classToToggle]);
        alert('Added to favorites! ❤️');
      }
      
      // Save to backend
      await saveUserProgress();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Error updating favorite status. Please try again.');
    }
  };

  // ✅ Removed token/JWT, just a normal request
  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/user/dashboard`);
      setDashboardData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchDashboardData();
    }
  }, [isLoggedIn, navigate, fetchDashboardData]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        <h1 className="dashboard-title">Welcome back, {user?.name || 'User'}</h1>
        <p className="dashboard-subtitle">Manage your classes and track your progress here.</p>

        <div className="tab-container">
          <button className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>
            My Progress
          </button>
          <button className={`tab-button ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
            All Classes
          </button>
          <button className={`tab-button ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => setActiveTab('programs')}>
            Programs
          </button>
          <button className={`tab-button ${activeTab === 'playlist' ? 'active' : ''}`} onClick={() => setActiveTab('playlist')}>
            Playlists
          </button>
          <button className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`} onClick={() => setActiveTab('favorites')}>
            Favorites
          </button>
        </div>

        <div className="tab-content">
          {/* --- Progress Tab --- */}
          {activeTab === 'progress' && (
            <div className="progress-content">
              {/* Trial Progress Section */}
              <div className="card">
                <h2 className="card-header">🎬 Trial Progress</h2>
                <div className="trial-progress">
                  {!trialProgress.used ? (
                    <div className="trial-start">
                      <p>Start your 4-day free trial to access exclusive content!</p>
                      <button 
                        className="start-trial-btn"
                        onClick={startTrial}
                      >
                        Start Free Trial
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="progress-bar-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${(trialProgress.videosCompleted / trialProgress.totalVideos) * 100}%` }}
                          ></div>
                        </div>
                        <p className="progress-text">
                          {trialProgress.videosCompleted} of {trialProgress.totalVideos} trial videos completed
                        </p>
                      </div>
                      {trialProgress.completed && (
                        <div className="trial-completed">
                          <p>🎉 Trial completed!</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="card">
                <h2 className="card-header">Overall Progress</h2>
                <div className="overall-progress">
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${calculateOverallProgress()}%` }}
                      ></div>
                    </div>
                    <p className="progress-text">
                      {calculateOverallProgress()}% Complete
                    </p>
                  </div>
                  <div className="progress-breakdown">
                    <div className="breakdown-item">
                      <span className="breakdown-label">Classes Completed:</span>
                      <span className="breakdown-value">{completedClasses.length} / {allClasses.length}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Programs Completed:</span>
                      <span className="breakdown-value">{completedPrograms.length} / {allPrograms.length}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Classes Watched:</span>
                      <span className="breakdown-value">{watchedClasses.length} / {allClasses.length}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Trial Videos:</span>
                      <span className="breakdown-value">{trialProgress.videosCompleted} / 4</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Completed Classes */}
              <div className="card">
                <h2 className="card-header">✅ Completed Classes</h2>
                {completedClasses.length > 0 ? (
                  <div className="completed-classes-grid">
                    {completedClasses.map((cls, index) => (
                                        <div key={index} className="completed-class-item">
                    <img 
                      src={getAssetImage(cls, 'class')} 
                      alt={cls.title}
                      className="completed-class-image"
                    />
                        <div className="completed-class-info">
                          <h4>{cls.title}</h4>
                          <p>👤 {cls.instructor}</p>
                          <p>📊 {cls.difficulty}</p>
                          <span className="completion-badge">✅ Completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-completed">
                    <p>No classes completed yet.</p>
                    <p>Start your yoga journey by completing your first class!</p>
                  </div>
                )}
              </div>

              {/* Completed Programs */}
              <div className="card">
                <h2 className="card-header">📚 Completed Programs</h2>
                {completedPrograms.length > 0 ? (
                  <div className="completed-classes-grid">
                    {completedPrograms.map((prog, index) => (
                                        <div key={index} className="completed-class-item">
                    <img 
                      src={getAssetImage(prog, 'program')} 
                      alt={prog.title}
                      className="completed-class-image"
                    />
                        <div className="completed-class-info">
                          <h4>{prog.title}</h4>
                          <p>📅 {prog.duration} days</p>
                          <p>📊 {prog.difficulty}</p>
                          <span className="completion-badge">✅ Completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-completed">
                    <p>No programs completed yet.</p>
                    <p>Complete your first program to see it here!</p>
                  </div>
                )}
              </div>


            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="class-gallery">
              {allClasses.length > 0 ? (
                allClasses.map((cls, index) => (
                  <div key={index} className="class-item">
                    <div className="class-image-container">
                      <img
                        src={getAssetImage(cls, 'class')}
                        alt={cls.title}
                        className="class-image"
                        onError={(e) => {
                          e.target.src = getAssetImage(cls, 'class');
                        }}
                      />
                      <div className="class-overlay-hover">
                        <button 
                          className="play-btn"
                          onClick={() => openModal(cls.videoUrl)}
                        >
                          ▶️
                        </button>
                      </div>
                    </div>
                    <div className="class-content">
                      <h3 className="class-title">{cls.title}</h3>
                      <div className="class-meta">
                        <span className="class-instructor">👤 {cls.instructor}</span>
                        <span className="class-difficulty">📊 {cls.difficulty}</span>
                        {cls.duration && <span className="class-duration">⏱️ {cls.duration} min</span>}
                      </div>
                      <div className="class-actions">
                        <button 
                          className="watch-btn"
                          onClick={() => openModal(cls.videoUrl)}
                        >
                          Watch
                        </button>
                        <button 
                          className="complete-btn"
                          onClick={() => markAsCompleted(cls._id)}
                          style={{ 
                            backgroundColor: isClassCompleted(cls._id) ? '#10b981' : 'white',
                            color: isClassCompleted(cls._id) ? 'white' : '#10b981'
                          }}
                        >
                          {isClassCompleted(cls._id) ? '✅ Completed' : 'Complete'}
                        </button>
                        <button 
                          className="favorite-btn"
                          onClick={() => toggleFavorite(cls._id)}
                          style={{ 
                            backgroundColor: isClassFavorite(cls._id) ? '#ef4444' : 'white',
                            color: isClassFavorite(cls._id) ? 'white' : '#ef4444'
                          }}
                        >
                          ❤️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-classes">
                  <p>No classes available yet.</p>
                  <p>Check back soon for new yoga classes!</p>
                </div>
              )}
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div className="modal-backdrop" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeModal}>X</button>
                {selectedVideo ? (
                  <>
                    <div className="modal-header">
                      <h3 className="modal-title">🎵 Yoga Music Playlist</h3>
                      <p className="modal-subtitle">Relax and focus with these curated yoga music tracks</p>
                    </div>
                    <iframe
                      width="100%"
                      height="400px"
                      src={selectedVideo}
                      title="Yoga Music"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </>
                ) : (
                  <p>No video available</p>
                )}
              </div>
            </div>
          )}

          {/* --- Programs Tab --- */}
          {activeTab === 'programs' && (
            <div className="programs-container">
              <div className="program-gallery">
                {allPrograms.length > 0 ? (
                  allPrograms.map((program, index) => (
                    <div key={index} className="program-item" onClick={() => handleProgramClick(program)}>
                      <img 
                        src={getAssetImage(program, 'program')} 
                        alt={program.title} 
                        className="program-image"
                        onError={(e) => {
                          e.target.src = getAssetImage(program, 'program');
                        }}
                      />
                      <div className="program-overlay">
                        <h3 className="program-title">{program.title}</h3>
                        <p className="program-description">{program.description}</p>
                        <div className="program-meta">
                          <span className="program-duration">📅 {program.duration} days</span>
                          <span className="program-difficulty">📊 {program.difficulty}</span>
                          {program.instructor && <span className="program-instructor">👤 {program.instructor}</span>}
                        </div>
                        <div className="program-actions">
                          <button 
                            className="complete-program-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              markProgramAsCompleted(program._id);
                            }}
                            style={{ 
                              backgroundColor: isProgramCompleted(program._id) ? '#10b981' : 'white',
                              color: isProgramCompleted(program._id) ? 'white' : '#10b981'
                            }}
                          >
                            {isProgramCompleted(program._id) ? '✅ Completed' : 'Complete Program'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-programs">
                    <p>No programs available yet.</p>
                    <p>Check back soon for new yoga programs!</p>
                  </div>
                )}
              </div>

              {/* Program Videos Section */}
              {showProgramVideos && selectedProgram && (
                <div className="program-videos-section">
                  <div className="program-videos-header">
                    <h2>📚 {selectedProgram.title} - Videos</h2>
                    <button className="close-program-btn" onClick={closeProgramVideos}>
                      ✕ Close
                    </button>
                  </div>
                  <p className="program-description-text">{selectedProgram.description}</p>
                  
                  {selectedProgram.videos && selectedProgram.videos.length > 0 ? (
                    <div className="program-videos-grid">
                      {selectedProgram.videos.map((video, index) => (
                        <div key={index} className="program-video-item">
                          <div className="video-image-container">
                            <img 
                              src={getAssetImage(video, 'video')} 
                              alt={video.title}
                              className="video-image"
                              onError={(e) => {
                                e.target.src = getAssetImage(video, 'video');
                              }}
                            />
                            <div className="video-overlay">
                              <button 
                                className="play-video-btn"
                                onClick={() => openModal(video.url)}
                              >
                                ▶️
                              </button>
                            </div>
                          </div>
                          <div className="video-content">
                            <h4 className="video-title">{video.title}</h4>
                            <p className="video-description">{video.description}</p>
                            <div className="video-meta">
                              <span className="video-duration">⏱️ {video.duration} min</span>
                              <span className="video-difficulty">📊 {video.difficulty}</span>
                              {video.instructor && <span className="video-instructor">👤 {video.instructor}</span>}
                            </div>
                            <div className="video-actions">
                              <button 
                                className="watch-video-btn"
                                onClick={() => openModal(video.url)}
                              >
                                Watch
                              </button>
                              <button className="complete-video-btn">
                                Complete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-videos">
                      <p>No videos available for this program yet.</p>
                      <p>Videos will be added by the admin soon!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* --- Playlist Tab --- */}
          {activeTab === 'playlist' && (
            <div className="playlist-gallery">
              {playlistData.map((item, index) => (
                <div key={index} className="playlist-item">
                  <img src={item.src} alt={item.title} className="playlist-image" />
                  <h3 className="playlist-title">{item.title}</h3>
                  <p className="playlist-description">{item.description}</p>
                  <button 
                    className="playlist-button"
                    onClick={() => openPlaylistModal(item)}
                  >
                    🎵 Listen Now
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* --- Favorites Tab --- */}
          {activeTab === 'favorites' && (
            <div className="class-gallery">
              {favoriteClasses.length > 0 ? (
                favoriteClasses.map((cls, index) => (
                  <div key={index} className="class-item">
                    <div className="class-image-container">
                      <img
                        src={getAssetImage(cls, 'class')}
                        alt={cls.title}
                        className="class-image"
                        onError={(e) => {
                          e.target.src = getAssetImage(cls, 'class');
                        }}
                      />
                      <div className="class-overlay-hover">
                        <button 
                          className="play-btn"
                          onClick={() => openModal(cls.videoUrl)}
                        >
                          ▶️
                        </button>
                      </div>
                    </div>
                    <div className="class-content">
                      <h3 className="class-title">{cls.title}</h3>
                      <div className="class-meta">
                        <span className="class-instructor">👤 {cls.instructor}</span>
                        <span className="class-difficulty">📊 {cls.difficulty}</span>
                        {cls.duration && <span className="class-duration">⏱️ {cls.duration} min</span>}
                      </div>
                      <div className="class-actions">
                        <button 
                          className="watch-btn"
                          onClick={() => openModal(cls.videoUrl)}
                        >
                          Watch
                        </button>
                        <button 
                          className="complete-btn"
                          onClick={() => markAsCompleted(cls._id)}
                          style={{ 
                            backgroundColor: isClassCompleted(cls._id) ? '#10b981' : 'white',
                            color: isClassCompleted(cls._id) ? 'white' : '#10b981'
                          }}
                        >
                          {isClassCompleted(cls._id) ? '✅ Completed' : 'Complete'}
                        </button>
                        <button 
                          className="favorite-btn"
                          onClick={() => toggleFavorite(cls._id)}
                          style={{ backgroundColor: '#ef4444', color: 'white' }}
                        >
                          ❤️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-classes">
                  <p>No favorite classes yet.</p>
                  <p>Add classes to your favorites to see them here!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

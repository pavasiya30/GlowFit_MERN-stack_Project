import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaVideo, 
  FaCreditCard, 
  FaChartLine,
  FaPlus,
  FaTrash,
  FaEye,
  FaDownload,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

// Import yoga images for asset-based display
import x1 from '../../assets/yoga14.jpg';
import x2 from '../../assets/yoga13.1.jpg';
import x3 from '../../assets/yoga19.jpg';
import x4 from '../../assets/x4.1.jpg';
import x5 from '../../assets/yoga18.jpg';
import x6 from '../../assets/yoga14.jpg';
import x7 from '../../assets/yoga15.jpg';
import x8 from '../../assets/y2.jpg';
import x9 from '../../assets/yoga16.jpg';
import xp1 from '../../assets/yoga17.jpg';
import xp2 from '../../assets/yoga22.jpg';
import xp3 from '../../assets/yoga23.jpg';
import xp4 from '../../assets/yoga24.jpg';
import xp5 from '../../assets/yoga10.jpg';
import y1 from '../../assets/y1.jpg';
import y2 from '../../assets/y2.jpg';
import y3 from '../../assets/y3.jpg';
import y4 from '../../assets/y4.avif';
import y5 from '../../assets/y5.jpg';
import y6 from '../../assets/y6.jpg';
import y7 from '../../assets/y7.avif';
import y8 from '../../assets/y2.3.avif';
import y9 from '../../assets/y9.avif';
import y10 from '../../assets/y10.webp';
import y11 from '../../assets/y11.webp';
import y12 from '../../assets/y12.jpg';
import y13 from '../../assets/y13.avif';
import y14 from '../../assets/y14.avif';
import y15 from '../../assets/y15.avif';
import y16 from '../../assets/y3.3.jpg';
import y17 from '../../assets/y2.1.avif';
import y18 from '../../assets/y2.2.jpg';
import y19 from '../../assets/y12.1.jpg';
import y20 from '../../assets/y23.jpg';

import y23 from '../../assets/y23.jpg';
import y24 from '../../assets/y24.jpg';
import y25 from '../../assets/y25.jpg';
import y26 from '../../assets/y26.jpg';
import y27 from '../../assets/y27.jpg';

// Create comprehensive image mappings
const classImages = {
  'Power Vinyasa Yoga': x1,
  'Restorative Yoga': x2,
  'Morning Yoga Flow': x3,
  'Ashtanga Flow': x4,
  'Hatha Yoga for Beginners': x5,
  'Yoga with Props': x6,
  'Vinyasa Yoga': x7,
  'Gentle Yoga': x8,
  'Sunset Flow': x9,
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

const programImages = {
  '1-Month Yoga Challenge': xp1,
  '30-Day Flexibility Boost': xp2,
  'Mindful Meditation Series': xp3,
  'Core Strength Program': xp4,
  'Advanced Arm Balances': xp5,
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
                     y15, y16, y17, y18, y19, y20,  y23, y24, y25, y26, y27];
  
  return allImages[Math.abs(hash) % allImages.length];
};

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Dashboard stats
    const [stats, setStats] = useState({
        totalUsers: 0,
        paidUsers: 0,
        expiredUsers: 0,
        totalClasses: 0,
    
        totalVideos: 0,
        totalPrograms: 0
    });

    // Form states
    const [classForm, setClassForm] = useState({
        _id: null,
        title: '',
        description: '',
        instructor: '',
        duration: 60,
        difficulty: 'beginner',
        videoUrl: '',
        thumbnail: '',
        schedule: [{ day: 'Monday', time: '09:00', capacity: 20 }]
    });

    const [contentForm, setContentForm] = useState({
        type: 'video',
        title: '',
        description: '',
        url: '',
        category: 'yoga',
        duration: '',
        difficulty: 'beginner',
        instructor: '',
        thumbnail: ''
    });

    const [videos, setVideos] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [activeContentTab, setActiveContentTab] = useState('videos');
    const [editingContent, setEditingContent] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [programVideos, setProgramVideos] = useState([]);
    const [showProgramVideos, setShowProgramVideos] = useState(false);

    // Fetch all admin data
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true);
                
                // Fetch all data in parallel
                    const [usersRes, classesRes, videosRes, programsRes] = await Promise.all([
      axios.get('http://localhost:5001/api/admin/users'),
      axios.get('http://localhost:5001/api/admin/classes'),
      axios.get('http://localhost:5001/api/admin/videos'),
      axios.get('http://localhost:5001/api/admin/programs')
    ]);

                const usersData = usersRes.data || [];
                const classesData = classesRes.data || [];
            
                const videosData = videosRes.data || [];
                const programsData = programsRes.data || [];

                setUsers(usersData);
                setClasses(classesData);
            
                setVideos(videosData);
                setPrograms(programsData);

                // Calculate stats
                const paidUsers = usersData.filter(u => u.subscription?.status === 'active').length;
                const expiredUsers = usersData.filter(u => u.subscription?.status === 'inactive').length;
            

                setStats({
                    totalUsers: usersData.length,
                    paidUsers,
                    expiredUsers,
                    totalClasses: classesData.length,
              
                    totalVideos: videosData.length,
                    totalPrograms: programsData.length,

                });

            } catch (err) {
                console.error('Error fetching admin data:', err);
                setError('Failed to fetch admin data.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    // Class management
    const handleClassSubmit = async (e) => {
        e.preventDefault();
        try {
            if (classForm._id) {
                // Update existing class
                const res = await axios.put(`http://localhost:5001/api/admin/classes/${classForm._id}`, classForm);
                setClasses(classes.map(c => c._id === classForm._id ? res.data : c));
                alert('Class updated successfully!');
            } else {
                // Create new class
                const res = await axios.post('http://localhost:5001/api/admin/classes', classForm);
                setClasses([...classes, res.data.class || res.data]);
                alert('Class added successfully!');
            }
            
            // Reset form
            setClassForm({
                _id: null,
                title: '',
                description: '',
                instructor: '',
                duration: 60,
                difficulty: 'beginner',
                videoUrl: '',
                thumbnail: '',
                schedule: [{ day: 'Monday', time: '09:00', capacity: 20 }]
            });
        } catch (err) {
            console.error('Error saving class:', err);
            alert('Error saving class.');
        }
    };

    const handleDeleteClass = async (id) => {
        if (!window.confirm('Are you sure you want to delete this class?')) return;
        try {
            await axios.delete(`http://localhost:5001/api/admin/classes/${id}`);
            setClasses(classes.filter(c => c._id !== id));
            alert('Class deleted successfully!');
        } catch (err) {
            console.error('Error deleting class:', err);
            alert('Error deleting class.');
        }
    };

    // Content management functions
    const handleContentSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                title: contentForm.title,
                description: contentForm.description,
                category: contentForm.category,
                duration: parseInt(contentForm.duration) || 0,
                difficulty: contentForm.difficulty,
                instructor: contentForm.instructor,
                thumbnail: contentForm.thumbnail
            };

            if (contentForm.type === 'video') {
                formData.url = contentForm.url;
                
                if (editingContent) {
                    // Update existing video
                    const res = await axios.put(`http://localhost:5001/api/admin/videos/${editingContent._id}`, formData);
                    setVideos(videos.map(v => v._id === editingContent._id ? res.data.video : v));
                    alert('Video updated successfully!');
                } else {
                    // Add new video
                    const res = await axios.post('http://localhost:5001/api/admin/videos', formData);
                    setVideos([res.data.video, ...videos]);
                    alert('Video added successfully!');
                }
            } else if (contentForm.type === 'program') {
                if (editingContent) {
                    // Update existing program
                    const res = await axios.put(`http://localhost:5001/api/admin/programs/${editingContent._id}`, formData);
                    setPrograms(programs.map(p => p._id === editingContent._id ? res.data.program : p));
                    alert('Program updated successfully!');
                } else {
                    // Add new program
                    const res = await axios.post('http://localhost:5001/api/admin/programs', formData);
                    setPrograms([res.data.program, ...programs]);
                    alert('Program added successfully!');
                }
            }

            // Reset form
            setContentForm({
                type: 'video',
                title: '',
                description: '',
                url: '',
                category: 'yoga',
                duration: '',
                difficulty: 'beginner',
                instructor: '',
                thumbnail: ''
            });
            setEditingContent(null);
        } catch (err) {
            console.error('Error saving content:', err);
            alert('Error saving content. Please try again.');
        }
    };

    const handleEditContent = (content, type) => {
        setEditingContent(content);
        setContentForm({
            type: type,
            title: content.title,
            description: content.description || '',
            url: content.url || '',
            category: content.category,
            duration: content.duration || '',
            difficulty: content.difficulty,
            instructor: content.instructor || '',
            thumbnail: content.thumbnail || ''
        });
    };

    const handleDeleteContent = async (id, type, title) => {
        if (!window.confirm(`Are you sure you want to delete this ${type} "${title}"?`)) return;
        
        try {
            if (type === 'video') {
                await axios.delete(`http://localhost:5001/api/admin/videos/${id}`);
                setVideos(videos.filter(v => v._id !== id));
            } else if (type === 'program') {
                await axios.delete(`http://localhost:5001/api/admin/programs/${id}`);
                setPrograms(programs.filter(p => p._id !== id));
            }
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
        } catch (err) {
            console.error('Error deleting content:', err);
            alert('Error deleting content. Please try again.');
        }
    };

    const resetContentForm = () => {
        setContentForm({
            type: 'video',
            title: '',
            description: '',
            url: '',
            category: 'yoga',
            duration: '',
            difficulty: 'beginner',
            instructor: '',
            thumbnail: ''
        });
        setEditingContent(null);
    };

    // Program video management functions
    const handleAddVideoToProgram = async (programId, videoId) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/admin/programs/${programId}/add-video`, 
                { videoId }
            );
            
            // Update the programs list with the new video
            setPrograms(programs.map(p => 
                p._id === programId ? response.data.program : p
            ));
            
            alert('Video added to program successfully!');
        } catch (err) {
            console.error('Error adding video to program:', err);
            alert('Error adding video to program. Please try again.');
        }
    };

    const handleRemoveVideoFromProgram = async (programId, videoId) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/admin/programs/${programId}/remove-video`, 
                { videoId }
            );
            
            // Update the programs list
            setPrograms(programs.map(p => 
                p._id === programId ? response.data.program : p
            ));
            
            alert('Video removed from program successfully!');
        } catch (err) {
            console.error('Error removing video from program:', err);
            alert('Error removing video from program. Please try again.');
        }
    };

    const handleManageProgramVideos = (program) => {
        setSelectedProgram(program);
        setProgramVideos(program.videos || []);
        setShowProgramVideos(true);
    };

    // User management
    const handleDeleteUser = async (userId, userName) => {
        const confirmed = window.confirm(
            `WARNING: Delete User\n\n` +
            `Are you sure you want to delete user "${userName}"?\n\n` +
            `This action will:\n` +
            `• Permanently remove the user account\n` +
            `• Delete all user data and subscriptions\n` +
            `• Cannot be undone\n\n` +
            `Click OK to proceed or Cancel to abort.`
        );
        
        if (!confirmed) {
            return;
        }
        
        try {
            await axios.delete(`http://localhost:5001/api/admin/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
            
            // Update stats after deletion
            const updatedStats = {
                totalUsers: stats.totalUsers - 1,
                paidUsers: users.filter(u => u.subscription?.status === 'active' && u._id !== userId).length,
                expiredUsers: users.filter(u => u.subscription?.status === 'inactive' && u._id !== userId).length,
                totalClasses: stats.totalClasses,
          
                totalVideos: stats.totalVideos,
                totalPrograms: stats.totalPrograms,
                
            };
            setStats(updatedStats);
            
            alert(` User "${userName}" has been successfully deleted!`);
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Error deleting user. Please try again.');
        }
    };

    const handleViewUser = (user) => {
        const userDetails = `
👤 USER DETAILS

📋 Basic Information:
• Name: ${user.name}
• Email: ${user.email}
• Contact: ${user.contact}
• Role: ${user.role}
• Joined: ${new Date(user.createdAt).toLocaleDateString()}

💳 Subscription Details:
• Plan: ${user.subscription?.plan || 'No Plan'}
• Status: ${user.subscription?.status || 'Inactive'}
• Start Date: ${user.subscription?.startDate ? new Date(user.subscription.startDate).toLocaleDateString() : 'N/A'}
• End Date: ${user.subscription?.endDate ? new Date(user.subscription.endDate).toLocaleDateString() : 'N/A'}

🆔 User ID: ${user._id}
        `;
        alert(userDetails);
    };

    // Filter and search functions
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || user.subscription?.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Loading admin dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-error">
                <h2> Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>🧘‍♀️ Admin Panel</h2>
                    <p>Welcome back, Admin!</p>
                </div>
                
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FaChartLine /> Dashboard Overview
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <FaUsers /> User Management
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'classes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('classes')}
                    >
                        <FaCalendarAlt /> Class Schedules
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'content' ? 'active' : ''}`}
                        onClick={() => setActiveTab('content')}
                    >
                        <FaVideo /> Content Management
                    </button>

                </nav>
            </div>

            {/* Main Content */}
            <div className="admin-main">
                <div className="main-header">
                    <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    <div className="header-actions">
                        <button className="export-btn">
                            <FaDownload /> Export Data
                        </button>
                    </div>
                </div>

                {/* Dashboard Overview */}
                {activeTab === 'overview' && (
                    <div className="overview-section">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon users">
                                    <FaUsers />
                                </div>
                                <div className="stat-content">
                                    <h3>{stats.totalUsers}</h3>
                                    <p>Total Users</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon paid">
                                    <FaUsers />
                                </div>
                                <div className="stat-content">
                                    <h3>{stats.paidUsers}</h3>
                                    <p>Paid Members</p>
                                </div>
                            </div>

                        </div>

                        <div className="quick-actions">
                            <h3>Quick Actions</h3>
                            <div className="action-buttons">
                                <button onClick={() => setActiveTab('users')}>
                                    <FaUsers /> Manage Users
                                </button>
                                <button onClick={() => setActiveTab('classes')}>
                                    <FaCalendarAlt /> Add Class
                                </button>
                                <button onClick={() => setActiveTab('content')}>
                                    <FaVideo /> Upload Content
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Management */}
                {activeTab === 'users' && (
                    <div className="users-section">
                        <div className="section-header">
                            <div className="search-filter">
                                <div className="search-box">
                                    <FaSearch />
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select 
                                    value={filterStatus} 
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Users</option>
                                    <option value="active">Paid Members</option>
                                    <option value="inactive">Expired</option>
                                </select>
                            </div>
                        </div>

                        <div className="users-table-container">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Subscription</th>
                                        <th>Status</th>
                                        <th>Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user._id}>
                                            <td>
                                                <div className="user-info">
                                                    <div className="user-avatar">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span>{user.name}</span>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.contact}</td>
                                            <td>
                                                <span className={`subscription-badge ${user.subscription?.plan || 'none'}`}>
                                                    {user.subscription?.plan || 'No Plan'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${user.subscription?.status || 'inactive'}`}>
                                                    {user.subscription?.status || 'Inactive'}
                                                </span>
                                            </td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button 
                                                        className="action-btn view" 
                                                        title="👁️ View User Details"
                                                        onClick={() => handleViewUser(user)}
                                                    >
                                                        👁️ View
                                                    </button>
                                                    <button 
                                                        className="action-btn delete" 
                                                        title="🗑️ Delete User Account"
                                                        onClick={() => handleDeleteUser(user._id, user.name)}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Class Management */}
                {activeTab === 'classes' && (
                    <div className="classes-section">
                        <div className="section-header">
                            <h3>Manage Yoga Classes</h3>
                            <button className="add-btn" onClick={() => setClassForm({...classForm, _id: null})}>
                                <FaPlus /> Add New Class
                            </button>
                        </div>

                        {/* Class Form */}
                        <div className="form-card">
                            <h4>{classForm._id ? 'Edit Class' : 'Add New Class'}</h4>
                            <form onSubmit={handleClassSubmit} className="class-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Class Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={classForm.title}
                                            onChange={(e) => setClassForm({...classForm, title: e.target.value})}
                                            placeholder="e.g., Power Vinyasa Yoga"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Instructor</label>
                                        <input
                                            type="text"
                                            name="instructor"
                                            value={classForm.instructor}
                                            onChange={(e) => setClassForm({...classForm, instructor: e.target.value})}
                                            placeholder="Instructor name"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Duration (minutes)</label>
                                        <input
                                            type="number"
                                            name="duration"
                                            value={classForm.duration}
                                            onChange={(e) => setClassForm({...classForm, duration: parseInt(e.target.value)})}
                                            min="15"
                                            max="180"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Difficulty Level</label>
                                        <select
                                            name="difficulty"
                                            value={classForm.difficulty}
                                            onChange={(e) => setClassForm({...classForm, difficulty: e.target.value})}
                                        >
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={classForm.description}
                                        onChange={(e) => setClassForm({...classForm, description: e.target.value})}
                                        placeholder="Class description..."
                                        rows="3"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Video URL</label>
                                        <input
                                            type="url"
                                            name="videoUrl"
                                            value={classForm.videoUrl}
                                            onChange={(e) => setClassForm({...classForm, videoUrl: e.target.value})}
                                            placeholder="https://youtube.com/embed/..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Thumbnail</label>
                                        <input
                                            type="text"
                                            name="thumbnail"
                                            value="Asset-based images will be automatically assigned"
                                            disabled
                                            placeholder="Images are automatically assigned from assets"
                                        />
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">
                                        {classForm._id ? 'Update Class' : 'Add Class'}
                                    </button>
                                    {classForm._id && (
                                        <button 
                                            type="button" 
                                            className="cancel-btn"
                                            onClick={() => setClassForm({
                                                _id: null,
                                                title: '',
                                                description: '',
                                                instructor: '',
                                                duration: 60,
                                                difficulty: 'beginner',
                                                videoUrl: '',
                                                thumbnail: '',
                                                schedule: [{ day: 'Monday', time: '09:00', capacity: 20 }]
                                            })}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Existing Classes */}
                        <div className="classes-grid">
                            <h4>Existing Classes ({classes.length})</h4>
                            {classes.map(cls => (
                                <div key={cls._id} className="class-card">
                                    {/* Class Thumbnail */}
                                    <div className="class-thumbnail">
                                        <img 
                                            src={getAssetImage(cls, 'class')} 
                                            alt={cls.title}
                                            onError={(e) => {
                                                e.target.src = getAssetImage(cls, 'class');
                                            }}
                                        />
                                        <div className="class-overlay">
                                            <span className="play-icon">▶️</span>
                                        </div>
                                    </div>
                                    
                                    <div className="class-header">
                                        <h5>{cls.title}</h5>
                                        <span className={`difficulty-badge ${cls.difficulty}`}>
                                            {cls.difficulty}
                                        </span>
                                    </div>
                                    <div className="class-details">
                                        <p><strong>Instructor:</strong> {cls.instructor}</p>
                                        <p><strong>Duration:</strong> {cls.duration} minutes</p>
                                        {cls.description && <p>{cls.description}</p>}
                                        {cls.videoUrl && (
                                            <p><strong>Video:</strong> 
                                                <a href={cls.videoUrl} target="_blank" rel="noopener noreferrer" className="video-link">
                                                    🎥 Watch Video
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                    <div className="class-actions">
                                        <button 
                                            className="edit-btn"
                                            onClick={() => setClassForm(cls)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDeleteClass(cls._id)}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content Management */}
                {activeTab === 'content' && (
                    <div className="content-section">
                        <div className="section-header">
                            <h3>Content Management</h3>
                            <p>Manage videos and programs for your users</p>
                        </div>

                        <div className="content-tabs">
                            <button 
                                className={`content-tab ${activeContentTab === 'videos' ? 'active' : ''}`}
                                onClick={() => setActiveContentTab('videos')}
                            >
                                📹 Videos ({videos.length})
                            </button>
                            <button 
                                className={`content-tab ${activeContentTab === 'programs' ? 'active' : ''}`}
                                onClick={() => setActiveContentTab('programs')}
                            >
                                📚 Programs ({programs.length})
                            </button>
                        </div>

                        {/* Content Form */}
                        <div className="form-card">
                            <h4>{editingContent ? `Edit ${contentForm.type.charAt(0).toUpperCase() + contentForm.type.slice(1)}` : `Add New ${contentForm.type.charAt(0).toUpperCase() + contentForm.type.slice(1)}`}</h4>
                            <form onSubmit={handleContentSubmit} className="content-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Content Type</label>
                                        <select
                                            value={contentForm.type}
                                            onChange={(e) => setContentForm({...contentForm, type: e.target.value})}
                                            disabled={editingContent}
                                        >
                                            <option value="video">Video</option>
                                            <option value="program">Program</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            value={contentForm.category}
                                            onChange={(e) => setContentForm({...contentForm, category: e.target.value})}
                                        >
                                            <option value="yoga">Yoga</option>
                                            <option value="meditation">Meditation</option>
                                            <option value="fitness">Fitness</option>
                                            <option value="wellness">Wellness</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            value={contentForm.title}
                                            onChange={(e) => setContentForm({...contentForm, title: e.target.value})}
                                            placeholder="Content title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Instructor</label>
                                        <input
                                            type="text"
                                            value={contentForm.instructor}
                                            onChange={(e) => setContentForm({...contentForm, instructor: e.target.value})}
                                            placeholder="Instructor name"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Duration ({contentForm.type === 'video' ? 'minutes' : 'days'})</label>
                                        <input
                                            type="number"
                                            value={contentForm.duration}
                                            onChange={(e) => setContentForm({...contentForm, duration: e.target.value})}
                                            placeholder={contentForm.type === 'video' ? '60' : '7'}
                                            min="1"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Difficulty</label>
                                        <select
                                            value={contentForm.difficulty}
                                            onChange={(e) => setContentForm({...contentForm, difficulty: e.target.value})}
                                        >
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                {contentForm.type === 'video' && (
                                    <div className="form-group">
                                        <label>Video URL</label>
                                        <input
                                            type="url"
                                            value={contentForm.url}
                                            onChange={(e) => setContentForm({...contentForm, url: e.target.value})}
                                            placeholder="https://youtube.com/embed/..."
                                            required
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Thumbnail</label>
                                    <input
                                        type="text"
                                        value="Asset-based images will be automatically assigned"
                                        disabled
                                        placeholder="Images are automatically assigned from assets"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={contentForm.description}
                                        onChange={(e) => setContentForm({...contentForm, description: e.target.value})}
                                        placeholder="Content description..."
                                        rows="3"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">
                                        {editingContent ? 'Update' : 'Add'} {contentForm.type.charAt(0).toUpperCase() + contentForm.type.slice(1)}
                                    </button>
                                    {editingContent && (
                                        <button 
                                            type="button" 
                                            className="cancel-btn"
                                            onClick={resetContentForm}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Videos List */}
                        {activeContentTab === 'videos' && (
                            <div className="content-list">
                                <h4>All Videos ({videos.length})</h4>
                                <div className="content-grid">
                                    {videos.map(video => (
                                        <div key={video._id} className="content-card">
                                            {/* Video Thumbnail */}
                                            <div className="video-thumbnail">
                                                <img 
                                                    src={getAssetImage(video, 'video')} 
                                                    alt={video.title}
                                                    onError={(e) => {
                                                        e.target.src = getAssetImage(video, 'video');
                                                    }}
                                                />
                                                <div className="video-overlay">
                                                    <span className="play-icon">▶️</span>
                                                </div>
                                            </div>
                                            
                                            <div className="content-header">
                                                <h5>{video.title}</h5>
                                                <span className={`difficulty-badge ${video.difficulty}`}>
                                                    {video.difficulty}
                                                </span>
                                            </div>
                                            <div className="content-details">
                                                <p><strong>Category:</strong> {video.category}</p>
                                                <p><strong>Duration:</strong> {video.duration} minutes</p>
                                                {video.instructor && <p><strong>Instructor:</strong> {video.instructor}</p>}
                                                {video.description && <p>{video.description}</p>}
                                                {video.views !== undefined && <p><strong>Views:</strong> {video.views}</p>}
                                            </div>
                                            <div className="content-actions">
                                                <button 
                                                    className="edit-btn"
                                                    onClick={() => handleEditContent(video, 'video')}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button 
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteContent(video._id, 'video', video.title)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Programs List */}
                        {activeContentTab === 'programs' && (
                            <div className="content-list">
                                <h4>All Programs ({programs.length})</h4>
                                <div className="content-grid">
                                    {programs.map(program => (
                                        <div key={program._id} className="content-card">
                                            {/* Program Thumbnail */}
                                            <div className="video-thumbnail">
                                                <img 
                                                    src={getAssetImage(program, 'program')} 
                                                    alt={program.title}
                                                    onError={(e) => {
                                                        e.target.src = getAssetImage(program, 'program');
                                                    }}
                                                />
                                                <div className="video-overlay">
                                                    <span className="play-icon">📚</span>
                                                </div>
                                            </div>
                                            
                                            <div className="content-header">
                                                <h5>{program.title}</h5>
                                                <span className={`difficulty-badge ${program.difficulty}`}>
                                                    {program.difficulty}
                                                </span>
                                            </div>
                                            <div className="content-details">
                                                <p><strong>Category:</strong> {program.category}</p>
                                                <p><strong>Duration:</strong> {program.duration} days</p>
                                                {program.instructor && <p><strong>Instructor:</strong> {program.instructor}</p>}
                                                {program.description && <p>{program.description}</p>}
                                                <p><strong>Videos:</strong> {program.videos?.length || 0} videos</p>
                                                <p><strong>Enrolled Users:</strong> {program.enrolledUsers?.length || 0} users</p>
                                            </div>
                                            <div className="content-actions">
                                                <button 
                                                    className="edit-btn"
                                                    onClick={() => handleEditContent(program, 'program')}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button 
                                                    className="manage-btn"
                                                    onClick={() => handleManageProgramVideos(program)}
                                                >
                                                    📹 Manage Videos
                                                </button>
                                                <button 
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteContent(program._id, 'program', program.title)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Program Videos Management Modal */}
                        {showProgramVideos && selectedProgram && (
                            <div className="program-videos-modal">
                                <div className="modal-overlay" onClick={() => setShowProgramVideos(false)}></div>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3>📹 Manage Videos for "{selectedProgram.title}"</h3>
                                        <button 
                                            className="close-btn"
                                            onClick={() => setShowProgramVideos(false)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    
                                    <div className="modal-body">
                                        <div className="program-info">
                                            <p><strong>Duration:</strong> {selectedProgram.duration} days</p>
                                            <p><strong>Current Videos:</strong> {selectedProgram.videos?.length || 0} videos</p>
                                        </div>

                                        <div className="videos-section">
                                            <h4>Available Videos</h4>
                                            <div className="videos-grid">
                                                {videos.map(video => {
                                                    const isInProgram = selectedProgram.videos?.some(v => v._id === video._id);
                                                    return (
                                                        <div key={video._id} className={`video-item ${isInProgram ? 'in-program' : ''}`}>
                                                            <div className="video-thumbnail-small">
                                                                <img 
                                                                    src={getAssetImage(video, 'video')} 
                                                                    alt={video.title}
                                                                    onError={(e) => {
                                                                        e.target.src = getAssetImage(video, 'video');
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="video-info">
                                                                <h5>{video.title}</h5>
                                                                <p>{video.duration} minutes • {video.difficulty}</p>
                                                                <p>{video.category}</p>
                                                            </div>
                                                            <div className="video-actions">
                                                                {isInProgram ? (
                                                                    <button 
                                                                        className="remove-btn"
                                                                        onClick={() => handleRemoveVideoFromProgram(selectedProgram._id, video._id)}
                                                                    >
                                                                        🗑️ Remove
                                                                    </button>
                                                                ) : (
                                                                    <button 
                                                                        className="add-btn"
                                                                        onClick={() => handleAddVideoToProgram(selectedProgram._id, video._id)}
                                                                    >
                                                                        ➕ Add
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="program-videos-section">
                                            <h4>Program Videos ({selectedProgram.videos?.length || 0})</h4>
                                            {selectedProgram.videos && selectedProgram.videos.length > 0 ? (
                                                <div className="program-videos-list">
                                                    {selectedProgram.videos.map((video, index) => (
                                                        <div key={video._id} className="program-video-item">
                                                            <div className="video-number">Day {index + 1}</div>
                                                            <div className="video-details">
                                                                <h5>{video.title}</h5>
                                                                <p>{video.duration} minutes • {video.difficulty}</p>
                                                            </div>
                                                            <button 
                                                                className="remove-btn"
                                                                onClick={() => handleRemoveVideoFromProgram(selectedProgram._id, video._id)}
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="no-videos">No videos added to this program yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}


            </div>
        </div>
    );
}

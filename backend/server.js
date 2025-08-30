


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/glowfit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  subscription: {
    plan: { type: String, enum: ["basic", "standard", "premium"] },
    status: { type: String, enum: ["active", "inactive", "trial", "expired"], default: "inactive" },
    startDate: Date,
    endDate: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String,
  },
  trial: {
    used: { type: Boolean, default: false },
    startDate: Date,
    endDate: Date,
    videosCompleted: { type: Number, default: 0 },
    totalVideos: { type: Number, default: 4 },
    completed: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// Class Schema
const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: String,
  duration: Number,
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"] },
  schedule: [
    {
      day: String,
      time: String,
      capacity: Number,
      enrolled: { type: Number, default: 0 },
    },
  ],
  videoUrl: String,
  thumbnail: String,
  createdAt: { type: Date, default: Date.now },
});
const Class = mongoose.model("Class", classSchema);





// Video Schema
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  category: { type: String, enum: ['yoga', 'meditation', 'fitness', 'wellness'], default: 'yoga' },
  duration: { type: Number }, // in minutes
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  instructor: { type: String },
  thumbnail: { type: String },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
const Video = mongoose.model('Video', videoSchema);

// Program Schema
const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['yoga', 'meditation', 'fitness', 'wellness'], default: 'yoga' },
  duration: { type: Number }, // in days
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  instructor: { type: String },
  thumbnail: { type: String },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});
const Program = mongoose.model('Program', programSchema);

// User Progress Schema - to persist user progress data
const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  completedPrograms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
  favoriteClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  trialProgress: {
    used: { type: Boolean, default: false },
    videosCompleted: { type: Number, default: 0 },
    totalVideos: { type: Number, default: 4 },
    completed: { type: Boolean, default: false }
  },
  lastUpdated: { type: Date, default: Date.now }
});
const UserProgress = mongoose.model('UserProgress', userProgressSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', reviewSchema);

// ======================= AUTH ROUTES =======================

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, contact, email, password, role } = req.body;

    if (!name || !contact || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const assignedRole = (name.toLowerCase() === 'admin' && role === 'admin') ? 'admin' : 'user';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      contact,
      email,
      password: hashedPassword,
      role: assignedRole,
      subscription: {
        status: assignedRole === 'admin' ? 'active' : 'inactive',
        startDate: assignedRole === 'admin' ? new Date() : null,
        endDate: assignedRole === 'admin' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : null,
      },
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Logout
app.post("/api/auth/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
});



// ======================= ADMIN CLASS ROUTES =======================

// Add class
app.post("/api/admin/classes", async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json({ message: "Class added successfully", class: savedClass });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: err.message });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update class
app.put("/api/admin/classes/:id", async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ message: "Class not found" });
    res.json(updatedClass);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete class
app.delete("/api/admin/classes/:id", async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all classes for admin
app.get("/api/admin/classes", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ======================= ADMIN USER ROUTES =======================
app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Test endpoint to verify admin access
app.get("/api/admin/test", async (req, res) => {
  try {
    res.json({ 
      message: "Admin access working", 
      adminEmail: req.headers["email"],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Simple test endpoint without auth to verify routing
app.get("/api/test", (req, res) => {
  res.json({ message: "Basic routing is working", timestamp: new Date().toISOString() });
});

// Test delete endpoint without auth
app.delete("/api/test-delete/:id", (req, res) => {
  console.log('Test delete endpoint hit with ID:', req.params.id);
  res.json({ message: "Test delete endpoint working", id: req.params.id });
});

// Delete user
app.delete("/api/admin/users/:id", async (req, res) => {
  try {
    console.log('=== DELETE USER REQUEST ===');
    console.log('User ID:', req.params.id);
    console.log('Admin Email:', req.headers["email"]);
    console.log('Headers:', req.headers);
    
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid ObjectId format:', id);
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    // Check if user exists
    const user = await User.findById(id);
    console.log('Found user:', user ? { id: user._id, name: user.name, email: user.email } : 'NOT FOUND');
    
    if (!user) {
      console.log('User not found in database');
      return res.status(404).json({ message: "User not found" });
    }
    
    // Prevent admin from deleting themselves
    const adminEmail = req.headers["email"];
    console.log('Comparing emails:', { userEmail: user.email, adminEmail });
    
    if (user.email === adminEmail) {
      console.log('Attempted to delete own account');
      return res.status(400).json({ message: "Cannot delete your own account" });
    }
    
    // Delete the user
    console.log('Attempting to delete user from database...');
    const deletedUser = await User.findByIdAndDelete(id);
    console.log('Delete result:', deletedUser ? 'SUCCESS' : 'FAILED');
    
    if (!deletedUser) {
      console.log('User not found during deletion');
      return res.status(404).json({ message: "User not found or already deleted" });
    }
    
    console.log(`✅ User deleted successfully: ${user.name} (${user.email})`);
    res.json({ 
      message: "User deleted successfully",
      deletedUser: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ Delete user error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// GET all classes (for users)
app.get('/api/classes', async (req, res) => {
  try {
    const classes = await Class.find();   // your MongoDB model
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch classes' });
  }
});








// ======================= ADMIN VIDEO ROUTES =======================
// Get all videos
app.get("/api/admin/videos", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add new video
app.post("/api/admin/videos", async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    const savedVideo = await newVideo.save();
    res.status(201).json({ message: "Video added successfully", video: savedVideo });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update video
app.put("/api/admin/videos/:id", async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVideo) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video updated successfully", video: updatedVideo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete video
app.delete("/api/admin/videos/:id", async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ======================= ADMIN PROGRAM ROUTES =======================
// Get all programs
app.get("/api/admin/programs", async (req, res) => {
  try {
    const programs = await Program.find().populate('videos').sort({ createdAt: -1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add new program
app.post("/api/admin/programs", async (req, res) => {
  try {
    const newProgram = new Program(req.body);
    const savedProgram = await newProgram.save();
    res.status(201).json({ message: "Program added successfully", program: savedProgram });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update program
app.put("/api/admin/programs/:id", async (req, res) => {
  try {
    const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProgram) return res.status(404).json({ message: "Program not found" });
    res.json({ message: "Program updated successfully", program: updatedProgram });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete program
app.delete("/api/admin/programs/:id", async (req, res) => {
  try {
    const deletedProgram = await Program.findByIdAndDelete(req.params.id);
    if (!deletedProgram) return res.status(404).json({ message: "Program not found" });
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add video to program
app.put("/api/admin/programs/:id/add-video", async (req, res) => {
  try {
    console.log('=== ADD VIDEO TO PROGRAM REQUEST ===');
    console.log('Program ID:', req.params.id);
    console.log('Video ID:', req.body.videoId);
    console.log('Request body:', req.body);
    
    const { videoId } = req.body;
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      console.log('Invalid video ID format:', videoId);
      return res.status(400).json({ message: "Invalid video ID format" });
    }

    // Check if video exists
    const video = await Video.findById(videoId);
    console.log('Found video:', video ? { id: video._id, title: video.title } : 'NOT FOUND');
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if program exists
    const program = await Program.findById(id);
    console.log('Found program:', program ? { id: program._id, title: program.title } : 'NOT FOUND');
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Check if video is already in program
    const isAlreadyInProgram = program.videos.some(vid => vid.toString() === videoId);
    console.log('Video already in program:', isAlreadyInProgram);
    if (isAlreadyInProgram) {
      return res.status(400).json({ message: "Video is already in this program" });
    }

    // Add video to program
    program.videos.push(videoId);
    await program.save();
    console.log('Video added to program successfully');

    // Populate videos for response
    const updatedProgram = await Program.findById(id).populate('videos');
    console.log('Updated program videos count:', updatedProgram.videos.length);

    res.json({ 
      message: "Video added to program successfully", 
      program: updatedProgram 
    });
  } catch (error) {
    console.error('Error adding video to program:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Remove video from program
app.put("/api/admin/programs/:id/remove-video", async (req, res) => {
  try {
    console.log('=== REMOVE VIDEO FROM PROGRAM REQUEST ===');
    console.log('Program ID:', req.params.id);
    console.log('Video ID:', req.body.videoId);
    
    const { videoId } = req.body;
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      console.log('Invalid video ID format:', videoId);
      return res.status(400).json({ message: "Invalid video ID format" });
    }

    // Check if program exists
    const program = await Program.findById(id);
    console.log('Found program:', program ? { id: program._id, title: program.title } : 'NOT FOUND');
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Check if video is in program
    const isInProgram = program.videos.some(vid => vid.toString() === videoId);
    console.log('Video in program:', isInProgram);
    if (!isInProgram) {
      return res.status(400).json({ message: "Video is not in this program" });
    }

    // Remove video from program
    program.videos = program.videos.filter(vid => vid.toString() !== videoId);
    await program.save();
    console.log('Video removed from program successfully');

    // Populate videos for response
    const updatedProgram = await Program.findById(id).populate('videos');
    console.log('Updated program videos count:', updatedProgram.videos.length);

    res.json({ 
      message: "Video removed from program successfully", 
      program: updatedProgram 
    });
  } catch (error) {
    console.error('Error removing video from program:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




// ======================= USER DASHBOARD =======================
app.get("/api/user/dashboard", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) return res.status(404).json({ message: "No users found" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ======================= ADMIN DASHBOARD =======================
// Note: GET /api/admin/users route is already defined above with isAdmin middleware

// ======================= TRIAL MANAGEMENT =======================

// Get user trial status
app.get('/api/user/trial-status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      trialUsed: user.trial?.used || false,
      trialCompleted: user.trial?.completed || false,
      videosCompleted: user.trial?.videosCompleted || 0,
      totalVideos: user.trial?.totalVideos || 4,
      trialStartDate: user.trial?.startDate,
      trialEndDate: user.trial?.endDate,
      subscriptionStatus: user.subscription.status
    });
  } catch (error) {
    console.error('Error getting trial status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start trial
app.post('/api/user/start-trial/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.trial && user.trial.used) {
      return res.status(400).json({ message: 'Trial already used' });
    }

    // Start 14-day trial
    const trialStartDate = new Date();
    const trialEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days

    user.trial = {
      used: true,
      startDate: trialStartDate,
      endDate: trialEndDate,
      videosCompleted: 0,
      totalVideos: 4,
      completed: false
    };

    user.subscription.status = 'trial';
    user.subscription.startDate = trialStartDate;
    user.subscription.endDate = trialEndDate;

    await user.save();

    res.json({
      message: 'Trial started successfully',
      trial: user.trial,
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Error starting trial:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark video as completed
app.post('/api/user/complete-video/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.trial || !user.trial.used) {
      return res.status(400).json({ message: 'No active trial' });
    }

    if (user.trial.completed) {
      return res.status(400).json({ message: 'Trial already completed' });
    }

    // Increment videos completed
    user.trial.videosCompleted += 1;

    // Check if all videos are completed
    if (user.trial.videosCompleted >= user.trial.totalVideos) {
      user.trial.completed = true;
      user.subscription.status = 'expired';
      user.subscription.endDate = new Date();
    }

    await user.save();

    res.json({
      message: 'Video completed successfully',
      videosCompleted: user.trial.videosCompleted,
      totalVideos: user.trial.totalVideos,
      trialCompleted: user.trial.completed,
      subscriptionStatus: user.subscription.status
    });
  } catch (error) {
    console.error('Error completing video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Skip video
app.post('/api/user/skip-video/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.trial || !user.trial.used) {
      return res.status(400).json({ message: 'No active trial' });
    }

    if (user.trial.completed) {
      return res.status(400).json({ message: 'Trial already completed' });
    }

    // Increment videos completed (same as completing)
    user.trial.videosCompleted += 1;

    // Check if all videos are completed
    if (user.trial.videosCompleted >= user.trial.totalVideos) {
      user.trial.completed = true;
      user.subscription.status = 'expired';
      user.subscription.endDate = new Date();
    }

    await user.save();

    res.json({
      message: 'Video skipped successfully',
      videosCompleted: user.trial.videosCompleted,
      totalVideos: user.trial.totalVideos,
      trialCompleted: user.trial.completed,
      subscriptionStatus: user.subscription.status
    });
  } catch (error) {
    console.error('Error skipping video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ======================= USER PROGRESS ROUTES =======================

// Get user progress
app.get('/api/user/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    let userProgress = await UserProgress.findOne({ userId }).populate('completedClasses completedPrograms favoriteClasses');
    
    if (!userProgress) {
      // Create new progress record if doesn't exist
      userProgress = new UserProgress({ userId });
      await userProgress.save();
    }

    res.json(userProgress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save user progress
app.post('/api/user/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { completedClasses, completedPrograms, favoriteClasses, trialProgress } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    let userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      userProgress = new UserProgress({ userId });
    }

    // Update progress data
    if (completedClasses) userProgress.completedClasses = completedClasses;
    if (completedPrograms) userProgress.completedPrograms = completedPrograms;
    if (favoriteClasses) userProgress.favoriteClasses = favoriteClasses;
    if (trialProgress) userProgress.trialProgress = trialProgress;
    
    userProgress.lastUpdated = new Date();
    await userProgress.save();

    res.json({ message: 'Progress saved successfully', userProgress });
  } catch (error) {
    console.error('Error saving user progress:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark class as completed
app.post('/api/user/complete-class/:userId/:classId', async (req, res) => {
  try {
    const { userId, classId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: 'Invalid user ID or class ID' });
    }

    let userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      userProgress = new UserProgress({ userId });
    }

    // Add class to completed if not already there
    if (!userProgress.completedClasses.includes(classId)) {
      userProgress.completedClasses.push(classId);
      await userProgress.save();
    }

    res.json({ message: 'Class marked as completed', userProgress });
  } catch (error) {
    console.error('Error marking class as completed:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark program as completed
app.post('/api/user/complete-program/:userId/:programId', async (req, res) => {
  try {
    const { userId, programId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(programId)) {
      return res.status(400).json({ message: 'Invalid user ID or program ID' });
    }

    let userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      userProgress = new UserProgress({ userId });
    }

    // Add program to completed if not already there
    if (!userProgress.completedPrograms.includes(programId)) {
      userProgress.completedPrograms.push(programId);
      await userProgress.save();
    }

    res.json({ message: 'Program marked as completed', userProgress });
  } catch (error) {
    console.error('Error marking program as completed:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle favorite class
app.post('/api/user/toggle-favorite/:userId/:classId', async (req, res) => {
  try {
    const { userId, classId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: 'Invalid user ID or class ID' });
    }

    let userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      userProgress = new UserProgress({ userId });
    }

    const classIndex = userProgress.favoriteClasses.indexOf(classId);
    
    if (classIndex > -1) {
      // Remove from favorites
      userProgress.favoriteClasses.splice(classIndex, 1);
    } else {
      // Add to favorites
      userProgress.favoriteClasses.push(classId);
    }

    await userProgress.save();

    res.json({ message: 'Favorite status updated', userProgress });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ======================= REVIEW ROUTES =======================

// Test reviews route
app.get('/api/reviews-test', (req, res) => {
  console.log('Reviews test endpoint hit');
  res.json({ message: 'Reviews test endpoint working' });
});

// Check if user has already submitted a review
app.get('/api/reviews/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const existingReview = await Review.findOne({ userId });
    res.json({ 
      hasReview: !!existingReview,
      review: existingReview 
    });
  } catch (error) {
    console.error('Error checking user review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    console.log('Reviews endpoint hit');
    const reviews = await Review.find().sort({ createdAt: -1 });
    console.log('Found reviews:', reviews.length);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { text, rating, userId, userName } = req.body;
    
    if (!text || !rating || !userId || !userName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user has already submitted a review
    const existingReview = await Review.findOne({ userId });
    if (existingReview) {
      return res.status(400).json({ 
        message: 'You have already submitted a review. You can only submit one review per account.',
        hasReview: true 
      });
    }

    const newReview = new Review({
      userId,
      userName,
      text,
      rating
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a review
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.text = text;
    review.rating = rating;
    review.updatedAt = new Date();
    
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.findByIdAndDelete(id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

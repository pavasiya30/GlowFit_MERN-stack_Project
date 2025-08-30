// const express = require("express")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const User = require("../models/User")
// const auth = require("../middleware/auth")

// const router = express.Router()

// // Register

// router.post("/register", async (req, res) => {
//   try {
//     const { name, contact, email, password, role } = req.body;

//     if (!name || !contact || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       contact: String(contact),
//       email,
//       password: hashedPassword,
//       role: role || "user",
//       subscription: {
//         status: "trial",
//         startDate: new Date(),
//         endDate: new Date(Date.now() + 14*24*60*60*1000),
//       },
//     });

//     await user.save();

//     const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.status(201).json({
//       message: "User created successfully",
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });




// // router.post("/register", async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body

// //     // Check if user exists
// //     const existingUser = await User.findOne({ email })
// //     if (existingUser) {
// //       return res.status(400).json({ message: "User already exists" })
// //     }

// //     // Hash password
// //     const salt = await bcrypt.genSalt(10)
// //     const hashedPassword = await bcrypt.hash(password, salt)

// //     // Create user
// //     const user = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //     })

// //     await user.save()

// //     // Generate JWT
// //     const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
// //       expiresIn: "7d",
// //     })

// //     res.status(201).json({
// //       message: "User created successfully",
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //       },
// //     })
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error", error: error.message })
// //   }
// // })

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body

//     // Check if user exists
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     // Generate JWT
//     const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     })

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         subscription: user.subscription,
//       },
//     })
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message })
//   }
// })

// // Get current user
// router.get("/me", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password")
//     res.json(user)
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message })
//   }
// })

// module.exports = router
















const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, contact, email, password, role } = req.body;

    if (!name || !contact || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      contact: String(contact),
      email,
      password: hashedPassword,
      role: role || "user",
      subscription: {
        status: "trial",
        startDate: new Date(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
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

// Get current user by ID
router.get("/me/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

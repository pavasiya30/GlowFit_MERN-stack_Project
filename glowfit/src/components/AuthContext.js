// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the AuthContext
// const AuthContext = createContext(null);

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // AuthProvider component to wrap the application
// export const AuthProvider = ({ children }) => {
//   // Use state to hold user info and login status
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check for stored user data on component mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // Login function
//   const login = (userData) => {
//     setUser(userData);
//     setIsLoggedIn(true);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     setIsLoggedIn(false);
//     localStorage.removeItem('user');
//   };

//   const value = {
//     user,
//     isLoggedIn,
//     login,
//     logout
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };










import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Login function (no JWT now)
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Signup with API
  const signup = async (signupData) => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', signupData);
      login(res.data.user);
    } catch (err) {
      console.error('Signup failed:', err);
      throw err;
    }
  };
/* The commented out code block you provided is a function named `login` that is intended to handle
user login using an API call to a specified endpoint (`http://localhost:5001/api/auth/login`). */

  // // Login with API
  // const login = async (credentials) => {
  //   try {
  //     const res = await axios.post('http://localhost:5001/api/auth/login', credentials);
  //     login(res.data.user);
  //   } catch (err) {
  //     console.error('Login failed:', err);
  //     throw err;
  //   }
  // };

  // Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isLoggedIn,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

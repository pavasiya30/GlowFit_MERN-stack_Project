
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../components/AuthContext';
// import logo from '../assets/file.png';
// import '../assets/style.css';

// const Navbar = () => {
//   const { user, isLoggedIn, logout } = useAuth();

//   return (
//     <nav className="navbar navbar-expand-lg fixed-top">
//       <div className="container-fluid">
//         <Link className="navbar-brand text-light" to="/">
//           <img
//             src={logo}
//             alt="Logo"
//             style={{ height: '40px', width: '70px', borderRadius: '50%' }}
//           />
//         </Link>
//         <button
//           className="navbar-toggler bg-light"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarContent"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarContent">
//           <ul className="navbar-nav mx-auto" style={{ gap: '35px' }}>
//             <li className="nav-item">
//               <Link className="nav-link btn b1" to="/">
//                 Home
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li className="nav-item">
//                 <Link className="nav-link btn b1" to="/classes">
//                   Classes
//                 </Link>
//               </li>
//             )}
//             <li className="nav-item">
//               <Link className="nav-link btn b1" to="/program">
//                 Programs
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link btn b1" to="/teachers">
//                 Teachers
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link btn b1" to="/about">
//                 About Us
//               </Link>
//             </li>
//           </ul>
//           <ul className="navbar-nav">
//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link a1 b1" to="/dashboard">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <span className="nav-link text-white b1">{user?.name}</span>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link a1 b1" to="/logout">
//                   <button className="nav-link a1 b1 btn btn-link" onClick={logout}>
//                     Log Out
//                   </button>
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link a1 b1" to="/signup">
//                     Sign Up
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link a1 b1" to="/login">
//                     Log In
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import logo from '../assets/file.png';
import '../assets/style.css';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout and redirect to login
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', width: '70px', borderRadius: '50%' }}
          />
        </Link>
        <button
          className="navbar-toggler bg-light"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* If user is admin → hide normal nav links */}
          {isLoggedIn && user?.role === 'admin' ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link a1 b1" to="/admin-dashboard">
                  Admin Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link a1 b1 btn btn-link"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          ) : (
            <>
                             {/* Normal Navbar Links */}
               <ul className="navbar-nav mx-auto" style={{ gap: '35px' }}>

               </ul>

              <ul className="navbar-nav">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link a1 b1" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link text-white b1">{user?.name}</span>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link a1 b1 btn btn-link"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link a1 b1" to="/signup">
                        Sign Up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link a1 b1" to="/login">
                        Log In
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

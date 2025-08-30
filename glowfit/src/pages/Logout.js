import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Logout = () => {
  // Get the logout function from the authentication context.
  const { logout } = useAuth();
  // Get the navigation function to redirect the user.
  const navigate = useNavigate();

  useEffect(() => {
    // Call the logout function to clear user data and state.
    logout();
    // Redirect the user to the home page.
    navigate('/');
  }, [logout, navigate]); // The effect depends on logout and navigate functions.

  // This component doesn't render any visible UI.
  // It simply performs the logout and redirects.
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;

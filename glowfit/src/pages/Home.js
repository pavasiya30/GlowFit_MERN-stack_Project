import React from 'react';
import { useAuth } from '../components/AuthContext';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CallToActionSection from '../components/CallToActionSection';
import ReviewSystem from '../components/ReviewSystem';
import MemberShowcase from '../components/MemberShowcase';
import yoga1 from '../assets/yoga1.jpg'

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <main
    className="min-vh-100"
      style={{
        backgroundImage: `url(${yoga1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}>
      <HeroSection />
      <FeaturesSection />
      <CallToActionSection />
      {/* Only show ReviewSystem when user is logged in */}
      {isLoggedIn && <ReviewSystem />}
      {/* Always show MemberShowcase */}
      <MemberShowcase/>
    </main>
  );
};

export default Home;
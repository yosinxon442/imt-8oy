import { useState } from 'react';
import UserProfile from '../components/UserProfile';
import '../styles/home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="home-container">
      <div className="tab-navigation" data-aos="fade-up" data-aos-duration="400">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'profile' && <UserProfile />}
      </div>
    </div>
  );
};

export default Home;
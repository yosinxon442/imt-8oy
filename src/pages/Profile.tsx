import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('https://api.noventer.uz/api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Profile ma\'lumotlarini olishda xatolik');
        }
      } catch (error) {
        console.error('Profile ma\'lumotlarini olishda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Ma'lumotlar yuklanmoqda...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <p>Ma'lumotlarni yuklashda xatolik yuz berdi</p>
      </div>
    );
  }

  return (
    <div className="profile-container" data-aos="fade-up" data-aos-duration="600">
      <div className="profile-header">
        <h1>Profil</h1>
      </div>
      
      <div className="profile-content">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} />
            ) : (
              <span>{profile.name.charAt(0)}</span>
            )}
          </div>
        </div>

        <div className="profile-info">
          <div className="info-group">
            <label>F.I.O</label>
            <p>{profile.name}</p>
          </div>

          <div className="info-group">
            <label>Email</label>
            <p>{profile.email}</p>
          </div>

          <div className="info-group">
            <label>Telefon raqami</label>
            <p>{profile.phone}</p>
          </div>

          <div className="info-group">
            <label>Lavozim</label>
            <p>{profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
import { useProfile } from '../hooks/useProfile';
import '../styles/userProfile.css';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import "../styles/userProfile.css"

const UserProfile = () => {
  const { profile, loading, error } = useProfile();
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <div className="loading-profile">Ma'lumotlar yuklanmoqda...</div>;
  }
  if (error) {
    return <div className="loading-profile">Xatolik: {error}</div>;
  }
  if (!profile) {
    return <div className="loading-profile">Foydalanuvchi ma'lumotlari topilmadi</div>;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Mavjud emas';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="user-profile-card">
      {showModal && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <button className="modal-close" onClick={() => setShowModal(false)}>
        &times;
      </button>
      <h2>Profilni tahrirlash</h2>
      <form className="modal-form" onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const token = localStorage.getItem('token');
        try {
          const res = await fetch('/api/api/v1/accounts/me/', {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });
          if (!res.ok) {
            alert('Profilni yangilashda xatolik!');
            return;
          }
          setShowModal(false);
          window.location.reload();
        } catch (err) {
          alert('Tarmoq xatosi!');
        }
      }}>
        <label>
          Ism/Familiya:
          <input name="full_name" defaultValue={profile.full_name} required minLength={1} maxLength={40} />
        </label>
        <label>
          Jins:
          <select name="gender" defaultValue={profile.gender || ''}>
            <option value="">Tanlang</option>
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
          </select>
        </label>
        <label>
          Tug'ilgan sana:
          <input name="birth_date" type="date" defaultValue={profile.birth_date || ''} />
        </label>
        <label>
          Email:
          <input name="email" type="email" defaultValue={profile.email} maxLength={60} />
        </label>
        <label>
          Role:
          <select name="role" defaultValue={profile.role || ''}>
            <option value="">Tanlang</option>
            <option value="director">Director</option>
            <option value="manager">Manager</option>
            <option value="accountant">Accountant</option>
            <option value="employee">Employee</option>
          </select>
        </label>
        <label>
          Avatar:
          <input name="avatar" type="file" accept="image/*" />
        </label>
        <label>
          Maosh turi:
          <select name="salary_type" defaultValue={profile.salary_type || ''}>
            <option value="">Tanlang</option>
            <option value="official">Official</option>
            <option value="unofficial">Unofficial</option>
          </select>
        </label>
        <button type="submit" className="submit-btn">Saqlash</button>
      </form>
    </div>
  </div>
)}

      <div className="profile-header">
        <div className="profile-bg"></div>
        <div className="profile-info">
          <div className="avatar-large">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Avatar" style={{width: 80, height: 80, borderRadius: '50%'}} />
            ) : (
              <FiUser size={40} />
            )}
          </div>
          <div className="user-info">
            <span className="user-role">Asosiy foydalanuvchi</span>
            <h2 className="user-name" style={{display:'inline-block', marginRight:'1rem'}}>{profile.full_name || 'Foydalanuvchi'}</h2>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <span className="user-role-badge">{profile.role || 'Role yo\'q'}</span>
              <button className="edit-profile-btn" style={{padding:'0.4rem 1.2rem', borderRadius:'6px', border:'none', background:'#2563eb', color:'#fff', fontWeight:600, cursor:'pointer', verticalAlign:'middle'}} onClick={()=>setShowModal(true)}>
                Profilni tahrirlash
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <h3 className="details-title">Ma'lumotlar</h3>
        <div className="details-grid">
          <div className="detail-item">
            <div className="detail-label">Telefon raqami:</div>
            <div className="detail-value">{profile.phone_number || 'Mavjud emas'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Email:</div>
            <div className="detail-value">{profile.email || 'Mavjud emas'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Balans:</div>
            <div className="detail-value">{profile.balance !== undefined ? profile.balance : 'Mavjud emas'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">INN:</div>
            <div className="detail-value">{profile.inn || 'Mavjud emas'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Jins:</div>
            <div className="detail-value">{profile.gender || 'Mavjud emas'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Tug'ilgan sana:</div>
            <div className="detail-value">{formatDate(profile.birth_date)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
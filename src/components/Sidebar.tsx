import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiDatabase, FiPieChart, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../styles/sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [active, setActive] = useState('/');

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <aside className="sidebar" data-aos="fade-right" data-aos-duration="500">
      <div className="logo-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🔸</span>
          <span className="logo-text">Noventer</span>
        </Link>
      </div>
      
      <nav className="nav-menu">
        <ul>
          <li className={active === '/' ? 'active' : ''}>
            <Link to="/">
              <FiHome className="nav-icon" />
              <span>Asosiy sahifa</span>
            </Link>
          </li>
          <li className={active === '/xodimlar' ? 'active' : ''}>
            <Link to="/xodimlar">
              <FiUsers className="nav-icon" />
              <span>Xodimlar ro'yxati</span>
            </Link>
          </li>
          <li className={active === '/mijozlar' ? 'active' : ''}>
            <Link to="/mijozlar">
              <FiUsers className="nav-icon" />
              <span>Mijozlar</span>
            </Link>
          </li>
          <li className={active === '/dala-xodimlari' ? 'active' : ''}>
            <Link to="/dala-xodimlari">
              <FiUsers className="nav-icon" />
              <span>Dala xodimlari</span>
            </Link>
          </li>
          <li className={active === '/takliflar' ? 'active' : ''}>
            <Link to="/takliflar">
              <FiCalendar className="nav-icon" />
              <span>Takliflar</span>
            </Link>
          </li>
          <li className={active === '/xisobot' ? 'active' : ''}>
            <Link to="/xisobot">
              <FiPieChart className="nav-icon" />
              <span>Xisobot</span>
            </Link>
          </li>
          <li className={active === '/sozlamalar' ? 'active' : ''}>
            <Link to="/sozlamalar">
              <FiSettings className="nav-icon" />
              <span>Sozlamalar</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-button" onClick={logout}>
          <FiLogOut className="nav-icon" />
          <span>Chiqish</span>
        </button>
        <div className="footer-text">
          <small>crm.noventer platformasi Noventer jamoa tomonidan yaratildi | 2025 © Noventer</small>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
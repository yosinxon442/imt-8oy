import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import '../styles/notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container" data-aos="fade-in" data-aos-duration="1000">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Sahifa topilmadi</h2>
        <p className="error-message">
          Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <Link to="/" className="home-button">
          <FiHome className="home-icon" />
          <span>Asosiy sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
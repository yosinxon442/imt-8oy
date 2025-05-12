import { useNavigate } from 'react-router-dom';

const SimeniyaAddEmployee = () => {
  const navigate = useNavigate();

  return (
    <div className="add-employee-page">
      <h2 style={{ marginBottom: 24 }}>Hodim qo‘shish</h2>
      <form className="employee-form">
        <div className="form-sections" style={{ display: 'flex', gap: 32 }}>
          <div className="form-section" style={{ flex: 1 }}>
            <h3>Shaxsiy ma'lumot</h3>
            <input type="text" placeholder="F.I.Sh" style={{ width: '100%', marginBottom: 12 }} />
            <select style={{ width: '100%', marginBottom: 12 }}>
              <option>Jins</option>
              <option>Erkak</option>
              <option>Ayol</option>
            </select>
            <input type="text" placeholder="Telefon raqamingiz" style={{ width: '100%', marginBottom: 12 }} />
            <input type="date" placeholder="Tug‘ilgan sanangiz" style={{ width: '100%', marginBottom: 12 }} />
            <input type="text" placeholder="Pasport seriasi va raqami" style={{ width: '100%', marginBottom: 12 }} />
            <input type="text" placeholder="JSHSHIR" style={{ width: '100%', marginBottom: 12 }} />
          </div>
          <div className="form-section" style={{ flex: 1 }}>
            <h3>Tashkilot uchun ma'lumot</h3>
            <select style={{ width: '100%', marginBottom: 12 }}>
              <option>Filialni tanlang</option>
            </select>
            <select style={{ width: '100%', marginBottom: 12 }}>
              <option>Bo‘limni tanlang</option>
            </select>
            <select style={{ width: '100%', marginBottom: 12 }}>
              <option>Smena tanlang</option>
            </select>
            <select style={{ width: '100%', marginBottom: 12 }}>
              <option>Lavozimni tanlang</option>
            </select>
            <input type="text" placeholder="Rasmiy oylik" style={{ width: '100%', marginBottom: 12 }} />
            <input type="text" placeholder="Norasmiy oylik" style={{ width: '100%', marginBottom: 12 }} />
          </div>
        </div>
        <div className="form-actions" style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            type="button"
            style={{ background: '#FF5C5C', color: '#fff', padding: '8px 24px', borderRadius: 6, border: 'none' }}
            onClick={() => navigate(-1)}
          >
            Bekor qilish
          </button>
          <button type="submit" style={{ background: '#6C63FF', color: '#fff', padding: '8px 24px', borderRadius: 6, border: 'none' }}>
            Qo‘shish
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimeniyaAddEmployee; 
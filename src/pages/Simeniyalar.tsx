import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Branch = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  user: {
    full_name: string;
    phone_number: string;
    birth_date: string;
  };
  user_role?: string;
  position?: string;
  official_salary?: string;
};

const Simeniyalar = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setBranchId] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [branchesLoading, setBranchesLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      setBranchesLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api.noventer.uz/api/v1/company/get/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.branches)) {
            setBranches(data.branches);
            if (data.branches.length > 0) setBranchId(data.branches[0].id);
          }
        }
      } finally {
        setBranchesLoading(false);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (!branchId) return;
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `https://api.noventer.uz/api/v1/employee/employees/branch/${branchId}/`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEmployees(data.results || []);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [branchId]);

  return (
    <div className="simeniyalar-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label htmlFor="branch">Filial tanlang:</label>
          {branchesLoading ? (
            <span>Filiallar yuklanmoqda...</span>
          ) : (
            <select
              id="branch"
              value={branchId ?? ''}
              onChange={e => setBranchId(Number(e.target.value))}
              style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #ccc' }}
            >
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
          )}
        </div>
        <button
          style={{ background: '#6C63FF', color: '#fff', padding: '8px 20px', borderRadius: 6, border: 'none' }}
          onClick={() => navigate('/simeniyalar/add-employee')}
        >
          Hodim qo‘shish
        </button>
      </div>
      {loading ? (
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>F.I.O</th>
              <th>Telefon raqami</th>
              <th>Lavozim</th>
              <th>Tug'ilgan sana</th>
              <th>Maosh</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.user?.full_name}</td>
                <td>{emp.user?.phone_number}</td>
                <td>{emp.position || emp.user_role}</td>
                <td>{emp.user?.birth_date}</td>
                <td>{emp.official_salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Simeniyalar; 
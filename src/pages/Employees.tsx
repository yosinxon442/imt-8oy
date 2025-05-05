import DataTable from '../components/DataTable';
import { TableData } from '../types';
import { useEmployees } from '../hooks/useEmployees';
import { useState } from 'react';

const Employees = () => {
  const [search, setSearch] = useState('');
  const { data, loading, error } = useEmployees({ limit: 20, search });

  // API dan kelgan hodimlarni TableData formatiga moslashtiramiz
  const employeesData: TableData[] =
    data?.results.map((emp) => ({
      id: String(emp.id),
      avatar: emp.user.full_name.charAt(0),
      name: emp.user.full_name,
      phone: emp.user.phone_number,
      role: emp.user_role || emp.position || '',
      date: emp.user.birth_date || '',
      time: emp.start_time || ''
    })) || [];

  return (
    <div className="employees-page">
      <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end'}}>
        <input
          type="text"
          placeholder="Hodimlarni qidirish..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #ccc', minWidth: '250px'}}
        />
      </div>
      {loading && <div>Yuklanmoqda...</div>}
      {error && <div>Xatolik: {error}</div>}
      {!loading && !error && (
        <DataTable title="Xodimlar ro'yxati" data={employeesData} />
      )}
    </div>
  );
};

export default Employees;
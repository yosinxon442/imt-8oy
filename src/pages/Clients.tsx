import DataTable from '../components/DataTable';
import { TableData } from '../types';

const clientsData: TableData[] = Array(10).fill(null).map((_, index) => ({
  id: `client-${index + 1}`,
  avatar: 'C',
  name: 'Cathy Jones',
  phone: '+998 93 425-11-11',
  role: 'Tashkent',
  date: '11.03.2023',
  time: '8:30'
}));

const Clients = () => {
  return (
    <div className="clients-page">
      <DataTable title="Mijozlar ro'yxati" data={clientsData} />
    </div>
  );
};

export default Clients;
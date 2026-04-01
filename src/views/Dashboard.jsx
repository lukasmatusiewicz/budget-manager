import SummaryGrid from '../components/organisms/SummaryGrid/SummaryGrid.jsx';
import RecentActivity from '../components/organisms/RecentActivity/RecentActivity.jsx';

const Dashboard = () => {
  // Mock data for now
  const data = {
    balance: '$0.00',
    income: '$0.00',
    expenses: '$0.00',
    transactions: []
  };

  return (
    <main className="dashboard">
      <SummaryGrid 
        balance={data.balance} 
        income={data.income} 
        expenses={data.expenses} 
      />
      <RecentActivity transactions={data.transactions} />
    </main>
  );
};

export default Dashboard;

import SummaryGrid from '../../components/organisms/SummaryGrid/SummaryGrid.jsx';
import RecentActivity from '../../components/organisms/RecentActivity/RecentActivity.jsx';
import './Dashboard.css';

const Dashboard = ({ transactions = [] }) => {
  const totals = transactions.reduce((acc, current) => {
    if (current.type === 'income') {
      acc.income += current.amount;
    } else {
      acc.expenses += current.amount;
    }
    return acc;
  }, { income: 0, expenses: 0 });

  const data = {
    balance: `$${(totals.income - totals.expenses).toFixed(2)}`,
    income: `$${totals.income.toFixed(2)}`,
    expenses: `$${totals.expenses.toFixed(2)}`,
    recentTransactions: transactions.slice(0, 5) // Show last 5
  };

  return (
    <main className="dashboard">
      <SummaryGrid 
        balance={data.balance} 
        income={data.income} 
        expenses={data.expenses} 
      />
      <RecentActivity transactions={data.recentTransactions} />
    </main>
  );
};

export default Dashboard;

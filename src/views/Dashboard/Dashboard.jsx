import { useSelector } from 'react-redux';
import SummaryGrid from '../../components/organisms/SummaryGrid/SummaryGrid.jsx';
import RecentActivity from '../../components/organisms/RecentActivity/RecentActivity.jsx';
import { selectTransactions, selectTotals, selectBalance } from '../../store/slices/transactionSlice.js';
import './Dashboard.css';

const Dashboard = () => {
  const transactions = useSelector(selectTransactions);
  const totals = useSelector(selectTotals);
  const balance = useSelector(selectBalance);

  const data = {
    balance: `$${balance.toFixed(2)}`,
    income: `$${totals.income.toFixed(2)}`,
    expenses: `$${totals.expenses.toFixed(2)}`,
    recentTransactions: transactions.slice(0, 5)
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

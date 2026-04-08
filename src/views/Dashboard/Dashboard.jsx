import { useSelector } from 'react-redux';
import SummaryGrid from '../../components/organisms/SummaryGrid/SummaryGrid.jsx';
import RecentActivity from '../../components/organisms/RecentActivity/RecentActivity.jsx';
import { selectTransactions, selectTotals, selectBalance, selectTransactionPreferences } from '../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../utils/formatters.js';
import './Dashboard.css';

const Dashboard = () => {
  const transactions = useSelector(selectTransactions);
  const totals = useSelector(selectTotals);
  const balance = useSelector(selectBalance);
  const { currency } = useSelector(selectTransactionPreferences);

  const data = {
    balance: formatCurrency(balance, currency),
    income: formatCurrency(totals.income, currency),
    expenses: formatCurrency(totals.expenses, currency),
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

import SummaryGrid from '../../components/organisms/SummaryGrid/SummaryGrid.jsx';
import RecentActivity from '../../components/organisms/RecentActivity/RecentActivity.jsx';
import { useTransactions } from '../../context/TransactionContext/TransactionContext.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions, totals, balance } = useTransactions();

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

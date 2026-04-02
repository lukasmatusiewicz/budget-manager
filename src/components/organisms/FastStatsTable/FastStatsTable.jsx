import { useSelector } from 'react-redux';
import { selectTransactions } from '../../../store/slices/transactionSlice.js';
import './FastStatsTable.css';

const FastStatsTable = () => {
  const transactions = useSelector(selectTransactions);

  // Date logic for last 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

  const recentTransactions = transactions.filter(t => t.date >= thirtyDaysAgoStr);
  
  const incomes = recentTransactions.filter(t => t.type === 'income');
  const expenses = recentTransactions.filter(t => t.type === 'expense');

  const incomeSum = incomes.reduce((acc, t) => acc + t.amount, 0);
  const expenseSum = expenses.reduce((acc, t) => acc + t.amount, 0);

  // Monthly average logic (based on all history to be meaningful)
  const getMonthlyAverage = (type) => {
    const typeTransactions = transactions.filter(t => t.type === type);
    if (typeTransactions.length === 0) return 0;
    
    const months = new Set(typeTransactions.map(t => t.date.substring(0, 7)));
    const totalSum = typeTransactions.reduce((acc, t) => acc + t.amount, 0);
    return totalSum / Math.max(months.size, 1);
  };

  const stats = [
    { label: 'Transactions Count', income: incomes.length, expense: expenses.length, unit: '' },
    { label: 'Average per Day', income: incomeSum / 30, expense: expenseSum / 30, unit: '$' },
    { label: 'Average Monthly', income: getMonthlyAverage('income'), expense: getMonthlyAverage('expense'), unit: '$' },
    { label: 'Sum (Last 30 Days)', income: incomeSum, expense: expenseSum, unit: '$' },
  ];

  return (
    <div className="fast-stats-container view-container">
      <h3>Quick Stats (Last 30 Days)</h3>
      <table className="fast-stats-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th className="income-col">Incomes</th>
            <th className="expense-col">Outcomes</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row, index) => (
            <tr key={index}>
              <td className="metric-label">{row.label}</td>
              <td className="income-val">
                {row.unit}{typeof row.income === 'number' ? row.income.toLocaleString(undefined, { minimumFractionDigits: row.unit ? 2 : 0, maximumFractionDigits: row.unit ? 2 : 0 }) : row.income}
              </td>
              <td className="expense-val">
                {row.unit}{typeof row.expense === 'number' ? row.expense.toLocaleString(undefined, { minimumFractionDigits: row.unit ? 2 : 0, maximumFractionDigits: row.unit ? 2 : 0 }) : row.expense}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FastStatsTable;

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectTransactions, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import './FastStatsTable.css';

const FastStatsTable = () => {
  const { t } = useTranslation();
  const transactions = useSelector(selectTransactions);
  const { currency } = useSelector(selectTransactionPreferences);

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
    { label: t('reports.metrics.count'), income: incomes.length, expense: expenses.length, isCurrency: false },
    { label: t('reports.metrics.avg_day'), income: incomeSum / 30, expense: expenseSum / 30, isCurrency: true },
    { label: t('reports.metrics.avg_month'), income: getMonthlyAverage('income'), expense: getMonthlyAverage('expense'), isCurrency: true },
    { label: t('reports.metrics.sum_30'), income: incomeSum, expense: expenseSum, isCurrency: true },
  ];

  return (
    <div className="fast-stats-container view-container">
      <h3>{t('reports.quick_stats')}</h3>
      <table className="fast-stats-table">
        <thead>
          <tr>
            <th>{t('reports.metric')}</th>
            <th className="income-col">{t('common.incomes')}</th>
            <th className="expense-col">{t('common.outcomes')}</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row, index) => (
            <tr key={index}>
              <td className="metric-label">{row.label}</td>
              <td className="income-val">
                {row.isCurrency ? formatCurrency(row.income, currency) : row.income}
              </td>
              <td className="expense-val">
                {row.isCurrency ? formatCurrency(row.expense, currency) : row.expense}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FastStatsTable;

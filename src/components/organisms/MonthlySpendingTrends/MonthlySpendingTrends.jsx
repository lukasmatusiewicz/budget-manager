import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { selectMonthlyHistory, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import './MonthlySpendingTrends.css';

const MonthlySpendingTrends = () => {
  const { t } = useTranslation();
  const history = useSelector(selectMonthlyHistory);
  const { currency } = useSelector(selectTransactionPreferences);

  return (
    <div className="analytics-card">
      <h3>{t('reports.monthly_trends')}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={history}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--text)" 
              tickFormatter={(val) => val.substring(2)} // YY-MM
            />
            <YAxis stroke="var(--text)" />
            <Tooltip 
              cursor={{fill: 'var(--social-bg)'}}
              contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-h)' }}
              formatter={(value) => formatCurrency(value, currency)}
            />
            <Bar dataKey="expenses" fill="#ff4b4b" radius={[4, 4, 0, 0]} name={t('common.expenses')} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySpendingTrends;

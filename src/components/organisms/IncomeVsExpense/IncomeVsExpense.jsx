import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { selectMonthlyHistory, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import './IncomeVsExpense.css';

const IncomeVsExpense = () => {
  const { t } = useTranslation();
  const history = useSelector(selectMonthlyHistory);
  const { currency } = useSelector(selectTransactionPreferences);

  return (
    <div className="analytics-card">
      <h3>{t('reports.income_vs_expense')}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--text)" 
              tickFormatter={(val) => val.substring(2)}
            />
            <YAxis stroke="var(--text)" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-h)' }}
              formatter={(value) => formatCurrency(value, currency)}
            />
            <Legend verticalAlign="top" height={36}/>
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#2ecc71" 
              strokeWidth={2}
              name={t('common.income')} 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ff4b4b" 
              strokeWidth={2}
              name={t('common.expenses')} 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeVsExpense;

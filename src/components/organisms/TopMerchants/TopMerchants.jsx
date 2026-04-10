import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { selectTopMerchants, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import './TopMerchants.css';

const TopMerchants = () => {
  const { t } = useTranslation();
  const topMerchants = useSelector(selectTopMerchants);
  const { currency } = useSelector(selectTransactionPreferences);

  return (
    <div className="analytics-card">
      <h3>{t('reports.top_merchants')}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topMerchants} layout="vertical" margin={{ left: 40, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
            <XAxis type="number" stroke="var(--text)" />
            <YAxis 
              dataKey="name" 
              type="category" 
              stroke="var(--text)" 
              width={80}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              cursor={{fill: 'var(--social-bg)'}}
              contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-h)' }}
              formatter={(value) => formatCurrency(value, currency)}
            />
            <Bar dataKey="value" fill="#3498db" radius={[0, 4, 4, 0]} name={t('common.amount')}>
               {topMerchants.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(${200 + index * 10}, 70%, 50%)`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopMerchants;

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { selectMonthlyHistory, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import { EXPENSE_CATEGORIES } from '../../../constants/categories.js';
import { CATEGORY_COLORS } from '../../../constants/colors.js';
import './CategoryComparison.css';

const CategoryComparison = () => {
  const { t } = useTranslation();
  const history = useSelector(selectMonthlyHistory);
  const { currency } = useSelector(selectTransactionPreferences);

  // Transform data for AreaChart
  const chartData = history.map(h => ({
    month: h.month,
    ...h.categories
  }));

  return (
    <div className="analytics-card">
      <h3>{t('reports.category_comparison')}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--text)" 
              tickFormatter={(val) => val.substring(2)}
            />
            <YAxis stroke="var(--text)" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-h)' }}
              formatter={(value, name) => [formatCurrency(value, currency), t(`categories.${name}`)]}
            />
            {EXPENSE_CATEGORIES.map((category) => (
              <Area 
                key={category}
                type="monotone"
                dataKey={category}
                stackId="1"
                stroke={CATEGORY_COLORS[category] || '#ccc'}
                fill={CATEGORY_COLORS[category] || '#ccc'}
                name={t(`categories.${category}`)}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryComparison;

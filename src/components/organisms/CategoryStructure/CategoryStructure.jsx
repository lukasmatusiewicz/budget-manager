import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip, Cell } from 'recharts';
import { selectTransactions, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { selectThemeMode } from '../../../store/slices/themeSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import { LIGHT_CHART_COLORS, DARK_CHART_COLORS } from '../../../constants/colors.js';
import './CategoryStructure.css';

const CategoryStructure = ({ type = 'expense', title = 'Expenses Structure' }) => {
  const { t } = useTranslation();
  const transactions = useSelector(selectTransactions);
  const { currency } = useSelector(selectTransactionPreferences);
  const themeMode = useSelector(selectThemeMode);
  
  const colors = themeMode === 'dark' ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;

  const data = transactions
    .filter(t => t.type === type)
    .reduce((acc, current) => {
      const existing = acc.find(item => item.name === current.category);
      if (existing) {
        existing.value += current.amount;
      } else {
        acc.push({ 
          name: current.category, 
          value: current.amount,
        });
      }
      return acc;
    }, [])
    .map((item, index) => ({
      ...item,
      fill: colors[index % colors.length]
    }));

  if (data.length === 0) {
    return (
      <div className="category-structure empty">
        <h3>{title}</h3>
        <p>{t('common.no_data')}</p>
      </div>
    );
  }

  return (
    <div className="category-structure">
      <h3>{title}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [formatCurrency(value, currency), t(`categories.${name}`)]}
              contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-h)' }}
            />
            <Legend formatter={(value) => t(`categories.${value}`)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryStructure;

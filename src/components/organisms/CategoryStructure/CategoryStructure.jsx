import { useSelector } from 'react-redux';
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { selectTransactions } from '../../../store/slices/transactionSlice.js';
import { selectThemeMode } from '../../../store/slices/themeSlice.js';
import { LIGHT_CHART_COLORS, DARK_CHART_COLORS } from '../../../constants/colors.js';
import './CategoryStructure.css';

const CategoryStructure = ({ type = 'expense', title = 'Expenses Structure' }) => {
  const transactions = useSelector(selectTransactions);
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
        <p>No data available to display.</p>
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
            />
            <Tooltip 
              formatter={(value) => `$${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-h)' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryStructure;

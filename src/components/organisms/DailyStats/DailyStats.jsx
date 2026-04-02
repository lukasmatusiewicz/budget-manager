import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { selectTransactions } from '../../../store/slices/transactionSlice.js';
import './DailyStats.css';

const DailyStats = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const transactions = useSelector(selectTransactions);

  const dailyData = transactions.filter(t => t.date === selectedDate);
  
  const totals = dailyData.reduce((acc, current) => {
    if (current.type === 'income') {
      acc.income += current.amount;
    } else {
      acc.expenses += current.amount;
    }
    return acc;
  }, { income: 0, expenses: 0 });

  const chartData = [
    { name: 'Income', value: totals.income, fill: '#2ecc71' },
    { name: 'Expenses', value: totals.expenses, fill: '#ff4b4b' }
  ];

  return (
    <div className="daily-stats view-container">
      <div className="daily-stats-header">
        <h3>Daily Statistics</h3>
        <div className="date-picker-container">
          <label htmlFor="date-select">Select Date:</label>
          <input 
            type="date" 
            id="date-select" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      <div className="daily-summary-grid">
        <div className="summary-item income">
          <span>Income</span>
          <p>${totals.income.toFixed(2)}</p>
        </div>
        <div className="summary-item expense">
          <span>Expenses</span>
          <p>${totals.expenses.toFixed(2)}</p>
        </div>
        <div className="summary-item net">
          <span>Net</span>
          <p>${(totals.income - totals.expenses).toFixed(2)}</p>
        </div>
      </div>

      <div className="daily-chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--text)" />
            <YAxis stroke="var(--text)" />
            <Tooltip 
              cursor={{fill: 'var(--social-bg)'}}
              contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-h)' }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyStats;

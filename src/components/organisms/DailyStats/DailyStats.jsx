import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { selectTransactions, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import './DailyStats.css';

const DailyStats = () => {
  const { t } = useTranslation();
  const { currency } = useSelector(selectTransactionPreferences);
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'monthly'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  
  const transactions = useSelector(selectTransactions);

  const filteredData = transactions.filter(t => {
    if (viewMode === 'daily') {
      return t.date === selectedDate;
    } else {
      return t.date.startsWith(selectedMonth);
    }
  });
  
  const totals = filteredData.reduce((acc, current) => {
    if (current.type === 'income') {
      acc.income += current.amount;
    } else {
      acc.expenses += current.amount;
    }
    return acc;
  }, { income: 0, expenses: 0 });

  const chartData = [
    { name: t('common.income'), value: totals.income, fill: '#2ecc71' },
    { name: t('common.expenses'), value: totals.expenses, fill: '#ff4b4b' }
  ];

  return (
    <div className="daily-stats view-container">
      <div className="daily-stats-header">
        <div className="header-left">
          <h3>{viewMode === 'daily' ? t('reports.daily_stats') : t('reports.monthly_stats')}</h3>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'daily' ? 'active' : ''}`}
              onClick={() => setViewMode('daily')}
            >
              {t('reports.daily')}
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'monthly' ? 'active' : ''}`}
              onClick={() => setViewMode('monthly')}
            >
              {t('reports.monthly')}
            </button>
          </div>
        </div>
        
        <div className="date-picker-container">
          <label htmlFor="date-select">{t('common.select')} {viewMode === 'daily' ? t('common.date') : t('common.month')}:</label>
          {viewMode === 'daily' ? (
            <input 
              type="date" 
              id="date-select" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          ) : (
            <input 
              type="month" 
              id="date-select" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="date-input"
            />
          )}
        </div>
      </div>

      <div className="daily-summary-grid">
        <div className="summary-item income">
          <span>{t('reports.total_income')}</span>
          <p>{formatCurrency(totals.income, currency)}</p>
        </div>
        <div className="summary-item expense">
          <span>{t('reports.total_expenses')}</span>
          <p>{formatCurrency(totals.expenses, currency)}</p>
        </div>
        <div className="summary-item net">
          <span>{t('common.net_balance')}</span>
          <p>{formatCurrency(totals.income - totals.expenses, currency)}</p>
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
              formatter={(value) => formatCurrency(value, currency)}
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

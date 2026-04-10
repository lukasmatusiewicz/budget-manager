import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { selectMonthlyHistory } from '../../../store/slices/transactionSlice.js';
import './SavingsRateChart.css';

const SavingsRateChart = () => {
  const { t } = useTranslation();
  const history = useSelector(selectMonthlyHistory);

  const chartData = history.map(h => {
    const rate = h.income > 0 ? ((h.income - h.expenses) / h.income) * 100 : 0;
    return {
      month: h.month,
      rate: Math.max(0, rate).toFixed(1)
    };
  });

  return (
    <div className="analytics-card">
      <div className="card-header-with-desc">
        <h3>{t('reports.savings_rate')}</h3>
        <p className="desc">{t('reports.savings_rate_desc')}</p>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f39c12" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f39c12" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--text)" 
              tickFormatter={(val) => val.substring(2)}
            />
            <YAxis stroke="var(--text)" unit="%" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-h)' }}
              formatter={(value) => [`${value}%`, t('reports.savings_rate')]}
            />
            <Area 
              type="monotone" 
              dataKey="rate" 
              stroke="#f39c12" 
              fillOpacity={1} 
              fill="url(#colorRate)" 
              name={t('reports.savings_rate')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SavingsRateChart;

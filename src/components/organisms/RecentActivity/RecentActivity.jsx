import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import './RecentActivity.css';

const RecentActivity = ({ transactions = [] }) => {
  const { t } = useTranslation();
  const { currency } = useSelector(selectTransactionPreferences);
  
  return (
    <section className="recent-activity">
      <h2>{t('dashboard.recent_activity')}</h2>
      {transactions.length === 0 ? (
        <div className="placeholder-message">
          <p>{t('dashboard.no_transactions')}</p>
        </div>
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-info">
                <span className="transaction-description">{transaction.description}</span>
                <span className="transaction-date">{transaction.date}</span>
              </div>
              <span className="transaction-amount">
                {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount, currency)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentActivity;

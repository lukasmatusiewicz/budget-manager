import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TransactionForm from '../../components/organisms/TransactionForm/TransactionForm.jsx';
import TransactionItem from '../../components/molecules/TransactionItem/TransactionItem.jsx';
import { selectTransactions } from '../../store/slices/transactionSlice.js';
import './Transactions.css';

const Transactions = () => {
  const { t } = useTranslation();
  const transactions = useSelector(selectTransactions);
  
  return (
    <div className="view-container">
      <h2>{t('transactions.title')}</h2>
      
      <TransactionForm />

      <div className="transactions-list-container">
        <h3>{t('transactions.history')}</h3>
        {transactions.length === 0 ? (
          <div className="placeholder-message">
            <p>{t('transactions.no_history')}</p>
          </div>
        ) : (
          <ul className="transactions-list">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transactions;

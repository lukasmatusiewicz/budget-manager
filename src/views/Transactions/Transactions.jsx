import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TransactionForm from '../../components/organisms/TransactionForm/TransactionForm.jsx';
import TransactionItem from '../../components/molecules/TransactionItem/TransactionItem.jsx';
import Button from '../../components/atoms/Button/Button.jsx';
import { selectTransactions } from '../../store/slices/transactionSlice.js';
import { exportTransactionsToCSV, exportTransactionsToJSON } from '../../utils/exportUtils.js';
import './Transactions.css';

const Transactions = () => {
  const { t } = useTranslation();
  const transactions = useSelector(selectTransactions);
  
  return (
    <div className="view-container">
      <h2>{t('transactions.title')}</h2>
      
      <TransactionForm />

      <div className="transactions-list-container">
        <div className="transactions-header">
          <h3>{t('transactions.history')}</h3>
          <div className="export-controls">
            <Button 
              variant="outline" 
              onClick={() => exportTransactionsToCSV(transactions)}
              className="export-btn"
            >
              {t('transactions.export_csv')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => exportTransactionsToJSON(transactions)}
              className="export-btn"
            >
              {t('transactions.export_json')}
            </Button>
          </div>
        </div>
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

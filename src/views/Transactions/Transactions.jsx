import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import TransactionForm from '../../components/organisms/TransactionForm/TransactionForm.jsx';
import TransactionFilters from '../../components/organisms/TransactionFilters/TransactionFilters.jsx';
import TransactionItem from '../../components/molecules/TransactionItem/TransactionItem.jsx';
import Button from '../../components/atoms/Button/Button.jsx';
import { selectTransactions } from '../../store/slices/transactionSlice.js';
import { exportTransactionsToCSV, exportTransactionsToJSON } from '../../utils/exportUtils.js';
import './Transactions.css';

const Transactions = () => {
  const { t } = useTranslation();
  const transactions = useSelector(selectTransactions);

  const [filters, setFilters] = useState({
    search: '',
    dateStart: '',
    dateEnd: '',
    minAmount: '',
    maxAmount: '',
    categories: []
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      dateStart: '',
      dateEnd: '',
      minAmount: '',
      maxAmount: '',
      categories: []
    });
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(item => {
      // Search filter
      if (filters.search && !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Date range filter
      if (filters.dateStart && item.date < filters.dateStart) {
        return false;
      }
      if (filters.dateEnd && item.date > filters.dateEnd) {
        return false;
      }

      // Amount range filter
      if (filters.minAmount && item.amount < parseFloat(filters.minAmount)) {
        return false;
      }
      if (filters.maxAmount && item.amount > parseFloat(filters.maxAmount)) {
        return false;
      }

      // Category multi-select filter
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);
  
  return (
    <div className="view-container">
      <h2>{t('transactions.title')}</h2>
      
      <TransactionForm />

      <div className="transactions-list-container">
        <TransactionFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <div className="transactions-header">
          <h3>{t('transactions.history')}</h3>
          <div className="export-controls">
            <Button 
              variant="outline" 
              onClick={() => exportTransactionsToCSV(filteredTransactions)}
              className="export-btn"
            >
              {t('transactions.export_csv')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => exportTransactionsToJSON(filteredTransactions)}
              className="export-btn"
            >
              {t('transactions.export_json')}
            </Button>
          </div>
        </div>
        {filteredTransactions.length === 0 ? (
          <div className="placeholder-message">
            <p>{t('transactions.no_history')}</p>
          </div>
        ) : (
          <ul className="transactions-list">
            {filteredTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transactions;

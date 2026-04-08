import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { updateTransactionCategory, updateTransactionDate, removeTransaction, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../../constants/categories.js';
import Button from '../../atoms/Button/Button.jsx';
import Icon from '../../atoms/Icon/Icon.jsx';
import './TransactionItem.css';

const TransactionItem = ({ transaction }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currency } = useSelector(selectTransactionPreferences);
  const categories = transaction.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleCategoryChange = (e) => {
    dispatch(updateTransactionCategory({
      id: transaction.id,
      category: e.target.value
    }));
  };

  const handleDateChange = (e) => {
    dispatch(updateTransactionDate({
      id: transaction.id,
      date: e.target.value
    }));
  };

  const handleRemove = () => {
    dispatch(removeTransaction(transaction.id));
  };

  return (
    <li className={`transaction-item ${transaction.type}`}>
      <div className="transaction-main">
        <div className="transaction-info">
          <span className="transaction-description">{transaction.description}</span>
          <input 
            type="date" 
            value={transaction.date} 
            onChange={handleDateChange}
            className="mini-date-input"
          />
        </div>
        <div className="transaction-category-edit">
          <select 
            value={transaction.category} 
            onChange={handleCategoryChange}
            className="mini-category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{t(`categories.${cat}`)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="transaction-right">
        <span className="transaction-amount">
          {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount, currency)}
        </span>
        <Button variant="text" onClick={handleRemove} className="remove-btn">
          <Icon name="trash-icon" className="remove-icon" />
        </Button>
      </div>
    </li>
  );
};

export default TransactionItem;

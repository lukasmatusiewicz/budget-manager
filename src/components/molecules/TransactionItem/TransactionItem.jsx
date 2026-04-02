import { useDispatch } from 'react-redux';
import { updateTransactionCategory } from '../../../store/slices/transactionSlice.js';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../../constants/categories.js';
import './TransactionItem.css';

const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const categories = transaction.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleCategoryChange = (e) => {
    dispatch(updateTransactionCategory({
      id: transaction.id,
      category: e.target.value
    }));
  };

  return (
    <li className={`transaction-item ${transaction.type}`}>
      <div className="transaction-main">
        <div className="transaction-info">
          <span className="transaction-description">{transaction.description}</span>
          <span className="transaction-date">{transaction.date}</span>
        </div>
        <div className="transaction-category-edit">
          <select 
            value={transaction.category} 
            onChange={handleCategoryChange}
            className="mini-category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <span className="transaction-amount">
        {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
      </span>
    </li>
  );
};

export default TransactionItem;

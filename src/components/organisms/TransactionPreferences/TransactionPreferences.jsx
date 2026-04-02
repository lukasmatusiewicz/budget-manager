import { useSelector, useDispatch } from 'react-redux';
import { selectTransactionPreferences, setPreferences } from '../../../store/slices/transactionSlice.js';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../../constants/categories.js';
import TypeSelector from '../../molecules/TypeSelector/TypeSelector.jsx';
import './TransactionPreferences.css';

const TransactionPreferences = () => {
  const preferences = useSelector(selectTransactionPreferences);
  const dispatch = useDispatch();

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const defaultCategory = newType === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0];
    dispatch(setPreferences({ defaultType: newType, defaultCategory }));
  };

  const handleCategoryChange = (e) => {
    dispatch(setPreferences({ defaultCategory: e.target.value }));
  };

  const categories = preferences.defaultType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="transaction-preferences">
      <h3>Transaction Preferences</h3>
      <p className="settings-description">Set default values for new transactions.</p>
      
      <div className="preferences-form">
        <div className="pref-group">
          <TypeSelector 
            value={preferences.defaultType} 
            onChange={handleTypeChange} 
          />
        </div>

        <div className="pref-group">
          <label className="pref-label">Default Category</label>
          <select 
            value={preferences.defaultCategory} 
            onChange={handleCategoryChange}
            className="pref-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionPreferences;

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectTransactionPreferences, setPreferences } from '../../../store/slices/transactionSlice.js';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../../constants/categories.js';
import TypeSelector from '../../molecules/TypeSelector/TypeSelector.jsx';
import './TransactionPreferences.css';

const TransactionPreferences = () => {
  const { t } = useTranslation();
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
      <h3>{t('settings.preferences')}</h3>
      <p className="settings-description">{t('settings.preferences_desc')}</p>
      
      <div className="preferences-form">
        <div className="pref-group">
          <TypeSelector 
            value={preferences.defaultType} 
            onChange={handleTypeChange} 
          />
        </div>

        <div className="pref-group">
          <label className="pref-label">{t('settings.default_category')}</label>
          <select 
            value={preferences.defaultCategory} 
            onChange={handleCategoryChange}
            className="pref-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{t(`categories.${cat}`)}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionPreferences;

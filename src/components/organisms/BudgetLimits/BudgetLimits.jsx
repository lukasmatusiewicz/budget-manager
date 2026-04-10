import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectBudgetLimits, setBudgetLimit, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { EXPENSE_CATEGORIES } from '../../../constants/categories.js';
import './BudgetLimits.css';

const BudgetLimits = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const limits = useSelector(selectBudgetLimits);
  const { currency } = useSelector(selectTransactionPreferences);

  const handleLimitChange = (category, value) => {
    const limit = parseFloat(value) || 0;
    dispatch(setBudgetLimit({ category, limit }));
  };

  const categoriesToTrack = ['Food', 'Transport', 'Entertainment', 'Shopping'];

  return (
    <div className="budget-limits">
      <h3>{t('settings.budget_limits')}</h3>
      <p className="settings-description">{t('settings.budget_limits_desc')}</p>
      
      <div className="limits-grid">
        {categoriesToTrack.map(cat => (
          <div key={cat} className="limit-item">
            <label className="limit-label">{t(`categories.${cat}`)}</label>
            <div className="limit-input-wrapper">
              <span className="limit-currency">{currency === 'USD' ? '$' : currency}</span>
              <input
                type="number"
                className="limit-input"
                value={limits[cat] || ''}
                onChange={(e) => handleLimitChange(cat, e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetLimits;

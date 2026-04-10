import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  selectRecurringItems, 
  setRecurringItems, 
  addSubscription, 
  removeSubscription,
  selectTransactionPreferences 
} from '../../../store/slices/transactionSlice.js';
import { getCurrencySymbol } from '../../../utils/formatters.js';
import './RecurringSettings.css';

const RecurringSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const recurring = useSelector(selectRecurringItems);
  const { currency } = useSelector(selectTransactionPreferences);
  const currencySymbol = getCurrencySymbol(currency);

  const [newSub, setNewSub] = useState({ name: '', amount: '', frequency: 'monthly' });

  const handleMonthlyChange = (field, value) => {
    dispatch(setRecurringItems({ [field]: parseFloat(value) || 0 }));
  };

  const handleAddSub = () => {
    if (!newSub.name || !newSub.amount) return;
    dispatch(addSubscription({
      ...newSub,
      id: Date.now(),
      amount: parseFloat(newSub.amount)
    }));
    setNewSub({ name: '', amount: '', frequency: 'monthly' });
  };

  return (
    <div className="recurring-settings">
      <h3>{t('settings.recurring_items')}</h3>
      <p className="settings-description">{t('settings.recurring_desc')}</p>

      <div className="recurring-grid">
        <div className="recurring-field">
          <label className="limit-label">{t('settings.monthly_salary')}</label>
          <div className="limit-input-wrapper">
            <span className="limit-currency">{currencySymbol}</span>
            <input
              type="number"
              className="limit-input"
              value={recurring.salary || ''}
              onChange={(e) => handleMonthlyChange('salary', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="recurring-field">
          <label className="limit-label">{t('settings.monthly_rent')}</label>
          <div className="limit-input-wrapper">
            <span className="limit-currency">{currencySymbol}</span>
            <input
              type="number"
              className="limit-input"
              value={recurring.rent || ''}
              onChange={(e) => handleMonthlyChange('rent', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="subscriptions-section">
        <h4>{t('settings.subscriptions')}</h4>
        <div className="subscription-form">
          <input
            type="text"
            placeholder={t('settings.sub_name')}
            value={newSub.name}
            onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
          />
          <input
            type="number"
            placeholder={t('common.amount')}
            value={newSub.amount}
            onChange={(e) => setNewSub({ ...newSub, amount: e.target.value })}
          />
          <select
            value={newSub.frequency}
            onChange={(e) => setNewSub({ ...newSub, frequency: e.target.value })}
          >
            <option value="weekly">{t('settings.weekly')}</option>
            <option value="monthly">{t('settings.monthly')}</option>
          </select>
          <button className="add-sub-btn" onClick={handleAddSub}>{t('common.save')}</button>
        </div>

        <div className="subscription-list">
          {recurring.subscriptions.map(sub => (
            <div key={sub.id} className="subscription-item">
              <div className="subscription-info">
                <span className="subscription-name">{sub.name}</span>
                <span className="subscription-frequency">{t(`settings.${sub.frequency}`)}</span>
                <span className="subscription-cost">-{currencySymbol}{sub.amount.toFixed(2)}</span>
              </div>
              <button 
                className="remove-sub"
                onClick={() => dispatch(removeSubscription(sub.id))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecurringSettings;

import { useTranslation } from 'react-i18next';
import './TypeSelector.css';

const TypeSelector = ({ value, onChange }) => {
  const { t } = useTranslation();
  
  return (
    <div className="type-selector">
      <label className="selector-label">{t('common.type')}</label>
      <div className="radio-group">
        <label className={`radio-option ${value === 'expense' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={value === 'expense'}
            onChange={onChange}
          />
          {t('common.expense')}
        </label>
        <label className={`radio-option ${value === 'income' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="type"
            value="income"
            checked={value === 'income'}
            onChange={onChange}
          />
          {t('common.income')}
        </label>
      </div>
    </div>
  );
};

export default TypeSelector;

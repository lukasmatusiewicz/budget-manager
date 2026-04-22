import { useTranslation } from 'react-i18next';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../../constants/categories.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import Button from '../../atoms/Button/Button.jsx';
import './TransactionFilters.css';

const ALL_CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])];

const TransactionFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange('categories', newCategories);
  };

  return (
    <div className="transaction-filters">
      <div className="filters-row">
        <div className="filter-group search-filter">
          <FormField
            label={t('common.description')}
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder={t('transactions.filters.search')}
          />
        </div>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <FormField
            label={t('transactions.filters.date_start')}
            type="date"
            name="dateStart"
            value={filters.dateStart}
            onChange={handleChange}
          />
        </div>
        <div className="filter-group">
          <FormField
            label={t('transactions.filters.date_end')}
            type="date"
            name="dateEnd"
            value={filters.dateEnd}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <FormField
            label={t('transactions.filters.min_amount')}
            type="number"
            name="minAmount"
            value={filters.minAmount}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        <div className="filter-group">
          <FormField
            label={t('transactions.filters.max_amount')}
            type="number"
            name="maxAmount"
            value={filters.maxAmount}
            onChange={handleChange}
            placeholder="∞"
          />
        </div>
      </div>

      <div className="filters-row categories-filter">
        <label>{t('common.category')}</label>
        <div className="categories-grid">
          {ALL_CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              className={`category-chip ${filters.categories.includes(category) ? 'active' : ''}`}
              onClick={() => handleCategoryToggle(category)}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-actions">
        <Button variant="text" onClick={onClearFilters}>
          {t('transactions.filters.clear')}
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilters;

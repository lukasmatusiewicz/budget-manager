import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectBudgetLimits, selectMonthlyCategorySpending, selectTransactionPreferences } from '../../../store/slices/transactionSlice.js';
import { formatCurrency } from '../../../utils/formatters.js';
import './BudgetWarnings.css';

const BudgetWarnings = () => {
  const { t } = useTranslation();
  const limits = useSelector(selectBudgetLimits);
  const spending = useSelector(selectMonthlyCategorySpending);
  const { currency } = useSelector(selectTransactionPreferences);

  const warnings = Object.keys(limits)
    .filter(cat => limits[cat] > 0)
    .map(cat => {
      const limit = limits[cat];
      const spent = spending[cat] || 0;
      const percentage = (spent / limit) * 100;

      if (percentage >= 100) {
        return {
          category: cat,
          type: 'exceeded',
          spent,
          limit,
          percentage
        };
      } else if (percentage >= 80) {
        return {
          category: cat,
          type: 'near',
          spent,
          limit,
          percentage
        };
      }
      return null;
    })
    .filter(warning => warning !== null);

  if (warnings.length === 0) return null;

  return (
    <div className="budget-warnings">
      {warnings.map(warning => (
        <div key={warning.category} className={`warning-card ${warning.type}`}>
          <div className="warning-icon">
            {warning.type === 'exceeded' ? '⚠️' : 'ℹ️'}
          </div>
          <div className="warning-content">
            <p className="warning-text">
              {warning.type === 'exceeded' 
                ? t('dashboard.budget_exceeded', { category: t(`categories.${warning.category}`) }) 
                : t('dashboard.budget_near', { category: t(`categories.${warning.category}`) })}
            </p>
            <p className="warning-details">
              {formatCurrency(warning.spent, currency)} / {formatCurrency(warning.limit, currency)} ({Math.round(warning.percentage)}%)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetWarnings;

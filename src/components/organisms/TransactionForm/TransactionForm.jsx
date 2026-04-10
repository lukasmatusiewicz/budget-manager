import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addTransaction, selectTransactionPreferences, selectBudgetLimits, selectMonthlyCategorySpending } from '../../../store/slices/transactionSlice.js';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../../constants/categories.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import TypeSelector from '../../molecules/TypeSelector/TypeSelector.jsx';
import Button from '../../atoms/Button/Button.jsx';
import './TransactionForm.css';

const TransactionForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const preferences = useSelector(selectTransactionPreferences);
  const budgetLimits = useSelector(selectBudgetLimits);
  const currentSpending = useSelector(selectMonthlyCategorySpending);

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: preferences.defaultType,
    category: preferences.defaultCategory
  });

  const [budgetWarning, setBudgetWarning] = useState('');

  // Update form if preferences change (e.g. from settings)
  useEffect(() => {
    if (formData.description === '' && formData.amount === '') {
      setFormData(prev => ({
        ...prev,
        type: preferences.defaultType,
        category: preferences.defaultCategory
      }));
    }
  }, [preferences, formData.description, formData.amount]);

  // Check for budget limit when amount or category changes
  useEffect(() => {
    if (formData.type === 'expense' && formData.amount && formData.category) {
      const limit = budgetLimits[formData.category];
      if (limit > 0) {
        const spent = currentSpending[formData.category] || 0;
        const newAmount = parseFloat(formData.amount) || 0;
        if (spent + newAmount > limit) {
          setBudgetWarning(t('transactions.budget_warning_form', { category: t(`categories.${formData.category}`) }));
        } else {
          setBudgetWarning('');
        }
      } else {
        setBudgetWarning('');
      }
    } else {
      setBudgetWarning('');
    }
  }, [formData.amount, formData.category, formData.type, budgetLimits, currentSpending, t]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      date: new Date().toISOString().split('T')[0]
    };

    dispatch(addTransaction(newTransaction));

    setFormData({
      description: '',
      amount: '',
      type: preferences.defaultType,
      category: preferences.defaultCategory
    });
    setBudgetWarning('');
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
      const newCategories = value === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        category: newCategories[0] // Reset category when type changes
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const categories = formData.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="transaction-form-container">
      <h3>{t('transactions.add_new')}</h3>
      <form onSubmit={handleSubmit} className="transaction-form">
        <FormField 
          label={t('common.description')}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={t('transactions.description_placeholder')}
          required
        />
        
        <div className="form-row">
          <FormField 
            label={t('common.amount')}
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            required
            step="0.01"
          />
          <TypeSelector 
            value={formData.type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>{t('common.category')}</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{t(`categories.${cat}`)}</option>
            ))}
          </select>
        </div>

        {budgetWarning && (
          <div className="form-budget-warning">
            {budgetWarning}
          </div>
        )}
        
        <Button type="submit" variant="primary" className="add-button">{t('transactions.add_button')}</Button>
      </form>
    </div>
  );
};

export default TransactionForm;

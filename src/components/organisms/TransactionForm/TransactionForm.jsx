import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../../store/slices/transactionSlice.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import TypeSelector from '../../molecules/TypeSelector/TypeSelector.jsx';
import './TransactionForm.css';

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Other'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      date: new Date().toLocaleDateString()
    };

    dispatch(addTransaction(newTransaction));

    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: 'Other'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="transaction-form-container">
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit} className="transaction-form">
        <FormField 
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What was it for?"
          required
        />
        
        <div className="form-row">
          <FormField 
            label="Amount"
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
        
        <button type="submit" className="add-button">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;

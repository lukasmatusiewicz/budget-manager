import { useState } from 'react';
import { useTransactions } from '../../../context/TransactionContext/TransactionContext.jsx';
import './TransactionForm.css';

const TransactionForm = () => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Other'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      date: new Date().toLocaleDateString()
    });

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
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was it for?"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>
        <button type="submit" className="add-button">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInitialBudget } from '../../store/slices/transactionSlice.js';
import FormField from '../../components/molecules/FormField/FormField.jsx';
import Button from '../../components/atoms/Button/Button.jsx';
import './Setup.css';

const Setup = () => {
  const [budget, setBudget] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetValue = parseFloat(budget);
    if (!isNaN(budgetValue)) {
      dispatch(setInitialBudget(budgetValue));
      navigate('/');
    }
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <h2>Welcome to Budget Manager!</h2>
        <p className="setup-description">
          To get started, please enter your current account balance. 
          This will be the starting point for your budget tracking.
        </p>
        <form onSubmit={handleSubmit} className="setup-form">
          <FormField
            label="Initial Balance"
            type="number"
            name="initialBudget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="0.00"
            step="0.01"
            required
          />
          <Button type="submit" variant="primary">Start Budgeting</Button>
        </form>
      </div>
    </div>
  );
};

export default Setup;

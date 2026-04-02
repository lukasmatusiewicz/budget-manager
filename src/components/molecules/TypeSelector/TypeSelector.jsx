import './TypeSelector.css';

const TypeSelector = ({ value, onChange }) => {
  return (
    <div className="type-selector">
      <label className="selector-label">Type</label>
      <div className="radio-group">
        <label className={`radio-option ${value === 'expense' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={value === 'expense'}
            onChange={onChange}
          />
          Expense
        </label>
        <label className={`radio-option ${value === 'income' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="type"
            value="income"
            checked={value === 'income'}
            onChange={onChange}
          />
          Income
        </label>
      </div>
    </div>
  );
};

export default TypeSelector;

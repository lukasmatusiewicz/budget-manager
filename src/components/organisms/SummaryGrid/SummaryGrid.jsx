import SummaryCard from '../../molecules/SummaryCard/SummaryCard.jsx';
import './SummaryGrid.css';

const SummaryGrid = ({ balance, income, expenses }) => {
  return (
    <section className="summary-cards">
      <SummaryCard 
        title="Total Balance" 
        amount={balance} 
        iconName="wallet-icon" 
        type="balance" 
      />
      <SummaryCard 
        title="Income" 
        amount={income} 
        iconName="income-icon" 
        type="income" 
      />
      <SummaryCard 
        title="Expenses" 
        amount={expenses} 
        iconName="expense-icon" 
        type="expenses" 
      />
    </section>
  );
};

export default SummaryGrid;

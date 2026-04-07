import { useTranslation } from 'react-i18next';
import SummaryCard from '../../molecules/SummaryCard/SummaryCard.jsx';
import './SummaryGrid.css';

const SummaryGrid = ({ balance, income, expenses }) => {
  const { t } = useTranslation();
  
  return (
    <section className="summary-cards">
      <SummaryCard 
        title={t('dashboard.total_balance')} 
        amount={balance} 
        iconName="wallet-icon" 
        type="balance" 
      />
      <SummaryCard 
        title={t('common.income')} 
        amount={income} 
        iconName="income-icon" 
        type="income" 
      />
      <SummaryCard 
        title={t('common.expenses')} 
        amount={expenses} 
        iconName="expense-icon" 
        type="expenses" 
      />
    </section>
  );
};

export default SummaryGrid;

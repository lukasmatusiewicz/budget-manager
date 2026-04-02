import CategoryStructure from '../../components/organisms/CategoryStructure/CategoryStructure.jsx';
import DailyStats from '../../components/organisms/DailyStats/DailyStats.jsx';
import './Reports.css';

const Reports = () => {
  return (
    <div className="view-container">
      <h2>Financial Reports</h2>
      <div className="reports-dashboard">
        <DailyStats />
        <CategoryStructure type="expense" title="Expenses Structure" />
        <CategoryStructure type="income" title="Incomes Structure" />
      </div>
    </div>
  );
};

export default Reports;

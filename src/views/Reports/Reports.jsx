import ExpenseStructure from '../../components/organisms/ExpenseStructure/ExpenseStructure.jsx';
import './Reports.css';

const Reports = () => {
  return (
    <div className="view-container">
      <h2>Financial Reports</h2>
      <div className="reports-dashboard">
        <ExpenseStructure />
        <div className="placeholder-message">
          <p>More detailed reports coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;

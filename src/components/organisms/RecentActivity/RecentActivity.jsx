import './RecentActivity.css';

const RecentActivity = ({ transactions = [] }) => {
  return (
    <section className="recent-activity">
      <h2>Recent Activity</h2>
      {transactions.length === 0 ? (
        <div className="placeholder-message">
          <p>No recent transactions to show.</p>
        </div>
      ) : (
        <ul className="transaction-list">
          {/* Transaction items will go here */}
        </ul>
      )}
    </section>
  );
};

export default RecentActivity;

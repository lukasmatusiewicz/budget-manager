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
          {transactions.map((transaction) => (
            <li key={transaction.id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-info">
                <span className="transaction-description">{transaction.description}</span>
                <span className="transaction-date">{transaction.date}</span>
              </div>
              <span className="transaction-amount">
                {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentActivity;

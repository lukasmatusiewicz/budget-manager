import TransactionForm from '../../components/organisms/TransactionForm/TransactionForm';
import { useTransactions } from '../../context/TransactionContext/TransactionContext.jsx';
import './Transactions.css';

const Transactions = () => {
  const { transactions } = useTransactions();
  
  return (
    <div className="view-container">
      <h2>Transactions</h2>
      
      <TransactionForm />

      <div className="transactions-list-container">
        <h3>Transaction History</h3>
        {transactions.length === 0 ? (
          <div className="placeholder-message">
            <p>Your transaction history will appear here.</p>
          </div>
        ) : (
          <ul className="transactions-list">
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
      </div>
    </div>
  );
};

export default Transactions;

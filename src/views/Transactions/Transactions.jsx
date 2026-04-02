import { useSelector } from 'react-redux';
import TransactionForm from '../../components/organisms/TransactionForm/TransactionForm.jsx';
import TransactionItem from '../../components/molecules/TransactionItem/TransactionItem.jsx';
import { selectTransactions } from '../../store/slices/transactionSlice.js';
import './Transactions.css';

const Transactions = () => {
  const transactions = useSelector(selectTransactions);
  
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
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transactions;

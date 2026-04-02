import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const totals = transactions.reduce((acc, current) => {
    if (current.type === 'income') {
      acc.income += current.amount;
    } else {
      acc.expenses += current.amount;
    }
    return acc;
  }, { income: 0, expenses: 0 });

  const value = {
    transactions,
    addTransaction,
    totals,
    balance: totals.income - totals.expenses
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

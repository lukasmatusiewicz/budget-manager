import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearTransactions } from '../../../store/slices/transactionSlice.js';
import Button from '../../atoms/Button/Button.jsx';
import Modal from '../../atoms/Modal/Modal.jsx';
import './DangerZone.css';

const DangerZone = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClearHistory = () => {
    dispatch(clearTransactions());
    setIsModalOpen(false);
  };

  return (
    <div className="danger-zone">
      <h3>Danger Zone</h3>
      <p className="settings-description">Permanent actions that cannot be undone.</p>
      
      <div className="danger-action">
        <div className="action-info">
          <h4>Clear Transaction History</h4>
          <p>Remove all income and expense entries from your account.</p>
        </div>
        <Button variant="outline" onClick={() => setIsModalOpen(true)} className="danger-btn">
          Clear History
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleClearHistory}
        title="Are you absolutely sure?"
        message="This will permanently delete all your transaction data. This action cannot be reversed."
        confirmText="Yes, delete everything"
        variant="primary" // You could add a 'danger' variant later
      />
    </div>
  );
};

export default DangerZone;

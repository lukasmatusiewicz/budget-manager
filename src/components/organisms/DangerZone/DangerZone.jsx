import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearTransactions } from '../../../store/slices/transactionSlice.js';
import Button from '../../atoms/Button/Button.jsx';
import Modal from '../../atoms/Modal/Modal.jsx';
import './DangerZone.css';

const DangerZone = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClearHistory = () => {
    dispatch(clearTransactions());
    setIsModalOpen(false);
  };

  return (
    <div className="danger-zone">
      <h3>{t('settings.danger_zone')}</h3>
      <p className="settings-description">{t('settings.danger_zone_desc')}</p>
      
      <div className="danger-action">
        <div className="action-info">
          <h4>{t('settings.clear_history')}</h4>
          <p>{t('settings.clear_history_desc')}</p>
        </div>
        <Button variant="outline" onClick={() => setIsModalOpen(true)} className="danger-btn">
          {t('settings.clear_button')}
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleClearHistory}
        title={t('settings.modal_title')}
        message={t('settings.modal_message')}
        confirmText={t('settings.modal_confirm')}
        variant="primary" // You could add a 'danger' variant later
      />
    </div>
  );
};

export default DangerZone;

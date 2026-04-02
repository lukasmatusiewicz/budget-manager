import ThemeSettings from '../../components/organisms/ThemeSettings/ThemeSettings.jsx';
import TransactionPreferences from '../../components/organisms/TransactionPreferences/TransactionPreferences.jsx';
import DangerZone from '../../components/organisms/DangerZone/DangerZone.jsx';

const Settings = () => {
  return (
    <div className="view-container">
      <h2>Settings</h2>
      <ThemeSettings />
      <TransactionPreferences />
      <DangerZone />
    </div>
  );
};

export default Settings;

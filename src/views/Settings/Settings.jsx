import ThemeSettings from '../../components/organisms/ThemeSettings/ThemeSettings.jsx';
import TransactionPreferences from '../../components/organisms/TransactionPreferences/TransactionPreferences.jsx';
import ProfileSettings from '../../components/organisms/ProfileSettings/ProfileSettings.jsx';
import AccessibilitySettings from '../../components/organisms/AccessibilitySettings/AccessibilitySettings.jsx';
import DangerZone from '../../components/organisms/DangerZone/DangerZone.jsx';

const Settings = () => {
  return (
    <div className="view-container">
      <h2>Settings</h2>
      <ProfileSettings />
      <ThemeSettings />
      <AccessibilitySettings />
      <TransactionPreferences />
      <DangerZone />
    </div>
  );
};

export default Settings;

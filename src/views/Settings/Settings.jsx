import ThemeSettings from '../../components/organisms/ThemeSettings/ThemeSettings.jsx';
import DangerZone from '../../components/organisms/DangerZone/DangerZone.jsx';

const Settings = () => {
  return (
    <div className="view-container">
      <h2>Settings</h2>
      <ThemeSettings />
      <DangerZone />
    </div>
  );
};

export default Settings;

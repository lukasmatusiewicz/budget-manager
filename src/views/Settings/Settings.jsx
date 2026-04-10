import ThemeSettings from '../../components/organisms/ThemeSettings/ThemeSettings.jsx';
import TransactionPreferences from '../../components/organisms/TransactionPreferences/TransactionPreferences.jsx';
import ProfileSettings from '../../components/organisms/ProfileSettings/ProfileSettings.jsx';
import AccessibilitySettings from '../../components/organisms/AccessibilitySettings/AccessibilitySettings.jsx';
import DangerZone from '../../components/organisms/DangerZone/DangerZone.jsx';
import LanguageSettings from '../../components/organisms/LanguageSettings/LanguageSettings.jsx';
import BudgetLimits from '../../components/organisms/BudgetLimits/BudgetLimits.jsx';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  
  return (
    <div className="view-container">
      <h2>{t('settings.title')}</h2>
      <ProfileSettings />
      <ThemeSettings />
      <LanguageSettings />
      <TransactionPreferences />
      <BudgetLimits />
      <AccessibilitySettings />
      <DangerZone />
    </div>
  );
};

export default Settings;

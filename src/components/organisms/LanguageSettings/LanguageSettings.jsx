import { useTranslation } from 'react-i18next';
import './LanguageSettings.css';

const LanguageSettings = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pl', name: 'Polski' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <section className="settings-section language-settings">
      <h3>{t('settings.language')}</h3>
      <div className="language-options">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-btn ${i18n.language.startsWith(lang.code) ? 'active' : ''}`}
            onClick={() => changeLanguage(lang.code)}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default LanguageSettings;

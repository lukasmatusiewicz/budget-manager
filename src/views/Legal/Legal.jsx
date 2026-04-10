import { useTranslation } from 'react-i18next';
import './Legal.css';

const Legal = () => {
  const { t } = useTranslation();

  return (
    <div className="legal-container">
      <section id="impressum" className="legal-section">
        <h1>{t('legal.impressum_title')}</h1>
        <p><strong>{t('legal.name')}:</strong> Lukas Matusiewicz</p>
        <p><strong>{t('legal.email')}:</strong> <a href="mailto:matusiewiczlukas@gmail.com">matusiewiczlukas@gmail.com</a></p>
        <p>{t('legal.impressum_disclaimer')}</p>
      </section>

      <section id="agb" className="legal-section">
        <h1>{t('legal.agb_title')}</h1>
        <h2>1. {t('legal.agb_scope_title')}</h2>
        <p>{t('legal.agb_scope_text')}</p>
        
        <h2>2. {t('legal.agb_usage_title')}</h2>
        <p>{t('legal.agb_usage_text')}</p>
        
        <h2>3. {t('legal.agb_liability_title')}</h2>
        <p>{t('legal.agb_liability_text')}</p>
        
        <h2>4. {t('legal.agb_privacy_title')}</h2>
        <p>{t('legal.agb_privacy_text')}</p>
        
        <h2>5. {t('legal.agb_changes_title')}</h2>
        <p>{t('legal.agb_changes_text')}</p>
      </section>
    </div>
  );
};

export default Legal;

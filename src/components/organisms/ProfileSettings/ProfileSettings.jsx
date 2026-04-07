import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectUser, updateProfile, updatePassword } from '../../../store/slices/authSlice.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import Button from '../../atoms/Button/Button.jsx';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    username: user?.displayName || '',
    email: user?.email || ''
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    alert(t('settings.update_profile_success') || 'Profile updated!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    dispatch(updatePassword(passwords.newPassword));
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert(t('settings.update_password_success') || 'Password updated!');
  };

  return (
    <div className="profile-settings">
      <section className="settings-section">
        <h3>{t('settings.profile')}</h3>
        <p className="settings-description">{t('settings.profile_desc')}</p>
        <form onSubmit={handleUpdateProfile} className="settings-form">
          <FormField
            label={t('auth.username')}
            name="username"
            value={profileData.username}
            onChange={handleProfileChange}
            placeholder="Your username"
            required
          />
          <FormField
            label={t('auth.email')}
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            placeholder="your@email.com"
            required
          />
          <Button type="submit" variant="primary">{t('settings.update_profile')}</Button>
        </form>
      </section>

      <section className="settings-section password-section">
        <h3>{t('settings.security')}</h3>
        <p className="settings-description">{t('settings.security_desc')}</p>
        <form onSubmit={handleUpdatePassword} className="settings-form">
          <FormField
            label={t('settings.current_password')}
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            required
          />
          <div className="form-row">
            <FormField
              label={t('settings.new_password')}
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />
            <FormField
              label={t('settings.confirm_password')}
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" variant="outline">{t('settings.update_password')}</Button>
        </form>
      </section>
    </div>
  );
};

export default ProfileSettings;

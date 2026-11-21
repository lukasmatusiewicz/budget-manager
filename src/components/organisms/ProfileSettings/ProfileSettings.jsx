import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  updateProfile as firebaseUpdateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword
} from 'firebase/auth';
import { auth } from '../../../config/firebase.js';
import { selectUser, updateProfile } from '../../../store/slices/authSlice.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import Button from '../../atoms/Button/Button.jsx';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user?.displayName || '');
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileStatus, setProfileStatus] = useState(null);
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileStatus(null);

    if (!auth.currentUser) {
      setProfileStatus({ type: 'error', message: t('settings.update_profile_error') });
      return;
    }

    const trimmedUsername = username.trim();
    setIsUpdatingProfile(true);
    try {
      await firebaseUpdateProfile(auth.currentUser, { displayName: trimmedUsername });
      dispatch(updateProfile({ displayName: trimmedUsername }));
      setProfileStatus({ type: 'success', message: t('settings.update_profile_success') });
    } catch {
      setProfileStatus({ type: 'error', message: t('settings.update_profile_error') });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordStatus({ type: 'error', message: t('settings.passwords_mismatch') });
      return;
    }

    if (!auth.currentUser || !auth.currentUser.email) {
      setPasswordStatus({ type: 'error', message: t('settings.update_password_error') });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        passwords.currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await firebaseUpdatePassword(auth.currentUser, passwords.newPassword);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordStatus({ type: 'success', message: t('settings.update_password_success') });
    } catch (error) {
      const code = error?.code;
      let message = t('settings.update_password_error');
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        message = t('settings.invalid_current_password');
      } else if (code === 'auth/weak-password') {
        message = t('settings.weak_password');
      }
      setPasswordStatus({ type: 'error', message });
    } finally {
      setIsUpdatingPassword(false);
    }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            required
          />
          <div>
            <FormField
              label={t('auth.email')}
              type="email"
              name="email"
              value={user?.email || ''}
              onChange={() => {}}
              placeholder="your@email.com"
              disabled
            />
            <p className="field-hint">{t('settings.email_readonly_hint')}</p>
          </div>
          {profileStatus && (
            <p
              className={`form-feedback ${profileStatus.type}`}
              role={profileStatus.type === 'error' ? 'alert' : 'status'}
            >
              {profileStatus.message}
            </p>
          )}
          <Button type="submit" variant="primary" disabled={isUpdatingProfile}>
            {isUpdatingProfile ? t('settings.updating') : t('settings.update_profile')}
          </Button>
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
          {passwordStatus && (
            <p
              className={`form-feedback ${passwordStatus.type}`}
              role={passwordStatus.type === 'error' ? 'alert' : 'status'}
            >
              {passwordStatus.message}
            </p>
          )}
          <Button type="submit" variant="outline" disabled={isUpdatingPassword}>
            {isUpdatingPassword ? t('settings.updating') : t('settings.update_password')}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default ProfileSettings;

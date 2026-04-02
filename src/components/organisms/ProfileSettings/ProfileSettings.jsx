import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateProfile, updatePassword } from '../../../store/slices/authSlice.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import Button from '../../atoms/Button/Button.jsx';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    username: user.username,
    email: user.email
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
    alert('Profile updated successfully!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    dispatch(updatePassword(passwords.newPassword));
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password updated successfully!');
  };

  return (
    <div className="profile-settings">
      <section className="settings-section">
        <h3>Profile Information</h3>
        <p className="settings-description">Update your account details and how others see you.</p>
        <form onSubmit={handleUpdateProfile} className="settings-form">
          <FormField
            label="Username"
            name="username"
            value={profileData.username}
            onChange={handleProfileChange}
            placeholder="Your username"
            required
          />
          <FormField
            label="Email Address"
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            placeholder="your@email.com"
            required
          />
          <Button type="submit" variant="primary">Update Profile</Button>
        </form>
      </section>

      <section className="settings-section password-section">
        <h3>Security</h3>
        <p className="settings-description">Manage your password to keep your account secure.</p>
        <form onSubmit={handleUpdatePassword} className="settings-form">
          <FormField
            label="Current Password"
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            required
          />
          <div className="form-row">
            <FormField
              label="New Password"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />
            <FormField
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" variant="outline">Update Password</Button>
        </form>
      </section>
    </div>
  );
};

export default ProfileSettings;

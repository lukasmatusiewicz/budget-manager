import { ref, onValue, set, get } from 'firebase/database';
import { db, auth } from '../config/firebase.js';

/**
 * Syncs a specific path in the Firebase database with a Redux action.
 * @param {string} path - The relative path in the database (e.g., 'transactions')
 * @param {Function} actionCreator - The Redux action to dispatch when data changes
 * @param {Function} dispatch - The Redux dispatch function
 */
export const syncFromFirebase = (path, actionCreator, dispatch) => {
  const user = auth.currentUser;
  if (!user) return null;

  const dbRef = ref(db, `users/${user.uid}/${path}`);
  
  // Listen for changes
  return onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
      dispatch(actionCreator(data));
    }
  });
};

/**
 * Saves data to a specific path in the Firebase database.
 * @param {string} path - The relative path in the database
 * @param {any} data - The data to save
 */
export const saveToFirebase = async (path, data) => {
  const user = auth.currentUser;
  if (!user) return;

  const dbRef = ref(db, `users/${user.uid}/${path}`);
  await set(dbRef, data);
};

/**
 * Fetches all user data from Firebase once.
 */
export const fetchAllUserData = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const dbRef = ref(db, `users/${user.uid}`);
  const snapshot = await get(dbRef);
  return snapshot.val();
};

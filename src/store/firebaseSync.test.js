import { describe, it, expect, vi, beforeEach } from 'vitest';
import { syncFromFirebase, saveToFirebase, fetchAllUserData } from './firebaseSync.js';
import { ref, onValue, set, get } from 'firebase/database';
import { auth } from '../config/firebase.js';

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  onValue: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
}));

vi.mock('../config/firebase.js', () => ({
  db: {},
  auth: {
    currentUser: { uid: 'user123' }
  }
}));

describe('firebaseSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('syncFromFirebase should set up listener if user is logged in', () => {
    const actionCreator = vi.fn();
    const dispatch = vi.fn();
    
    syncFromFirebase('test', actionCreator, dispatch);
    
    expect(ref).toHaveBeenCalled();
    expect(onValue).toHaveBeenCalled();
  });

  it('saveToFirebase should call set if user is logged in', async () => {
    await saveToFirebase('test', { data: 1 });
    expect(set).toHaveBeenCalled();
  });

  it('fetchAllUserData should call get if user is logged in', async () => {
    const mockSnapshot = { val: () => ({ theme: 'dark' }) };
    get.mockResolvedValue(mockSnapshot);
    
    const result = await fetchAllUserData();
    expect(get).toHaveBeenCalled();
    expect(result).toEqual({ theme: 'dark' });
  });

  it('functions should return null/void if no user', async () => {
    auth.currentUser = null;
    
    expect(syncFromFirebase('test', vi.fn(), vi.fn())).toBeNull();
    
    await saveToFirebase('test', {});
    expect(set).not.toHaveBeenCalled();
    
    const result = await fetchAllUserData();
    expect(result).toBeNull();
    
    // Restore user for other tests
    auth.currentUser = { uid: 'user123' };
  });
});

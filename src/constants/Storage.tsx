import {MMKV} from 'react-native-mmkv';

class Storage {
  private static encryptionKey: string;
  private static appStorageInstance: MMKV | null;
  private static userStorageInstance: MMKV | null;

  constructor(encryptionKey: any) {
    Storage.encryptionKey = encryptionKey;
    if (!Storage.appStorageInstance) {
      Storage.appStorageInstance = new MMKV({
        id: 'app-storage',
      });
    }
  }

  setUserStorageInstance(userId: string): MMKV {
    if (!Storage.userStorageInstance) {
      Storage.userStorageInstance = new MMKV({
        id: `user${userId}storage`,
        encryptionKey: Storage.encryptionKey,
      });
    }
    return Storage.userStorageInstance;
  }

  getUserStorageInstance(): MMKV | null {
    if (!Storage.userStorageInstance) {
      console.log('User storage instance not initialized');
      return null;
    }
    return Storage.userStorageInstance;
  }

  getAppStorageInstance(): MMKV | null {
    if (!Storage.appStorageInstance) {
      console.log('App storage instance not initialized');
      return null;
    }
    return Storage.appStorageInstance;
  }

  clearUserStorage(): void {
    // Clears user storage data
    if (!Storage.userStorageInstance) {
      console.log('UserStorage | No data found');
      return;
    }
    Storage.userStorageInstance.clearAll();
  }

  clearAppStorage(): void {
    // Clears app storage data
    if (!Storage.appStorageInstance) {
      console.log('AppStorage | No data found');
      return;
    }
    Storage.appStorageInstance.clearAll();
  }

  clear(): MMKV {
    // Clears all storage data
    if (!Storage.appStorageInstance) {
      throw new Error('App storage instance not initialized');
    }
    return Storage.appStorageInstance;
  }
}

export const StorageInstance = new Storage(process.env.STORAGE_ENCRYPTION_KEY);

// ? Enable New Architecture for using MMKV v3

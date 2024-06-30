import {MMKV} from 'react-native-mmkv';

class Storage {
  private static encryptionKey: string;
  private static appStorageInstance: MMKV | null;
  private static userStorageInstance: MMKV | null;

  constructor(encryptionKey: any) {
    Storage.encryptionKey = encryptionKey;
    Storage.initializeStorage();
  }

  static initializeStorage(): void {
    if (!Storage.appStorageInstance) {
      Storage.appStorageInstance = new MMKV({
        id: 'app-storage',
        encryptionKey: Storage.encryptionKey,
      });
      console.log('App Storage | Init');
    }
    if (!Storage.userStorageInstance) {
      const id: string | undefined =
        Storage.appStorageInstance?.getString('id');
      if (id) {
        Storage.setUserStorageInstance(id);
      }
      console.log('User Storage | Init');
    }
  }

  static setUserStorageInstance(id: string): void {
    if (!Storage.userStorageInstance) {
      Storage.userStorageInstance = new MMKV({
        id: `user${id}storage`,
      });
      Storage.saveToAppStorage('id', id);
      Storage.saveToUserStorage('id', id);
    }
  }

  static saveToUserStorage(key: string, value: string | number | boolean) {
    Storage.userStorageInstance?.set(key, value);
  }

  static saveToAppStorage(key: string, value: string | number | boolean) {
    Storage.appStorageInstance?.set(key, value);
  }

  static getUserStorageInstance(): MMKV | null {
    if (!Storage.userStorageInstance) {
      console.error('User storage not initialized');
      return null;
    }
    console.log('User storage::', Storage.userStorageInstance);
    return Storage.userStorageInstance;
  }

  static getAppStorageInstance(): MMKV | null {
    if (!Storage.appStorageInstance) {
      console.error('App storage not initialized');
      return null;
    }
    console.log('App storage::', Storage.appStorageInstance);
    return Storage.appStorageInstance;
  }
}

const storage = new Storage(process.env.STORAGE_ENCRYPTION_KEY);
export default Storage;
export const getAppStorage = () => Storage.getAppStorageInstance();
export const getUserStorage = () => Storage.getUserStorageInstance();

// ? Enable New Architecture for using MMKV v3

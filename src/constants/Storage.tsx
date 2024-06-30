import {MMKV} from 'react-native-mmkv';

class Storage {
  private static encryptionKey: string;
  private static appStorageInstance: MMKV | null;
  private static userStorageInstance: MMKV | null;

  constructor(encryptionKey: any) {
    Storage.encryptionKey = encryptionKey;
    this.setAppStorageInstance();
  }

  setAppStorageInstance(): void {
    if (!Storage.appStorageInstance) {
      Storage.appStorageInstance = new MMKV({
        id: 'app-storage',
        encryptionKey: Storage.encryptionKey,
      });
      const userId: string | undefined =
        Storage.appStorageInstance.getString('userId');
      if (userId) {
        Storage.setUserStorageInstance(userId);
      }
    }
  }

  static setUserStorageInstance(userId: string): void {
    if (!Storage.userStorageInstance) {
      Storage.userStorageInstance = new MMKV({
        id: `user${userId}storage`,
      });
    }
  }

  static saveToUserStorage(key: string, value: string | number | boolean) {
    Storage.userStorageInstance?.set(key, value);
  }

  static saveToAppStorage(key: string, value: string | number | boolean) {
    Storage.appStorageInstance?.set(key, value);
  }

  static getUserStorageInstance(): MMKV | null {
    return this.userStorageInstance;
  }

  static getAppStorageInstance(): MMKV | null {
    return this.appStorageInstance;
  }
}

export default Storage;
export const getAppStorage = () => Storage.getAppStorageInstance();
export const getUserStorage = () => Storage.getUserStorageInstance();

// ? Enable New Architecture for using MMKV v3

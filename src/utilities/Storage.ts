import {MMKV} from 'react-native-mmkv';
import {logDebug, logError} from '../analytics';

class Storage {
  private static instance: Storage;
  private static encryptionKey: string;
  private appStorageInstance: MMKV | null;
  private userStorageInstance: MMKV | null;

  private constructor(encryptionKey: string) {
    Storage.encryptionKey = encryptionKey;
    this.appStorageInstance = null;
    this.userStorageInstance = null;
    this.initializeStorage();
  }

  public static getInstance(encryptionKey: string): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage(encryptionKey);
    }
    return Storage.instance;
  }

  private initializeStorage(): void {
    if (!this.appStorageInstance) {
      // App Storage init
      this.appStorageInstance = new MMKV({
        id: 'app-storage',
        encryptionKey: Storage.encryptionKey,
      });
      logDebug(`App Storage | INIT - ${this.appStorageInstance}`);
    }
    if (!this.userStorageInstance) {
      // User Storage init
      const id: string | undefined = this.appStorageInstance?.getString('id');
      if (id) {
        this.setUserStorageInstance(id);
      }
      logDebug(`User Storage | INIT - ${this.userStorageInstance}`);
    }
  }

  public setUserStorageInstance(id: string): void {
    if (!this.userStorageInstance) {
      this.userStorageInstance = new MMKV({
        id: `user${id}storage`,
      });
      this.saveToAppStorage('id', id); // Storing to App Storage for init
    }
  }

  public saveToUserStorage(
    key: string,
    value: string | number | boolean,
  ): void {
    this.userStorageInstance?.set(key, value);
    logDebug(`User Storage | SET - key: ${key} | value: ${value}`);
  }

  public saveToAppStorage(key: string, value: string | number | boolean): void {
    this.appStorageInstance?.set(key, value);
    logDebug(`App Storage | SET - key: ${key} | value: ${value}`);
  }

  public getUserStorageInstance(): MMKV | null {
    if (!this.userStorageInstance) {
      logError('User storage not initialized');
      return null;
    }
    return this.userStorageInstance;
  }

  public getAppStorageInstance(): MMKV | null {
    if (!this.appStorageInstance) {
      logError('App storage not initialized');
      return null;
    }
    return this.appStorageInstance;
  }

  public clearAppStorage(): void {
    if (this.appStorageInstance) {
      this.appStorageInstance.clearAll();
      logDebug('App storage | CLEAR');
    }
  }

  public clearUserStorage(): void {
    if (this.userStorageInstance) {
      this.userStorageInstance.clearAll();
      logDebug('User storage | CLEAR');
    }
  }

  public clearAll(): void {
    if (this.appStorageInstance) {
      this.appStorageInstance.clearAll();
      logDebug('App storage | CLEAR_ALL');
    }
    if (this.userStorageInstance) {
      this.userStorageInstance.clearAll();
      logDebug('User storage | CLEAR_ALL');
    }
  }
}

const encryptionKey = process.env.MMKV_STORAGE_ENCRYPTION_KEY || 'STORAGE';
const storageInstance = Storage.getInstance(encryptionKey);
export default storageInstance;
export const getAppStorage = () => storageInstance.getAppStorageInstance();
export const getUserStorage = () => storageInstance.getUserStorageInstance();

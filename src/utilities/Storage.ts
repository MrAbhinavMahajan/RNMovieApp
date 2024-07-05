import {MMKV} from 'react-native-mmkv';

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
      console.log('App Storage | Init', this.appStorageInstance);
    }
    if (!this.userStorageInstance) {
      // User Storage init
      const id: string | undefined = this.appStorageInstance?.getString('id');
      if (id) {
        this.setUserStorageInstance(id);
      }
      console.log('User Storage | Init', this.userStorageInstance);
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
  }

  public saveToAppStorage(key: string, value: string | number | boolean): void {
    this.appStorageInstance?.set(key, value);
  }

  public getUserStorageInstance(): MMKV | null {
    if (!this.userStorageInstance) {
      console.error('User storage not initialized');
      return null;
    }
    console.log('User storage::', this.userStorageInstance);
    return this.userStorageInstance;
  }

  public getAppStorageInstance(): MMKV | null {
    if (!this.appStorageInstance) {
      console.error('App storage not initialized');
      return null;
    }
    console.log('App storage::', this.appStorageInstance);
    return this.appStorageInstance;
  }

  public clearAppStorage(): void {
    if (this.appStorageInstance) {
      this.appStorageInstance.clearAll();
    }
  }

  public clearUserStorage(): void {
    if (this.userStorageInstance) {
      this.userStorageInstance.clearAll();
    }
  }

  public clearAll(): void {
    if (this.appStorageInstance) {
      this.appStorageInstance.clearAll();
    }
    if (this.userStorageInstance) {
      this.userStorageInstance.clearAll();
    }
  }
}

const encryptionKey = process.env.STORAGE_ENCRYPTION_KEY || 'STORAGE';
const storageInstance = Storage.getInstance(encryptionKey);
export default storageInstance;
export const getAppStorage = () => storageInstance.getAppStorageInstance();
export const getUserStorage = () => storageInstance.getUserStorageInstance();

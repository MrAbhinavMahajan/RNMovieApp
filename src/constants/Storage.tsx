import {MMKV} from 'react-native-mmkv';

export const AppStorage = new MMKV({
  id: 'app-storage',
});

export const SecuredStorage = new MMKV({
  id: 'secured-storage',
  encryptionKey: process.env.STORAGE_ENCRYPTION_KEY,
});

export const saveToSecuredStorage = (
  key: string,
  value: string | number | boolean,
) => {
  SecuredStorage.set(key, value);
};

// ? Enable New Architecture for using MMKV v3

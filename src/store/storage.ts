import {MMKV} from 'react-native-mmkv';
import {StateStorage} from 'zustand/middleware';

const storage = new MMKV({
  id: 'zustand-storage',
});

const clear = () => {
  storage.clearAll();
};

const ZustandStateStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return storage?.set(name, value);
  },
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? '';
  },
  removeItem: (name: string) => {
    return storage.delete(name);
  },
};

export default {
  storage: ZustandStateStorage,
  clear,
};

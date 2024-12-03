import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    Storage,
    persistReducer,
    persistStore,
  } from 'redux-persist';
  
  import {MMKV} from 'react-native-mmkv';
  import {configureStore} from '@reduxjs/toolkit';
  import rootReducer from './index';
  
  // #region MMKV setup
  const storage = new MMKV();
  
  export const reduxStorage: Storage = {
    setItem: (key: string, value: any) => {
      storage.set(key, value);
      return Promise.resolve(true);
    },
    getItem: (key: string) => {
      const value = storage.getString(key);
      return Promise.resolve(value);
    },
    removeItem: (key: string) => {
      storage.delete(key);
      return Promise.resolve();
    },
  };
  // #endregion
  
  // #region persist setup
  const persistConfig = {
    key: 'root',
    storage: reduxStorage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  // #endregion

  import appointmentComponent from './appointment/reducer'
  
  // #region store setup
  let store = configureStore({
    reducer: persistedReducer,
    /*reducer: {
      appointmentReducer: appointmentComponent,
    },*/
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        /*serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },*/
      }),
  });
  
  let persistor = persistStore(store);
  // #endregion
  
  export type StoreRootState = ReturnType<typeof store.getState>;
  export type StoreDispatchType = typeof store.dispatch;
  
  export {store, persistor};
  
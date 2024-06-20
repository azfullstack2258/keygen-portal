import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import licensesReducer from './slices/licenses';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig = {
  key: 'user',
  storage,
  blacklist: ['error'],
};

const licensesPersistConfig = {
  key: 'licenses',
  storage,
  blacklist: ['loading', 'error'],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedLicensesReducer = persistReducer(licensesPersistConfig, licensesReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    licenses: persistedLicensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

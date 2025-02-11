import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { rootReducer }  from '/src/redux/root/rootSlice.js';
import { waterReducer } from './waterData/waterSlice';
import { optionsReducer } from './options/optionsSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const OptionsPersistConfig = {
  key: 'options',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const reducers = combineReducers({
  root: rootReducer,
  auth: persistedAuthReducer,
  waterData: waterReducer,
  options: persistReducer(OptionsPersistConfig, optionsReducer),
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

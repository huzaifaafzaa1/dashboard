import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/productsSlice';
import bagReducer from '../redux/bagSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'persist-root',
  storage,
};

// Combine reducers first
const rootReducer = combineReducers({
    productsStore: productsReducer,
    bag: bagReducer
});

// Then create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>; // This will infer the full state type
export const persistor = persistStore(store);
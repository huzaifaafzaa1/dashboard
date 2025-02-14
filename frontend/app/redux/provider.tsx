'use client'
// provider.tsx
import { ReactNode } from 'react'; // Import ReactNode from react
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

interface ClientProviderProps {
  children: ReactNode; // Explicitly type 'children' as ReactNode
}

export function ClientProvider({ children }: ClientProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

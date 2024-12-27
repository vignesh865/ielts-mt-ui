import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>
);
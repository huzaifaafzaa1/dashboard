"use client"; // Ensures this is a Client Component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react"; // Import ReactNode

interface QueryProviderProps {
    children: ReactNode; // Explicitly typing children
  }

const queryClient = new QueryClient();

export default function QueryProvider({ children }:QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

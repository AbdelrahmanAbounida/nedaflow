import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "next-themes";
import { GlobalModalsProvider } from "./global-modals-provider";
import { FLowProvider } from "./flow-provider";
import { APIInterceptor } from "@/controllers/api";
import QueryProvider from "./query-provider";

export const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          <APIInterceptor />
          <GlobalModalsProvider />
          <FLowProvider>{children}</FLowProvider>
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

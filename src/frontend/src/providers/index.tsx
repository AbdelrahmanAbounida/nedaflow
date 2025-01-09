import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "next-themes";
import { GlobalModalsProvider } from "./global-modals-provider";
import { FLowProvider } from "./flow-provider";

export const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <GlobalModalsProvider />
        <FLowProvider>{children}</FLowProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

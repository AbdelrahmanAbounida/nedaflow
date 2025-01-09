import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemeProvider defaultTheme="light" forcedTheme="light">
      {/** TODO:: rm forced theme to change themes */}
      {children}
    </NextThemeProvider>
  );
};

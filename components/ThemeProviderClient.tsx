"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProviderClient({ children }: Props) {
  // next-themes relies on client-side effects to toggle the `dark` class
  // on the document element. This wrapper ensures the provider is rendered
  // as a client component so `useTheme` in other client components works.
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

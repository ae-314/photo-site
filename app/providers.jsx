"use client";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export default function Providers({ children }) {
  return (
    <MantineProvider
      defaultColorScheme="light"
      theme={{
        fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
        headings: {
          fontFamily: 'var(--font-main), Georgia, "Times New Roman", Times, serif',
          fontWeight: 700,
        },
      }}
    >
      {children}
    </MantineProvider>
  );
}

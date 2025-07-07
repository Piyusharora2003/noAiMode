// app/layout.tsx
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "No-AI Mode",
  description: "Search engine results filtered by human-authored content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steve Lyall Tree Care | Website Design Collection",
  description: "Explore three landing page design directions created for Steve Lyall Tree Care in the Hudson Valley.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

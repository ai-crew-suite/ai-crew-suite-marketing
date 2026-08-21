import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./studio.css";

export const metadata: Metadata = {
  title: "Digest Engine Studio",
  description: "Sanity Studio for the Digest Engine marketing site.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="studio-root">{children}</body>
    </html>
  );
}
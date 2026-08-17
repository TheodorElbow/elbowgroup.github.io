import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Elbow Group — Independent Mobile Studio", description: "Playful mobile puzzles, arcade adventures and creative tools by Elbow Group.", icons: { icon: "/apps/nonogram.png", shortcut: "/apps/nonogram.png" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

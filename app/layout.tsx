import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "სლაიდ კარებები",
  description:
    "სლაიდ კარებების საიტის შექმნის მიზანი არის რომ არ დავხარჯოთ დრო დათვლაში",
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

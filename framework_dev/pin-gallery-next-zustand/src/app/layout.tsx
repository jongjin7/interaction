import type { Metadata, Viewport } from 'next';
import React from 'react';
import '@/styles/default.scss';
import '@/styles/main.css';

export const metadata: Metadata = {
  title: 'Pin-Gallery by Next.js & Zustand',
  description: 'Next.js와 Zustand로 포팅한 갤러리',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-kr">
      <body>{children}</body>
    </html>
  );
}

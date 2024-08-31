import type { Metadata } from 'next';
import React from 'react';
import '@/styles/default.scss';
import '@/styles/main.css';

export const metadata: Metadata = {
  title: 'Pin-Gallery by Next.js',
  description: 'Next.js로 포팅한 갤러리',
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

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Usman — Data & AI Engineer',
  description: 'Python-focused engineer and data scientist building production data pipelines, backend applications, AI/LLM workflows, and data-intensive products.',
  openGraph: {
    title: 'Muhammad Usman — Data & AI Engineer',
    description: 'From complex data to systems that think.',
    type: 'website',
    url: 'https://20100190.github.io/usman/',
    images: [{ url: 'https://20100190.github.io/usman/og.png', width: 1200, height: 630, alt: 'Muhammad Usman — Data & AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Usman — Data & AI Engineer',
    description: 'From complex data to systems that think.',
    images: ['https://20100190.github.io/usman/og.png'],
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

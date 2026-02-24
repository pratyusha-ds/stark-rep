import type { Metadata } from 'next';
import { geistSans, geistMono } from '@/lib/fonts';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Sweat & Conquer',
  description: 'Track your workouts and stay motivated.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#09090b',
              color: '#ef4444',
              border: '1px solid #7f1d1d',
              fontWeight: '600',
              textTransform: 'uppercase' as const,
            },
          }}
        />
      </body>
    </html>
  );
}

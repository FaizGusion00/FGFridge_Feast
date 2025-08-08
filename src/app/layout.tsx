import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import { cn } from '@/lib/utils';
import { Inter, Raleway } from 'next/font/google';
import { LanguageProvider } from '@/hooks/use-language.tsx';

export const metadata: Metadata = {
  title: 'FGFridge Feast',
  description: 'Generate recipes from ingredients you have.',
};

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Raleway({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <LanguageProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}

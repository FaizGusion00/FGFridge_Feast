import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import { cn } from '@/lib/utils';
import { Inter, Raleway } from 'next/font/google';
import { LanguageProvider } from '@/hooks/use-language.tsx';

const customFavicon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:gold;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#333;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="15" ry="15" fill="black"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="50" font-family="sans-serif" font-weight="bold" fill="url(#grad1)">
    FGK
  </text>
</svg>
`;

const faviconUrl = `data:image/svg+xml,${encodeURIComponent(customFavicon)}`;

export const metadata: Metadata = {
  title: 'FGFridge Feast',
  description: 'Generate recipes from ingredients you have.',
  icons: [{ rel: 'icon', url: faviconUrl }],
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

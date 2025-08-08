'use client';

import Link from 'next/link';
import { ChefHat, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Header() {
  const { language, text } = useLanguage();
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b border-border">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold font-headline transition-opacity hover:opacity-80">
          <ChefHat className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
          <span className="hidden sm:inline">FGFridge Feast</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="sm" className="text-base">
            <Link href="/favorites">
              <Heart className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">{text.favorites[language]}</span>
            </Link>
          </Button>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button variant="ghost" onClick={toggleLanguage} className="w-16">
      {language.toUpperCase()}
    </Button>
  );
}

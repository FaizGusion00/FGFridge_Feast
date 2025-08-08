
'use client';

import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

const LANGUAGE_KEY = 'fgfridge-feast-language';

type Language = 'en' | 'ms';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  text: Record<string, Record<Language, string>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  favorites: {
    en: 'Favorites',
    ms: 'Kegemaran',
  },
  yourFavoriteRecipes: {
    en: 'Your Favorite Recipes',
    ms: 'Resepi Kegemaran Anda',
  },
  noFavorites: {
    en: 'No Favorites Yet',
    ms: 'Tiada Kegemaran Lagi',
  },
  noFavoritesDesc: {
    en: "You haven't saved any recipes. Let's find some!",
    ms: 'Anda belum menyimpan sebarang resipi. Jom cari!',
  },
  generateRecipes: {
    en: 'Generate Recipes',
    ms: 'Jana Resepi',
  },
  whatsInFridge: {
    en: "What's in your fridge?",
    ms: 'Apa ada dalam peti sejuk?',
  },
  whatsInFridgeDesc: {
    en: 'Enter the ingredients you have on hand, and let our AI chef whip up some delicious recipe ideas for you.',
    ms: 'Masukkan bahan-bahan yang anda ada, dan biarkan chef AI kami menyediakan beberapa idea resipi yang lazat untuk anda.',
  },
  ingredients: {
    en: 'Ingredients',
    ms: 'Bahan-bahan',
  },
  ingredientsDesc: {
    en: 'List your ingredients, separated by commas (e.g., chicken breast, tomatoes, basil).',
    ms: 'Senaraikan bahan-bahan anda, dipisahkan dengan koma (cth., dada ayam, tomato, selasih).',
  },
  ingredientsPlaceholder: {
    en: 'e.g. eggs, cheese, bread, butter',
    ms: 'cth. telur, keju, roti, mentega',
  },
  generating: {
    en: 'Generating...',
    ms: 'Sedang menjana...',
  },
  craftingRecipes: {
    en: 'Crafting your recipes...',
    ms: 'Mencipta resepi anda...',
  },
  feastIdeas: {
    en: 'Here are your feast ideas!',
    ms: 'Ini idea masakan anda!',
  },
  instructions: {
    en: 'Instructions',
    ms: 'Arahan',
  },
};

export function LanguageProvider({children}: {children: React.ReactNode}) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(LANGUAGE_KEY) as Language | null;
      if (item && ['en', 'ms'].includes(item)) {
        setLanguage(item);
      }
    } catch (error) {
      console.error('Error reading language from localStorage', error);
      setLanguage('en');
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(LANGUAGE_KEY, language);
        // also update html lang attribute
        document.documentElement.lang = language;
      } catch (error) {
        console.error('Error saving language to localStorage', error);
      }
    }
  }, [language, isLoaded]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'en' ? 'ms' : 'en'));
  }, []);

  const value = {
    language,
    toggleLanguage,
    text: translations,
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

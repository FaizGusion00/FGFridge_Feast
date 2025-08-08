'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'fridge-feast-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      // For now, we assume favorites are recipe titles (strings)
      setFavorites(item ? JSON.parse(item) : []);
    } catch (error) {
      console.error('Error reading favorites from localStorage', error);
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage', error);
      }
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((recipeTitle: string) => {
    setFavorites((prev) => {
      if (prev.includes(recipeTitle)) {
        return prev.filter((fav) => fav !== recipeTitle);
      } else {
        return [...prev, recipeTitle];
      }
    });
  }, []);
  
  const isFavorite = useCallback((recipeTitle: string) => {
    return favorites.includes(recipeTitle);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}

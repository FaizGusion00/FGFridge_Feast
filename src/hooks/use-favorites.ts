'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'fridge-feast-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
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

  const toggleFavorite = useCallback((recipe: string) => {
    setFavorites((prev) => {
      if (prev.includes(recipe)) {
        return prev.filter((fav) => fav !== recipe);
      } else {
        return [...prev, recipe];
      }
    });
  }, []);
  
  const isFavorite = useCallback((recipe: string) => {
    return favorites.includes(recipe);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}

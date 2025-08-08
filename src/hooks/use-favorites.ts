'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Recipe } from '@/ai/schemas';

const FAVORITES_KEY = 'fgfridge-feast-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
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

  const toggleFavorite = useCallback((recipe: Recipe) => {
    setFavorites((prev) => {
      const isFavorited = prev.some((fav) => fav.title === recipe.title);
      if (isFavorited) {
        return prev.filter((fav) => fav.title !== recipe.title);
      } else {
        return [...prev, recipe];
      }
    });
  }, []);
  
  const isFavorite = useCallback((recipeTitle: string) => {
    return favorites.some((fav) => fav.title === recipeTitle);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}

'use client';

import { useState } from 'react';
import { useFavorites } from '@/hooks/use-favorites';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UtensilsCrossed } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeModal } from '@/components/RecipeModal';
import { type Recipe } from '@/ai/schemas';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-headline font-bold mb-8 text-center text-primary">Your Favorite Recipes</h1>
      
      {!isLoaded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
             <Card key={i} className="p-4 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </Card>
          ))}
        </div>
      )}

      {isLoaded && favorites.length === 0 && (
        <div className="text-center py-16 flex flex-col items-center gap-4 bg-card rounded-xl shadow-lg border-border">
          <UtensilsCrossed className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-semibold font-headline">No Favorites Yet</h2>
          <p className="text-muted-foreground">
            You haven't saved any recipes. Let's find some!
          </p>
          <Button asChild>
            <Link href="/">Generate Recipes</Link>
          </Button>
        </div>
      )}

      {isLoaded && favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onSelect={() => handleRecipeSelect(recipe)} />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          isOpen={!!selectedRecipe} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

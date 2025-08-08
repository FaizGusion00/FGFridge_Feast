'use client';

import { Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { type Recipe } from '@/ai/schemas';

type RecipeCardProps = {
  recipe: Recipe;
  onSelect: () => void;
};

export function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  const { isLoaded, isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(recipe.title);
  };

  const favorite = isFavorite(recipe.title);

  return (
    <Card 
      onClick={onSelect}
      className="flex flex-col h-full bg-card border-border rounded-xl shadow-md transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1 cursor-pointer group"
    >
      <CardHeader className="flex-row gap-4 items-start">
        <div className="flex-grow">
          <CardTitle className="font-headline text-xl text-primary">{recipe.title}</CardTitle>
          <CardDescription className="pt-2">{recipe.description}</CardDescription>
        </div>
        {!isLoaded && <Skeleton className="h-10 w-10 rounded-md shrink-0" />}
        {isLoaded && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            className="shrink-0 text-muted-foreground hover:text-primary"
          >
            <Heart className={cn('h-6 w-6 transition-colors', favorite && 'fill-primary text-primary')} />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        {/* We can add more info here if needed */}
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime} Prep</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookTime} Cook</span>
          </div>
      </CardFooter>
    </Card>
  );
}

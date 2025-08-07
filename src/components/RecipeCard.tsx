'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { Skeleton } from './ui/skeleton';

type RecipeCardProps = {
  recipe: string;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { isLoaded, isFavorite, toggleFavorite } = useFavorites();

  const { title, instructions } = useMemo(() => {
    const newlineIndex = recipe.indexOf('\n');
    const t = newlineIndex !== -1 ? recipe.substring(0, newlineIndex) : recipe;
    const i = newlineIndex !== -1 ? recipe.substring(newlineIndex + 1).trim() : '';
    return { title: t, instructions: i };
  }, [recipe]);

  const handleFavoriteClick = () => {
    toggleFavorite(recipe);
  };

  const favorite = isFavorite(recipe);

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg duration-300">
      <CardHeader className="flex-row gap-4 items-start">
        <div className="flex-grow">
          <CardTitle className="font-headline text-xl">{title}</CardTitle>
          {instructions && <CardDescription className="pt-2">An AI-powered recipe idea.</CardDescription>}
        </div>
        {!isLoaded && <Skeleton className="h-10 w-10 rounded-md shrink-0" />}
        {isLoaded && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            className="shrink-0"
          >
            <Heart className={cn('h-6 w-6 transition-colors', favorite && 'fill-primary text-primary')} />
          </Button>
        )}
      </CardHeader>
      {instructions && (
        <CardContent className="flex-grow">
          <p className="whitespace-pre-wrap text-sm">{instructions}</p>
        </CardContent>
      )}
    </Card>
  );
}

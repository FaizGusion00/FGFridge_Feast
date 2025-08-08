'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getRecipeIdeasAction, type ActionState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RecipeCard } from '@/components/RecipeCard';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { WandSparkles, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import type { Recipe } from '@/ai/schemas';

const initialState: ActionState = {
  recipes: undefined,
  error: undefined,
  fieldErrors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <WandSparkles className="mr-2 h-4 w-4" />
          Generate Recipes
        </>
      )}
    </Button>
  );
}

function Results({ recipes, setRecipes }: { recipes: Recipe[] | undefined, setRecipes: (recipes: Recipe[] | undefined) => void }) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if(!pending) {
        setRecipes(recipes);
    }
  }, [pending, recipes, setRecipes]);

  if (pending) {
    return (
      <section className="mt-12">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Crafting your recipes...</h2>
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
      </section>
    );
  }

  return null;
}

export default function Home() {
  const [state, formAction] = useActionState(getRecipeIdeasAction, initialState);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();

  useEffect(() => {
    if (state.error && !state.fieldErrors) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: state.error,
      });
    }
    if (state.recipes) {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <section className="text-center mb-12 bg-card border border-border rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
          What's in your fridge?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Enter the ingredients you have on hand, and let our AI chef whip up some delicious recipe ideas for you.
        </p>
      </section>

      <form ref={formRef} action={formAction} className="max-w-2xl mx-auto space-y-6">
        <div>
          <Label htmlFor="ingredients" className="text-lg font-medium">Ingredients</Label>
          <p className="text-sm text-muted-foreground mb-2">
            List your ingredients, separated by commas (e.g., chicken breast, tomatoes, basil).
          </p>
          <Textarea
            id="ingredients"
            name="ingredients"
            placeholder="e.g. eggs, cheese, bread, butter"
            rows={4}
            required
            className="text-base bg-secondary border-border focus:ring-primary"
            aria-describedby="ingredients-error"
          />
          {state.fieldErrors?.ingredients && (
            <p id="ingredients-error" className="text-sm font-medium text-destructive mt-2">
              {state.fieldErrors.ingredients.join(', ')}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <SubmitButton />
        </div>
        <div ref={resultsRef}>
          <Results recipes={state.recipes} setRecipes={setRecipes} />
        </div>
      </form>
      
      {recipes && recipes.length > 0 && (
        <section className="mt-12">
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">Here are your feast ideas!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in-50 duration-500">
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
            ))}
            </div>
        </section>
      )}

    </div>
  );
}

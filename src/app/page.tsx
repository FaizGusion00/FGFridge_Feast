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
import { RecipeModal } from '@/components/RecipeModal';
import { useLanguage } from '@/hooks/use-language';

const initialState: ActionState = {
  recipes: undefined,
  error: undefined,
  fieldErrors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { language, text } = useLanguage();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {text.generating[language]}
        </>
      ) : (
        <>
          <WandSparkles className="mr-2 h-4 w-4" />
          {text.generateRecipes[language]}
        </>
      )}
    </Button>
  );
}

function Results({ recipes, onRecipeSelect }: { recipes: Recipe[] | undefined, onRecipeSelect: (recipe: Recipe) => void }) {
  const { pending } = useFormStatus();
  const { language, text } = useLanguage();

  if (pending) {
    return (
      <section className="mt-12">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">{text.craftingRecipes[language]}</h2>
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

  if (recipes && recipes.length > 0) {
    return (
      <section className="mt-12">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">{text.feastIdeas[language]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in-50 duration-500">
        {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onSelect={() => onRecipeSelect(recipe)} />
        ))}
        </div>
      </section>
    );
  }

  return null;
}

export default function Home() {
  const { language, text } = useLanguage();
  const getRecipeIdeasWithLanguage = getRecipeIdeasAction.bind(null, language);
  const [state, formAction] = useActionState(getRecipeIdeasWithLanguage, initialState);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <section className="text-center mb-12 bg-card border border-border rounded-xl p-6 sm:p-8 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
          {text.whatsInFridge[language]}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {text.whatsInFridgeDesc[language]}
        </p>
      </section>

      <form ref={formRef} action={formAction} className="max-w-2xl mx-auto space-y-6">
        <div>
          <Label htmlFor="ingredients" className="text-lg font-medium">{text.ingredients[language]}</Label>
          <p className="text-sm text-muted-foreground mb-2">
            {text.ingredientsDesc[language]}
          </p>
          <Textarea
            id="ingredients"
            name="ingredients"
            placeholder={text.ingredientsPlaceholder[language]}
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
          <Results recipes={state.recipes} onRecipeSelect={handleRecipeSelect} />
        </div>
      </form>

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

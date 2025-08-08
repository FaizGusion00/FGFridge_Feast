'use server';

import { generateRecipeIdeas } from '@/ai/flows/generate-recipe-ideas';
import { GenerateRecipeIdeasInputSchema, type Recipe } from '@/ai/schemas';
import { revalidatePath } from 'next/cache';

export interface ActionState {
  recipes?: Recipe[];
  error?: string;
  fieldErrors?: {
    ingredients?: string[];
  }
}

let lastGeneratedRecipes: Recipe[] = [];

export async function getRecipeIdeasAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const ingredients = formData.get('ingredients');
  
  const validatedFields = GenerateRecipeIdeasInputSchema.safeParse({ ingredients });

  if (!validatedFields.success) {
    return {
        error: 'Invalid submission.',
        fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateRecipeIdeas({ ingredients: validatedFields.data.ingredients });
    if (result.recipes && result.recipes.length > 0) {
      lastGeneratedRecipes = result.recipes;
      revalidatePath('/');
      revalidatePath('/recipe');
      return { recipes: result.recipes };
    }
    return { error: "Couldn't find any recipes with these ingredients. Try adding more!" };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}

export async function getGeneratedRecipes(): Promise<Recipe[] | null> {
    return lastGeneratedRecipes;
}

'use server';

/**
 * @fileOverview AI flow for generating recipe ideas based on a list of ingredients.
 *
 * - generateRecipeIdeas - A function that generates recipe ideas based on the given ingredients.
 * - GenerateRecipeIdeasInput - The input type for the generateRecipeIdeas function.
 * - GenerateRecipeIdeasOutput - The return type for the generateRecipeIdeas function.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateRecipeIdeasInputSchema,
  type GenerateRecipeIdeasInput,
  GenerateRecipeIdeasOutputSchema,
  type GenerateRecipeIdeasOutput,
} from '@/ai/schemas';

export async function generateRecipeIdeas(
  input: GenerateRecipeIdeasInput
): Promise<GenerateRecipeIdeasOutput> {
  return generateRecipeIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeIdeasPrompt',
  input: {schema: GenerateRecipeIdeasInputSchema},
  output: {schema: GenerateRecipeIdeasOutputSchema},
  prompt: `You are a recipe assistant. Given the following ingredients, suggest some recipe ideas.

Ingredients: {{{ingredients}}}

Return a list of recipe ideas that can be made with the given ingredients.`,
});

const generateRecipeIdeasFlow = ai.defineFlow(
  {
    name: 'generateRecipeIdeasFlow',
    inputSchema: GenerateRecipeIdeasInputSchema,
    outputSchema: GenerateRecipeIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

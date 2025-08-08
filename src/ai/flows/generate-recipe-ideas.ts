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
  prompt: `You are a world-class chef who is an expert in both English and Malay cuisine. 
Your task is to create three diverse and delicious recipe ideas based on a list of ingredients.

You MUST respond in the language specified: {{language}}. 
(en = English, ms = Malay).

For each recipe, provide a complete, well-structured set of details.

Ingredients provided: {{{ingredients}}}

Return a list of detailed recipes.`,
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

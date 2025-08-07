import {z} from 'genkit';

export const GenerateRecipeIdeasInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available to use.'),
});

export type GenerateRecipeIdeasInput = z.infer<
  typeof GenerateRecipeIdeasInputSchema
>;

export const GenerateRecipeIdeasOutputSchema = z.object({
  recipes: z
    .array(z.string())
    .describe('A list of recipe ideas based on the given ingredients.'),
});

export type GenerateRecipeIdeasOutput = z.infer<
  typeof GenerateRecipeIdeasOutputSchema
>;

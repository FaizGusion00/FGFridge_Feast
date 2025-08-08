
import {z} from 'genkit';

export const GenerateRecipeIdeasInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available to use.'),
  language: z.enum(['en', 'ms']).describe('The language to generate the recipe in.')
});

export type GenerateRecipeIdeasInput = z.infer<
  typeof GenerateRecipeIdeasInputSchema
>;

export const RecipeSchema = z.object({
  title: z.string().describe('The title of the recipe.'),
  description: z.string().describe('A short, enticing description of the recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients for the recipe.'),
  instructions: z.array(z.string()).describe('Step-by-step instructions to prepare the recipe.'),
  prepTime: z.string().describe('The estimated preparation time, e.g., "15 minutes".'),
  cookTime: z.string().describe('The estimated cooking time, e.g., "30 minutes".'),
  servings: z.string().describe('The number of servings the recipe makes.'),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export const GenerateRecipeIdeasOutputSchema = z.object({
  recipes: z
    .array(RecipeSchema)
    .describe('A list of recipe ideas based on the given ingredients.'),
});

export type GenerateRecipeIdeasOutput = z.infer<
  typeof GenerateRecipeIdeasOutputSchema
>;

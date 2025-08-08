import { getGeneratedRecipes } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type Recipe } from "@/ai/schemas";
import { Clock, Users, Soup, ChefHat } from "lucide-react";
import { notFound } from "next/navigation";

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipes = await getGeneratedRecipes();
  const recipeId = parseInt(params.id, 10);

  if (!recipes || isNaN(recipeId) || recipeId < 0 || recipeId >= recipes.length) {
    notFound();
  }

  const recipe: Recipe = recipes[recipeId];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <Card className="overflow-hidden border-border shadow-lg">
        <CardHeader className="bg-muted/30 p-8">
          <Badge variant="secondary" className="w-fit text-sm mb-2">{recipe.servings}</Badge>
          <CardTitle className="font-headline text-4xl md:text-5xl text-primary">{recipe.title}</CardTitle>
          <p className="text-lg text-muted-foreground mt-2">{recipe.description}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-3 mb-4">
              <Soup className="h-6 w-6 text-primary" />
              Ingredients
            </h2>
            <ul className="space-y-2 list-disc list-inside text-foreground/90">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-3 mb-4">
                <ChefHat className="h-6 w-6 text-primary" />
                Instructions
            </h2>
            <div className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mt-1">
                    {index + 1}
                  </div>
                  <p className="flex-grow text-foreground/90 leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

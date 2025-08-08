'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { type Recipe } from "@/ai/schemas";
import { Clock, ChefHat, Soup } from "lucide-react";

interface RecipeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90dvh] flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <Badge variant="secondary" className="w-fit text-sm mb-2">{recipe.servings}</Badge>
          <DialogTitle className="font-headline text-4xl md:text-5xl text-primary">{recipe.title}</DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground mt-2">{recipe.description}</DialogDescription>
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
        </DialogHeader>

        <div className="p-6 pt-0 grid md:grid-cols-3 gap-8 overflow-y-auto">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-3 mb-4 sticky top-0 bg-background py-2">
              <Soup className="h-6 w-6 text-primary" />
              Ingredients / Bahan-bahan
            </h2>
            <ul className="space-y-2 list-disc list-inside text-foreground/90">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-3 mb-4 sticky top-0 bg-background py-2">
                <ChefHat className="h-6 w-6 text-primary" />
                Instructions / Arahan
            </h2>
            <div className="space-y-6">
              {recipe.instructions?.map((instruction, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mt-1">
                    {index + 1}
                  </div>
                  <p className="flex-grow text-foreground/90 leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

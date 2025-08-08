import Link from 'next/link';
import { ChefHat, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b border-border">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold font-headline transition-opacity hover:opacity-80">
          <ChefHat className="h-8 w-8 text-primary" />
          <span>Fridge Feast</span>
        </Link>
        <nav>
          <Button asChild variant="ghost" className="text-base">
            <Link href="/favorites">
              <Heart className="mr-2 h-5 w-5" />
              Favorites
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

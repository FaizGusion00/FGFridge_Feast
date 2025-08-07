import Link from 'next/link';
import { ChefHat, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold font-headline transition-opacity hover:opacity-80">
          <ChefHat className="h-7 w-7 text-primary" />
          <span>Fridge Feast</span>
        </Link>
        <nav>
          <Button asChild variant="ghost">
            <Link href="/favorites">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

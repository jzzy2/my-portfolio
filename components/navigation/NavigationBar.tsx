// Navigation.tsx
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-transparent bg-transparent border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="#hero" className="text-white text-xl font-semibold text-foreground">
            My Portfolio
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="#about"
              className="text-white hover:text-muted-foreground transition-colors"
            >
              About
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

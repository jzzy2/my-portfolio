"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
            bg-transparent text-white border-white
            hover:bg-white hover:text-black hover:border-black
            transition-colors duration-200

            dark:bg-transparent dark:text-white dark:border-white
            dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white
          "
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-transparent p-1">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="
      bg-transparent text-white
      hover:bg-white hover:text-black
      transition-colors duration-200
    "
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="
      bg-transparent text-white
      hover:bg-white hover:text-black
      transition-colors duration-200
    "
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="
      bg-transparent text-white
      hover:bg-white hover:text-black
      transition-colors duration-200
    "
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { Button } from "@/components/ui/button"; // Replace with your button component path
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Settings } from "lucide-react"; // For the settings icon (you can use any icon library)
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Get the pathname

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getTitle = () => {
    if (pathname === "/notes/archived") {
      return "Archived Notes";
    } else if (pathname.startsWith("/notes/")) {
      return "Note Details";
    } else if (pathname === "/notes") {
      //For /notes route
      return "All Notes";
    } else {
      return "Home"; // Default title
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-app-950">
      {/* Left Section: Title and Button */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{getTitle()}</h1>
      </div>

      {/* Right Section: Search and Settings */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Search className="h-12 w-12 text-gray-800 dark:text-gray-100" />
          Search by title, content, or tags...
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>k
          </kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle className="sr-only">Search by title, content, or tags...</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <CommandInput placeholder="Search by title, content, or tags..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        <Button variant="outline" className="h-10 w-10 p-0">
          <Settings className="h-12 w-12 text-gray-800 dark:text-gray-100" />
        </Button>
      </div>
    </header>
  );
};

export default Header;

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  MessageSquare,
  BookOpen,
  Settings,
  User,
  LayoutDashboard,
  Plus,
  Search,
  Star,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useUIStore } from "@/store";
import { useDocumentSearch, useCreateChat, useCreateDocument } from "@/hooks";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const { data: searchResults } = useDocumentSearch(debouncedQuery);
  const createChat = useCreateChat();
  const createDocument = useCreateDocument();

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const runCommand = React.useCallback(
    (action: () => void) => {
      setCommandPaletteOpen(false);
      action();
    },
    [setCommandPaletteOpen]
  );

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Search documents, or jump to a page…" value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {query.trim().length > 0 && searchResults && searchResults.length > 0 && (
          <>
            <CommandGroup heading="Documents">
              {searchResults.slice(0, 5).map((doc) => (
                <CommandItem
                  key={doc._id}
                  onSelect={() => runCommand(() => router.push(`/dashboard/documents/${doc._id}`))}
                >
                  <FileText className="h-4 w-4" />
                  {doc.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        <CommandGroup heading="Quick actions">
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                createDocument.mutate(
                  { title: "Untitled document", content: "" },
                  {
                    onSuccess: (doc) => router.push(`/dashboard/documents/${doc._id}`),
                  }
                )
              )
            }
          >
            <Plus className="h-4 w-4" />
            New document
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                createChat.mutate(undefined, {
                  onSuccess: (chat) => router.push(`/dashboard/chat/${chat._id}`),
                })
              )
            }
          >
            <MessageSquare className="h-4 w-4" />
            New AI chat
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/documents?search=true"))}>
            <Search className="h-4 w-4" />
            Search all documents
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/documents"))}>
            <FileText className="h-4 w-4" />
            My Documents
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/favorites"))}>
            <Star className="h-4 w-4" />
            Favorites
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/prompts"))}>
            <BookOpen className="h-4 w-4" />
            Prompt Library
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/profile"))}>
            <User className="h-4 w-4" />
            Profile
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
            <Settings className="h-4 w-4" />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

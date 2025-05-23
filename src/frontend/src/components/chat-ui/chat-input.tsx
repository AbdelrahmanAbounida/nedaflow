import {
  ArrowUp,
  FileIcon,
  Globe,
  ImageIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, KeyboardEvent } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: () => void;
  input: string;
  onInputChange: (val: string) => void;
}

export function ChatInput({ onSend, input, onInputChange }: ChatInputProps) {
  const handleSend = () => {
    if (input.trim()) {
      onSend();
      onInputChange("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="flex gap-2 w-full relative p-3 ">
        <Textarea
          rows={4}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[60px] border-[.1px] rounded-2xl dark:bg-[#303030]  p-4 resize-none bg-muted  "
        />

        {/** Upload File */}
        <UploadMore className="absolute bottom-5 group left-5" />

        {/** Send Button */}
        <Button
          disabled={input.length == 0}
          onClick={handleSend}
          size="icon"
          className="absolute w-8 h-8 bottom-5 group right-9 rounded-full"
        >
          <ArrowUp className="h-4 w-4 transition-all delay-75 dark:text-white" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mx-auto text-center ">
        Press Enter to send your message
      </p>
    </>
  );
}

const UploadMore = ({ className }: { className?: string }) => {
  return (
    <Menubar
      className={cn(
        "rounded-lg w-8 h-8 bg-background/30 hover:bg-background/60 ",
        className
      )}
    >
      <MenubarMenu>
        <MenubarTrigger className=" pr-0 w-8 h-full gap-1  px-1   rounded-2xl cursor-pointer ">
          <PlusIcon className="w-4 h-4" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>
            <FileIcon className="w-3.5 h-3.5  mr-1" /> Upload File{" "}
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            <ImageIcon className="w-3.5 h-3.5 mr-1" />
            Take Screenshot
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

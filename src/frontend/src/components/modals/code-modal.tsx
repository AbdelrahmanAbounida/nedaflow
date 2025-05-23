"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Code } from "lucide-react";

export default function CodeDialog() {
  const [open, setOpen] = useState(false);

  const codeExample = `// Example React component
import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Count: {count}</h2>
      <div className="flex gap-2">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setCount(count - 1)}
        >
          Decrease
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setCount(count + 1)}
        >
          Increase
        </button>
      </div>
    </div>
  )
}`;

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="" variant={"outline"}>
            <Code className="h-4 w-4" />
            View Code
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Code Example</DialogTitle>
            <DialogDescription>
              A simple React counter component
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md bg-zinc-950 p-4">
            <pre className="overflow-x-auto text-sm text-zinc-100">
              <code>{codeExample}</code>
            </pre>
          </div>

          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Package</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

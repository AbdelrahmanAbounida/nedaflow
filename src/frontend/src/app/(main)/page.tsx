import { NewFlowModal } from "@/components/modals/new-flow-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle, PlusIcon, Workflow } from "lucide-react";
import Image from "next/image";

export default function Home() {
  // Load all projects / workflows

  const workflows = [];

  if (!workflows.length) {
    return (
      <div className="w-full h-full flex  flex-col items-center justify-center ">
        <div className="rounded-full w-12 h-12 p-1 bg-gray-100 flex items-center justify-center">
          <Workflow className="size-7 text-primary" />
        </div>
        <h1 className="text-lg font-semibold mt-3">No NedaFlow Created Yet</h1>
        <p className="text-muted-foreground text-sm">
          Start Creating your flow. Begin with a template, or start from
          scratch.
        </p>
        {/* <Button className="mt-5 h-8 px-7">
          <PlusCircle className="mr-0 size-4" />
          New Flow
        </Button> */}
        <NewFlowModal className="mt-5 h-8 px-7" />
      </div>
    );
  }
  return (
    <main className="h-full w-full">
      {/** TODO:: show either empty page or table with sidebar showing projects, workflows */}
    </main>
  );
}

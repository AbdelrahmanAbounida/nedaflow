import { NewFlowModal } from "@/components/modals/new-flow-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, PlusIcon, Workflow } from "lucide-react";
import Image from "next/image";

export default function Home() {
  // Load all projects / workflows

  const workflows = [];
  const selectedFolder = "Folder1";

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full container mt-9 mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">{selectedFolder}</h1>
            <p className="text-muted-foreground text-sm">
              Manage Your projects. Download and upload entire workflows
            </p>
          </div>

          <Button className="h-8" variant={"outline"}>
            <PlusIcon className="text-accent-foreground/70 size-4" />
            New Flow{" "}
          </Button>
        </div>
        <Separator className="mt-3" />

        {/** Empty State */}

        {!workflows.length ? (
          <div className="flex-1 w-full h-full flex  flex-col items-center justify-center ">
            <div className="rounded-full w-12 h-12 p-1 bg-gray-100 flex items-center justify-center">
              <Workflow className="size-7 text-primary" />
            </div>
            <h1 className="text-lg font-semibold mt-3">
              No NedaFlow Created Yet
            </h1>
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
        ) : (
          <div className="">
            This is when folders exist . TODO Create Table to show them
          </div>
        )}
      </div>
    </main>
  );
}

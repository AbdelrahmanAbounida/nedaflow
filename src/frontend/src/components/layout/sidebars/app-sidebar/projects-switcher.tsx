"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

// TODO:: move to types

interface Project {
  id: string;
  img: string;
  title: string;
}
const allProjects: Project[] = [
  {
    id: "asd",
    title: "Test RAG App",
    img: "/assets/projects-assets/project1.jpg",
  },
  {
    id: "nmr",
    title: "Handle Web Scraping",
    img: "/assets/projects-assets/project2.jpg",
  },
];

function ProjectsSwitcher({ projectId }: { projectId?: string }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(projectId);
  const isLoading = false; // TODO:: this is loaded from hook useProjects for ex

  React.useEffect(() => {
    if (!isLoading && !allProjects?.length) {
      toast.success("You have to create projectId first");
      return redirect("/projectId/create");
    }
  }, [isLoading, allProjects]);

  const project = allProjects?.find((projectId) => projectId.id === value);

  if (isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="py-4 " disabled={isLoading} asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-whites  px-3 bg-accent py-5"
        >
          {value ? (
            project ? (
              <ProjectTitle value={value} project={project!} />
            ) : (
              "Select project"
            )
          ) : (
            "Select project"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 w-[--radix-popover-trigger-width]">
        <Command>
          <CommandInput className="w-full" placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup
              defaultValue={project?.id}
              defaultChecked
              className="w-full "
            >
              {allProjects?.map((project) => (
                <CommandItem
                  className="w-full items-center justify-start flex"
                  key={project.id}
                  value={project.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    // router.push(`/projects/${project?.id}/home`);
                  }}
                >
                  <ProjectTitle value={value} project={project!} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ProjectsSwitcher;

const ProjectTitle = ({
  value,
  project,
}: {
  value?: string;
  project: Project;
}) => (
  <div
    className={cn(
      "flex items-center gap-3  w-full justify-start hover:opacity-100 transition-all delay-75 cursor-pointer",
      value === project.id ? "opacity-100" : "opacity-75"
    )}
  >
    <div className="flex   items-center">
      <img src={project.img} alt="ws logo" className="rounded-md w-7 h-7" />
    </div>
    <p className="text-md font-medium"> {project.title}</p>
  </div>
);

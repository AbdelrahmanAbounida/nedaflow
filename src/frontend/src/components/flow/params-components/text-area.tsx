import TextAreaModal from "@/components/modals/textarea-data-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Maximize } from "lucide-react";
import React from "react";

export const TextAreaParam = ({ className, ...props }: any) => {
  return (
    <div className={cn("relative w-full flex items-center ", className)}>
      <Input className="" />

      {/** TODO:: add modal  */}

      <TextAreaModal>
        <Button
          size="sm"
          variant={"ghost"}
          className=" absolute right-2 top-0.5 w-4 hover:bg-transparent"
        >
          <Maximize className=" text-gray-700 size-4 cursor-pointer z-10" />
        </Button>
      </TextAreaModal>
    </div>
  );
};

import TextAreaModal from "@/components/modals/textarea-data-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Maximize } from "lucide-react";
import React, { useState } from "react";

export const TextAreaParam = ({
  className,
  handleUpdateNode,
  ...props
}: any) => {
  const [value, setvalue] = useState(props.value);

  return (
    <div className={cn("relative w-full flex items-center ", className)}>
      <Input
        value={value}
        onChange={(e) => {
          setvalue(e.target.value);
          handleUpdateNode({ newValue: e.target.value });
        }}
        className=""
      />

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

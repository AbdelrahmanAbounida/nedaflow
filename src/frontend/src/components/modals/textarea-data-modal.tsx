"use client";
import React, { HTMLProps } from "react";
import { BaseModal } from "./base-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FileText, Maximize, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";

export function TextAreaModal({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <BaseModal className={className!}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className={className}>
          {children || (
            <Button size="sm" className=" ">
              <Maximize className="" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="min-w-[95%] max-h-[95%] h-full flex flex-col gap-0 mt-3">
          <DialogHeader className="pl-1">
            <DialogTitle className="flex items-end gap-2">
              <p className="">Edit text content.</p>
              <FileText className="w-4 h-4 text-black" />
            </DialogTitle>
            <DialogDescription>Edit text content.</DialogDescription>
          </DialogHeader>

          <div className="flex-1 mt-3 ">
            <Textarea
              style={{
                resize: "none",
              }}
              className=" w-full h-full"
            />
          </div>

          <DialogFooter className="pt-3">
            <DialogClose>
              <Button>Finish Editing</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BaseModal>
  );
}

export default TextAreaModal;

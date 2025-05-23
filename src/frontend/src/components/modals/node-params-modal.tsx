import React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentParam } from "@/types/flow/flow-component";
import { ComponentParams } from "../flow/generic-component/comp-params";
import { GenericNode } from "@/types/flow/flow";

const NodeParamsModal = ({
  children,
  show = false,
  node,
  onCancel,
}: {
  children?: React.ReactNode;
  show?: boolean;
  onCancel?: () => void;
  node: GenericNode;
  // nodeInputs: ComponentParam[];
}) => {
  const nodeData = node?.data?.component;

  const handleSaveChange = async () => {
    // How to update the node in the ui
  };
  return (
    <Dialog open={show} onOpenChange={onCancel}>
      {/* <DialogTrigger asChild>
        {children ?? <Button variant="outline">Edit Node</Button>}
      </DialogTrigger> */}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{nodeData?.name}</DialogTitle>
          <DialogDescription>{nodeData?.description}</DialogDescription>
        </DialogHeader>
        <ComponentParams
          className="mb-3 mt-1"
          params={nodeData?.inputs!}
          nodeId={node?.id!}
        />
        <DialogFooter>
          <Button onClick={handleSaveChange} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NodeParamsModal;

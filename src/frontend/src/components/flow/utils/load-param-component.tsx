import {
  ComponentParam,
  ComponentParamTypeEnum,
} from "@/types/flow/flow-component";
import { TextAreaParam } from "../params-components/text-area";
import { TextInputParam } from "../params-components/text-input";
import { FileInputParam } from "../params-components/upload-file";
import { NumberInput, NumberInput2 } from "../params-components/number-input";
import { DropdownParam } from "../params-components/dropdown-param";
import { useState } from "react";
import {
  useNodeId,
  useNodes,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { GenericNode } from "@/types/flow/flow";

export const ParamComponent = ({
  componentName,
  className,
  nodeId,
  ...props // specific node input param
}: {
  className?: string;
  componentName: ComponentParamTypeEnum;
  nodeId?: string;
} & ComponentParam) => {
  //  & Record<string, any>) => {
  const { setNodes } = useReactFlow<GenericNode>();

  // handle update node
  const handleUpdateNode = ({ newValue }: { newValue: any }) => {
    // when we change specific node input value we need to update the whole node

    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          const nodeData = node?.data?.component;
          return {
            ...node,
            data: {
              ...node.data,
              component: {
                ...nodeData,
                inputs: nodeData?.inputs?.map((input) => {
                  if (input.display_name === props.display_name) {
                    return {
                      ...input,
                      value: newValue,
                    };
                  }
                  return input;
                }),
              },
            },
          };
        }
        return node;
      });
    });
  };
  // TODO:: pass handleUpdateNode to other param or see better design
  switch (componentName) {
    // TODO:: add more components
    case "TEXT":
      return (
        <TextInputParam
          handleUpdateNode={handleUpdateNode}
          className={className}
          {...props}
        />
      );
    case "NUMBER":
      return (
        <NumberInput2
          className={className}
          // {...props}
          handleUpdateNode={handleUpdateNode}
          defaultValue={parseFloat(props.value!) as number}
        />
      );
    case "TEXTAREA":
      return (
        <TextAreaParam
          handleUpdateNode={handleUpdateNode}
          className={className}
          {...props}
        />
      );
    case "FILE":
      return <FileInputParam className={className} {...props} />;
    case "DROPDOWN":
      return <DropdownParam className={className} {...props} />;
    default:
      return null;
  }
};

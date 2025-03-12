import { ComponentParamTypeEnum } from "@/types/flow/flow-component";
import { TextAreaParam } from "../params-components/text-area";
import { TextInputParam } from "../params-components/text-input";
import { FileInputParam } from "../params-components/upload-file";

export const ParamComponent = ({
  componentName,
  className,
  ...props
}: {
  className?: string;
  componentName: ComponentParamTypeEnum;
} & Record<string, any>) => {
  switch (componentName) {
    // TODO:: add more components
    case "TEXT":
      return <TextInputParam className={className} {...props} />;
    case "TEXTAREA":
      return <TextAreaParam className={className} {...props} />;
    case "FILE":
      return <FileInputParam className={className} {...props} />;
    default:
      return null;
  }
};

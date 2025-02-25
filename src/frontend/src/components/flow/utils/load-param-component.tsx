import { ComponentParamTypeEnum } from "@/types/flow/flow-component";
import { TextAreaParam } from "../params-components/text-area";
import { TextInputParam } from "../params-components/text-input";

export const ParamComponent = ({
  componentName,
  className,
  ...props
}: {
  className?: string;
  componentName: ComponentParamTypeEnum;
} & Record<string, any>) => {
  switch (componentName) {
    case "TEXT":
      return <TextInputParam className={className} {...props} />;
    case "TEXTAREA":
      return <TextAreaParam className={className} {...props} />;
    default:
      return null;
  }
};

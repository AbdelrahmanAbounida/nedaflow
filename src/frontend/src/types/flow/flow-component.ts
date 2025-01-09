/**
 * Base Component that all components will infer from
 */

// 1- Component >> take inputs + params >> extract output
// So we have main 4 block types (Component, Input/Output 'sameType' , Param) + (Component Category or Type), (Param Category or Type)

export interface Component {
  icon: string;
  name: string; // TODO:: we need to check a way to map to lucid icons
  descriotion: string;
  inputs: ComponentParam[];
  outputs: ComponentParam[];
  type: ComponentTypeEnum;
}

// add here list of all categories we have or will have >> it should be loaded from backend
export enum ComponentTypeEnum {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
  PROMPT = "PROMPT",
  DATA = "DATA",
  PROCESSING = "PROCESSING",
  MODEL = "MODEL",
  VECTOR_STORE = "VECTOR_STORE",
  EMBEDDING = "EMBEDDING",
  AGENT = "AGENT",
  MEMORY = "MEMORY",
  TOOL = "TOOL",
  LOGIC = "LOGIC",
  HELPER = "HELPER",
  BUNDLE = "BUNDLE",
}

export interface ComponentParam {
  name: string;
  value?: string;
  disabled: boolean;
  placeholder?: string;
  required?: boolean;
  hideHandle?: boolean;
  type: ComponentParamEnum; // string input, textarea, slider,...
}

export enum ComponentParamEnum {
  STRING = "STRING",
  TEXT_AREA = "TEXT_AREA",
  SLIDER = "SLIDER",
  FILE = "FILE",
}

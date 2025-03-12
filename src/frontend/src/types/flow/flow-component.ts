/**
 * Base Component that all components will infer from
 */

import { IconDisplyName } from "@/constants/icons";

// 1- Component >> take inputs + params >> extract output
// So we have main 4 block types (Component, Input/Output 'sameType' , Param) + (Component Category or Type), (Param Category or Type)

export interface Component {
  icon: IconDisplyName;
  name: string; // TODO:: we need to check a way to map to lucid icons
  description: string;
  inputs: ComponentParam[];
  outputs: ComponentParam[];
  type: ComponentTypeEnum;
  beta?: boolean;
  code: string;
  minimized?: boolean;
  disabled?: boolean;
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
  // match with input type in the base/types.py
  name: string;
  display_name: string;
  info: string;
  field_type: ComponentParamTypeEnum;
  is_handle?: boolean;
  value?: string;
  disabled: boolean;
  placeholder?: string;
  required?: boolean;
  hideHandle?: boolean;
  show: boolean;
  is_secret?: boolean;
  type: ComponentParamTypeEnum; // NO need for this in general as it is param type
}

// should match components/types.py
export enum ComponentParamTypeEnum {
  TEXT = "TEXT",
  TEXTAREA = "TEXTAREA",
  FILE = "FILE",
  BOOLEAN = "BOOLEAN",
  NUMBER = "NUMBER",
  JSON = "JSON",
  DATA = "DATA",
  DROPDOWN = "DROPDOWN",
  // SLIDER = "SLIDER",
  // FILE = "FILE",
}

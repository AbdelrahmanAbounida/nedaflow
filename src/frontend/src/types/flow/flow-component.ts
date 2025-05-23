/**
 * Base Component that all components will infer from
 */

import { IconDisplayName } from "@/constants/icons";

// 1- Component >> take inputs + params >> extract output
// So we have main 4 block types (Component, Input/Output 'sameType' , Param) + (Component Category or Type), (Param Category or Type)

export interface Component {
  icon: IconDisplayName;
  name: string; // TODO:: we need to check a way to map to lucid icons
  description: string;
  inputs: ComponentParam[];
  outputs: ComponentParam[]; // TODO:: make custom output interface and sync with backend
  dependencies: NodeDependencyDescriptor[]; // TODO:: custom depenedecies interface and sync with backend
  options: string[]; // TODO:: custom Type
  type: ComponentTypeEnum; // TODO:: MAKE SURE TO ADD THIS TYPE TO ANY NEW REGISTERED NODE
  beta?: boolean;
  code: string;
  minimized?: boolean;
  disabled?: boolean;
  is_dep?: boolean;
}

// add here list of all categories we have or will have >> it should be loaded from backend
export enum ComponentTypeEnum {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
  PROMPT = "PROMPT",
  DATA = "DATA",
  PROCESSING = "PROCESSING",
  LLM = "LLM",
  CHAIN = "CHAIN",
  VECTOR_STORE = "VECTOR_STORE",
  EMBEDDING = "EMBEDDING",
  AGENT = "AGENT",
  MEMORY = "MEMORY",
  TOOL = "TOOL",
  LOGIC = "LOGIC",
  HELPER = "HELPER",
  BUNDLE = "BUNDLE",
  TRIGGER = "TRIGGER",
}

export interface ComponentParam {
  // match with input type in the base/types.py
  name: string;
  display_name: string; // TODO:: this name must be unique and we need to verify this either in backend or frontend
  info: string;
  field_type: ComponentParamTypeEnum;
  is_handle?: boolean;
  only_handle?: boolean;
  value?: string; // This type should be based on param type
  disabled: boolean;
  placeholder?: string;
  required?: boolean;
  hideHandle?: boolean;
  show: boolean;
  is_secret?: boolean;
  type: ComponentParamTypeEnum; // NO need for this in general as it is param type
  output_type: ComponentParamTypeEnum;
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
export interface NodeDependencyDescriptor {
  name: string;
  type: NodeDependencyTypeEnum;
  is_required?: boolean;
}

export enum NodeDependencyTypeEnum {
  LLM = "LLM",
}

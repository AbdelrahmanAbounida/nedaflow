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
  only_handle?: boolean;
  value?: string;
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

export const ComponentHandleColors: Record<
  keyof typeof ComponentParamTypeEnum,
  string
> = {
  TEXT: `!border-blue-100 !bg-blue-500 before:bg-blue-500 !shadow-blue-500 hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.5)]`,
  NUMBER: `!border-green-100 !bg-green-500 before:bg-green-500 !shadow-green-500 hover:shadow-[0_0_10px_5px_rgba(34,197,94,0.5)]`,
  TEXTAREA: `!border-purple-100 !bg-purple-500 before:bg-purple-500 !shadow-purple-500 hover:shadow-[0_0_10px_5px_rgba(168,85,247,0.5)]`,
  FILE: `!border-yellow-100 !bg-yellow-500 before:bg-yellow-500 !shadow-yellow-500 hover:shadow-[0_0_10px_5px_rgba(234,179,8,0.5)]`,
  DROPDOWN: `!border-indigo-100 !bg-indigo-500 before:bg-indigo-500 !shadow-indigo-500 hover:shadow-[0_0_10px_5px_rgba(99,102,241,0.5)]`,
  JSON: `!border-pink-100 !bg-pink-500 before:bg-pink-500 !shadow-pink-500 hover:shadow-[0_0_10px_5px_rgba(236,72,153,0.5)]`,
  DATA: `!border-orange-100 !bg-orange-500 before:bg-orange-500 !shadow-orange-500 hover:shadow-[0_0_10px_5px_rgba(249,115,22,0.5)]`,
  BOOLEAN: `!border-teal-100 !bg-teal-500 before:bg-teal-500 !shadow-teal-500 hover:shadow-[0_0_10px_5px_rgba(20,184,166,0.5)]`,
};

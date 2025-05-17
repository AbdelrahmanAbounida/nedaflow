import {
  ComponentParamTypeEnum,
  ComponentTypeEnum,
  NodeDependencyTypeEnum,
} from "./flow-component";

export const ComponentHandleColors: Record<
  keyof typeof ComponentParamTypeEnum | NodeDependencyTypeEnum,
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
  LLM: `!border-sky-100 !bg-sky-500 before:bg-sky-500 !shadow-sky-500 hover:shadow-[0_0_10px_5px_rgba(14,165,233,0.5)]`,
};

export const IconColors: Record<keyof typeof ComponentTypeEnum, string> = {
  INPUT: "!text-pink-500",
  OUTPUT: "!text-blue-500",
  PROMPT: "!text-cyan-600",
  DATA: "!text-yellow-500",
  PROCESSING: "!text-red-500",
  LLM: "!text-orange-500",
  VECTOR_STORE: "!text-indigo-500",
  EMBEDDING: "!text-pink-500 ",
  AGENT: "!text-stone-800",
  MEMORY: "!text-orange-500",
  TOOL: "!text-amber-500",
  LOGIC: "!text-rose-500",
  HELPER: "!text-fuchsia-500",
  BUNDLE: "!text-violet-500",
  TRIGGER: "!text-green-600 ",
  CHAIN: "!text-gray-500",
};

// Make sure to add to safelists
export const NodeColors: Record<keyof typeof ComponentTypeEnum, string> = {
  INPUT: "bg-pink-600",
  OUTPUT: "bg-blue-500",
  PROMPT: "bg-cyan-500",
  DATA: "bg-yellow-500",
  PROCESSING: "bg-red-500",
  LLM: "bg-white",
  VECTOR_STORE: "bg-indigo-600",
  EMBEDDING: "bg-green-300",
  AGENT: "bg-stone-500",
  MEMORY: "bg-purple-600",
  TOOL: "bg-amber-200",
  LOGIC: "bg-rose-500",
  HELPER: "bg-fuchsia-500",
  BUNDLE: "bg-violet-500",
  TRIGGER: "bg-white",
  CHAIN: "bg-gray-500",
};

export const NodeOuterBorders: Record<keyof typeof ComponentTypeEnum, string> =
  {
    INPUT: "bg-pink-600/90",
    OUTPUT: "bg-blue-500/90",
    PROMPT: "bg-cyan-600/90",
    DATA: "bg-yellow-500/90",
    PROCESSING: "bg-red-500/90",
    LLM: "bg-slate-200/90",
    VECTOR_STORE: "bg-indigo-600/90",
    EMBEDDING: "bg-green-600/80",
    AGENT: "bg-stone-700",
    MEMORY: "bg-purple-600/90",
    TOOL: "bg-amber-300/80",
    LOGIC: "bg-rose-500",
    HELPER: "bg-fuchsia-600",
    BUNDLE: "bg-violet-300",
    TRIGGER: "bg-emerald-500/90",
    CHAIN: "bg-gray-300",
  };

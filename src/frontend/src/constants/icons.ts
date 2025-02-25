export type IconDisplyName =
  | keyof typeof SVG_ICONS_REGISTERY
  | keyof typeof PNG_ICONS_REGISTERY;

export const SVG_ICONS_REGISTERY = {
  // lucid
  // Download, Upload, TerminalSquare, Database, ListFilter, BrainCircuit, Layers, Binary, Bot, Link, Paperclip, Link2, Cpu, Compass, FlaskConical, File
  Download: "/assets/icons/download.svg",
  Upload: "/assets/icons/upload.svg",
  TerminalSquare: "/assets/icons/square-terminal.svg",
  Database: "/assets/icons/database.svg",
  ListFilter: "/assets/icons/list-filter.svg",
  BrainCircuit: "/assets/icons/brain-circuit.svg",
  Layers: "/assets/icons/layers.svg",
  Binary: "/assets/icons/binary.svg",
  Bot: "/assets/icons/bot.svg",
  Cpu: "/assets/icons/cpu.svg",
  Hammer: "/assets/icons/hammer.svg",
  Wand2: "/assets/icons/wand-sparkles.svg",
  ArrowRightLeft: "/assets/icons/arrow-right-left.svg",
  MessagesSquare: "/assets/icons/messages-square.svg",
  CircleAlert: "/assets/icons/circle-alert.svg",
  // Others
  LangChain: "/bundles-icons/langchain-icon.svg",
  AgentQL: "/bundles-icons/AgentQL.svg",
  AssemblyAI: "/bundles-icons/AssemblyAI.svg",
  DataStax: "/bundles-icons/datastax.webp",
  LangWatch: "/bundles-icons/langwatch-icon.svg",
  Notion: "/bundles-icons/Notion-logo.svg",
  Needle: "/bundles-icons/needle-icon.svg",
  NVIDIA: "/bundles-icons/nvidia.svg",
  Vectara: "/bundles-icons/vectara.png",
  "Icosa Computing": "/bundles-icons/Icosa.svg",
  Google: "/bundles-icons/google.svg",
  CrewAI: "/bundles-icons/crewai.png",
  NotDiamond: "/bundles-icons/notdiamond-icon.svg",
  Composio: "/bundles-icons/Composio.svg",
  Cohere: "/bundles-icons/cohere.svg",
  Firecrawl: "/bundles-icons/firecrawl.jpeg",
  Unstructured: "/bundles-icons/Unstructured.svg",
  Git: "/bundles-icons/Git.svg",
  Confluence: "/bundles-icons/Confluence.svg",
  // Confluence2: "/bundles-icons/Confluence.svg",
} as const;

export const PNG_ICONS_REGISTERY = {} as const;

export const ALL_ICONS = SVG_ICONS_REGISTERY;

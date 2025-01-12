// TODO:: To be moved to backend and load from api (seed in db)

export interface SidebarItemProps {
  display_name: string;
  name: string;
  icon: string;
}

export const SIDEBAR_CATEGORIES: SidebarItemProps[] = [
  // { display_name: "Saved", name: "saved_components", icon: "GradientSave" },
  { display_name: "Inputs", name: "inputs", icon: "Download" },
  { display_name: "Outputs", name: "outputs", icon: "Upload" },
  { display_name: "Prompts", name: "prompts", icon: "TerminalSquare" },
  { display_name: "Data", name: "data", icon: "Database" },
  { display_name: "Processing", name: "processing", icon: "ListFilter" },
  { display_name: "Models", name: "models", icon: "BrainCircuit" },
  { display_name: "Vector Stores", name: "vectorstores", icon: "Layers" },
  { display_name: "Embeddings", name: "embeddings", icon: "Binary" },
  { display_name: "Agents", name: "agents", icon: "Bot" },
  // { display_name: "Chains", name: "chains", icon: "Link" },
  // { display_name: "Loaders", name: "documentloaders", icon: "Paperclip" },
  // { display_name: "Link Extractors", name: "link_extractors", icon: "Link2" },
  { display_name: "Memories", name: "memories", icon: "Cpu" },
  // { display_name: "Output Parsers", name: "output_parsers", icon: "Compass" },
  // { display_name: "Prototypes", name: "prototypes", icon: "FlaskConical" },
  // { display_name: "Retrievers", name: "retrievers", icon: "FileSearch" },
  // { display_name: "Text Splitters", name: "textsplitters", icon: "Scissors" },
  // { display_name: "Toolkits", name: "toolkits", icon: "Package2" },
  { display_name: "Tools", name: "tools", icon: "Hammer" },
  { display_name: "Logic", name: "logic", icon: "ArrowRightLeft" },
  { display_name: "Helpers", name: "helpers", icon: "Wand2" },
];

export const SIDEBAR_BUNDLES: SidebarItemProps[] = [
  { display_name: "LangChain", name: "langchain_utilities", icon: "LangChain" },
  { display_name: "AgentQL", name: "agentql", icon: "AgentQL" },
  { display_name: "AssemblyAI", name: "assemblyai", icon: "AssemblyAI" },
  {
    display_name: "DataStax",
    name: "astra_assistants",
    icon: "AstraDB",
  },
  { display_name: "LangWatch", name: "langwatch", icon: "Langwatch" },
  { display_name: "Notion", name: "Notion", icon: "Notion" },
  { display_name: "Needle", name: "needle", icon: "Needle" },
  { display_name: "NVIDIA", name: "nvidia", icon: "NVIDIA" },
  { display_name: "Vectara", name: "vectara", icon: "Vectara" },
  { display_name: "Icosa Computing", name: "icosacomputing", icon: "Icosa" },
  { display_name: "Google", name: "google", icon: "Google" },
  { display_name: "CrewAI", name: "crewai", icon: "CrewAI" },
  { display_name: "NotDiamond", name: "notdiamond", icon: "NotDiamond" },
  { display_name: "Composio", name: "composio", icon: "Composio" },
  { display_name: "Cohere", name: "cohere", icon: "Cohere" },
  { display_name: "Firecrawl", name: "firecrawl", icon: "FirecrawlCrawlApi" },
  { display_name: "Unstructured", name: "unstructured", icon: "Unstructured" },
  { display_name: "Git", name: "git", icon: "GitLoader" },
  { display_name: "Confluence", name: "confluence", icon: "Confluence" },
  { display_name: "Mem0", name: "mem0", icon: "Mem0" },
];

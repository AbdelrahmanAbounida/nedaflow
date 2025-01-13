import { SIDEBAR_BUNDLES } from "../flow-sidebar";

// iconName > icon link

export type BundleDisplayNames =
  (typeof SIDEBAR_BUNDLES)[number]["display_name"];

export const BUNDLES_ICONS: Record<BundleDisplayNames, string> = {
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
};

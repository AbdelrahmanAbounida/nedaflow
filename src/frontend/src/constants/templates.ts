// NAV Templates

import { GetStartedCardProps, TemplateCategory } from "@/types/templates";
import {
  SquarePlay,
  LayoutPanelTop,
  BotMessageSquare,
  Tags,
  Terminal,
  Newspaper,
  Database,
  Bot,
  CodeXml,
  MessageSquare,
} from "lucide-react";

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    title: "Templates",
    items: [
      { title: "Get started", icon: SquarePlay, id: "get-started" },
      { title: "All templates", icon: LayoutPanelTop, id: "all-templates" },
    ],
  },
  {
    title: "Use Cases",
    items: [
      { title: "Assistants", icon: BotMessageSquare, id: "assistants" },
      { title: "Classification", icon: Tags, id: "classification" },
      { title: "Coding", icon: Terminal, id: "coding" },
      {
        title: "Content Generation",
        icon: Newspaper,
        id: "content-generation",
      },
      { title: "Q&A", icon: Database, id: "q-a" },
      { title: "Summarization", icon: Bot, id: "summarization" },
      { title: "Web Scraping", icon: CodeXml, id: "web-scraping" },
    ],
  },
  {
    title: "Methodology",
    items: [
      { title: "Prompting", icon: MessageSquare, id: "chatbots" },
      { title: "RAG", icon: Database, id: "rag" },
      { title: "Agents", icon: Bot, id: "agents" },
    ],
  },
];

// TODO:: this should be done in query and loaded from db
export const GET_STARTED_CARDS: GetStartedCardProps[] = [
  {
    category: "prompting",
    bgImage: "/assets/temp-pat-1.png",
    icon: MessageSquare,
    mainTitle: "Basic Prompting",
    description: "Perform basic prompting with an OpenAI model.",
  },
  {
    category: "rag",
    bgImage: "/assets/temp-pat-2.png",
    icon: Database,
    mainTitle: "Vector Store RAG",
    description:
      "Load your data for chat context with Retrieval Augmented Generation.",
  },
  {
    category: "agents",
    bgImage: "/assets/temp-pat-m-3.png",
    icon: Bot,
    mainTitle: "Simple Agent",
    description: "A Simple but powerful starter agent.",
  },
];

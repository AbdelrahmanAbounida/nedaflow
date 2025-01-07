// Naviagation when creating new workflow

import { LucideIcon } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface NavItem {
  title: string;
  icon: LucideIcon;
  id: string;
}

export interface TemplateCategory {
  title: string;
  items: NavItem[];
}

export interface GetStartedCardProps {
  icon: LucideIcon;
  category: string;
  mainTitle: string;
  description: string;
  bgImage: string;
}

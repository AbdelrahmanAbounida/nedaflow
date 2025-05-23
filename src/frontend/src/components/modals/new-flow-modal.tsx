"use client";

import * as React from "react";
import {
  ArrowRight,
  LucideIcon,
  MessageSquare,
  Plus,
  PlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { BaseModal } from "./base-modal";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { GET_STARTED_CARDS, TEMPLATE_CATEGORIES } from "@/constants/templates";
import { useState } from "react";
import { GetStartedCardProps } from "@/types/templates";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

type TabType = (typeof TEMPLATE_CATEGORIES)[number]["items"][number]["id"];
const heightStyle =
  "min-h-[700px] lg:min-h-0 h-[90vh] md:h-[80vh] lg:h-[50vw] lg:max-h-[620px]";

export function NewFlowModal({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [currentTab, setcurrentTab] = useState<TabType>(
    TEMPLATE_CATEGORIES[0]["items"][0]["id"]
  );

  return (
    <BaseModal>
      <Dialog open={open} onOpenChange={setOpen}>
        {/** Trigger */}
        <DialogTrigger asChild className={className}>
          {children || (
            <Button size="sm">
              {" "}
              <Plus className="" /> New Flow
            </Button>
          )}
        </DialogTrigger>

        {/** Main Content */}
        <DialogContent
          aria-description=""
          aria-describedby=""
          className={cn(
            " w-[97vw] max-w-[1200px] overflow-hidden p-0 focus-border-none ring-0 outline-none",
            heightStyle
          )}
        >
          <DialogTitle className="hidden" />
          <SidebarProvider defaultOpen={false} className="">
            <TemplateModalSidenav
              currentTab={currentTab}
              setCurrentTab={setcurrentTab}
            />
            <TemplateNavView currentTab={currentTab} />
          </SidebarProvider>
        </DialogContent>

        {/** Footer */}
      </Dialog>
    </BaseModal>
  );
}

// *********************
// Sidebar
// *********************
const TemplateModalSidenav = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: TabType;
  setCurrentTab: Function;
}) => {
  const isMobile = useIsMobile();
  return (
    <Sidebar
      collapsible={isMobile ? "icon" : "none"}
      className="max-w-[230px] bg-white border-r  "
    >
      <SidebarContent>
        <div
          className={cn("relative flex items-center gap-2 px-2 py-3 md:px-4  ")}
          data-testid="modal-title"
        >
          <div className={cn("font-semibold")}>Templates</div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            {TEMPLATE_CATEGORIES.map((category, index) => (
              <SidebarGroup key={index}>
                <SidebarGroupLabel
                  className={`${
                    index === 0
                      ? "hidden"
                      : "mb-1 text-sm font-semibold text-muted-foreground"
                  }`}
                >
                  {category.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {category.items.map((link) => (
                      <SidebarMenuItem key={link.id}>
                        <SidebarMenuButton
                          onClick={() => setCurrentTab(link.id)}
                          isActive={currentTab === link.id}
                          data-testid={`side_nav_options_${link.title
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          //   tooltip={link.title}
                        >
                          <link.icon
                            className={`h-4 w-4 stroke-2 ${
                              currentTab === link.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span data-testid={`category_title_${link.title}`}>
                            {link.title}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

// *********************
// Main View
// *********************
const TemplateNavView = ({ currentTab }: { currentTab: TabType }) => (
  <main
    className={cn(
      "flex w-full h-full flex-col overflow-hidden p-4",
      heightStyle
    )}
  >
    <TemplateNavHeader currentTab={currentTab} />
    <TemplateNavContent currentTab={currentTab} />
    <TemplateViewFooter />
  </main>
);

// *********************
// Header
// *********************
const TemplateNavHeader = ({ currentTab }: { currentTab: TabType }) => (
  <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    {currentTab === "get-started" ? (
      <div className="flex flex-col">
        <h1 className="text-md font-semibold">Get Started</h1>
        <p className="text-muted-foreground text-sm">
          Start with templates showcasing Nedaflows'Prompting, RAG, and Agent
          use cases.
        </p>
      </div>
    ) : (
      <div className="">Search bar</div>
    )}
  </header>
);

// *********************
// Content
// *********************

const TemplateNavContent = ({ currentTab }: { currentTab: TabType }) => {
  const router = useRouter();
  if (currentTab == "get-started") {
    return (
      <div className="flex flex-1 h-full w-full justify-start  items-start py-5">
        <div className="grid flex-1  h-full grid-cols-1 gap-4 lg:grid-cols-3">
          {GET_STARTED_CARDS.map((card, index) => (
            <GetStartedCard
              onClick={() => router.push("/flow/1")}
              className="flex-1"
              key={index}
              category={card.category}
              icon={card.icon}
              mainTitle={card.mainTitle}
              description={card.description}
              bgImage={card.bgImage}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="aspect-video max-w-3xl rounded-xl bg-muted/50">
          Dynamic
        </div>
      ))}
    </div>
  );
};

const GetStartedCard = ({
  icon,
  category,
  mainTitle,
  description,
  bgImage,
  className,
  onClick,
}: GetStartedCardProps & { className?: string; onClick?: () => void }) => {
  const Icon = icon;
  return (
    <div
      onClick={onClick}
      className={cn(
        "group card-shine-effect relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border ",
        className
      )}
    >
      <div className="absolute z-0 inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] overflow-hidden rounded-2xl">
        <img
          src={bgImage}
          alt={`bg image Spiral`}
          className="hidden h-full w-full object-cover transition-all duration-300 group-hover:scale-[102%] group-focus-visible:scale-[102%] lg:block"
        />
      </div>
      <div className="z-10">
        <div className="flex flex-col p-7 gap-5">
          <div className="flex items-center gap-2">
            <Icon className="text-muted/50  size-4" />
            <p className="uppercase text-muted/80 text-sm font-bold">
              {category}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white">{mainTitle}</p>
            <ArrowRight className="text-white mr-3 h-5 w-5 shrink-0 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-100 group-focus-visible:translate-x-3 group-focus-visible:opacity-100" />{" "}
          </div>
          <p className="text-accent text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

// *********************
// Footer
// *********************

const TemplateViewFooter = () => (
  <DialogFooter className="pb-7 px-1">
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-md font-semibold">Start From Scratch</h1>
        <p className="text-muted-foreground text-sm">
          Begin with a fresh flow to build from scratch
        </p>
      </div>

      <Button className="">
        <PlusIcon className="mr-2 size-4" />
        Blank Flow
      </Button>
    </div>
  </DialogFooter>
);

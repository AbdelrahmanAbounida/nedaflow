import { Button, buttonVariants } from "@/components/ui/button";
import {
  Bot,
  Edit,
  Ellipsis,
  Loader,
  MessageCircle,
  MessageSquareText,
  Play,
  Plus,
  Scroll,
  Trash,
  User,
} from "lucide-react";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "@/components/layout/logo";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFlowStore } from "@/store/flow";
import { getChatTriggerNode } from "@/utils/flow";
import { useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { GenericNode } from "@/types/flow/flow";
import { toast } from "sonner";
import { useBuildFlow } from "@/controllers/flow/mutations";
import { IBuildWorkflow } from "@/types/api";
import { useParams } from "next/navigation";

export const FlowPlayground = () => {
  return <PlaygroundModal />;
};
const PlaygroundModal = () => {
  // This only appeas if the flow nodes contain chat trigger

  // const { showChatInterface } = useFlowStore();
  // const showChatInterface = useFlowStore((state) => state.showChatInterface);
  const nodes = useNodes<GenericNode>();
  const chatTriggerNode = useMemo(() => getChatTriggerNode(nodes), [nodes]);
  const showChatInterface = !!chatTriggerNode;

  if (!chatTriggerNode) {
    // toast.error("This chat flow cant run without a chat trigger node");
    return;
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "",
          buttonVariants({ variant: "default" }),
          !showChatInterface && "hidden"
        )}
      >
        <MessageCircle className="" />
        Chat
      </DialogTrigger>
      <DialogContent
        className={cn(
          " min-w-[95%] min-h-[95%] max-h-[95%] overflow-hidden p-0 focus-border-none ring-0 outline-none",
          ""
        )}
      >
        <SidebarProvider>
          <ChatSidebar className="" />
          <SidebarInset>
            <ChatView />
          </SidebarInset>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};

const ChatSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      {...props}
      className="flex h-full flex-shrink-0 flex-col justify-start transition-all duration-300  z-50 "
    >
      <div className=" overflow-y-auto   p-4 text-center custom-scroll ">
        <SidebarHeader>
          <div className="p-3 flex items-center font-semibold text-[15px]">
            <MessageSquareText className="w-4 h-4 mr-2" />
            Playground
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* We create a SidebarGroup for each parent. */}
          <Button
            variant={"ghost"}
            className="flex items-center justify-center mx-1 bg-white/90 transition-all hover:bg-white border h-9 px-7"
          >
            <div className="flex items-center text-sm">
              <Plus className="mr-2" />
              {/* <MessagesSquare className="w-4 h-4 mr-2" /> */}
              New Chat
            </div>
          </Button>

          <SidebarGroup>
            <SidebarGroupLabel>Today</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="flex items-center justify-between "
                    isActive={true}
                  >
                    <p className="">Chat1</p>
                    <SideChatDropdown />
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="flex items-center justify-between "
                    isActive={false}
                  >
                    <p className="">Chat2</p>
                    <SideChatDropdown />
                  </SidebarMenuButton>{" "}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </div>
    </Sidebar>
  );
};

const SideChatDropdown = () => {
  // return <Ellipsis className="hidden group-hover/menu-item:flex" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="sm"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-7 flex items-center justify-center "
        >
          <Ellipsis className="hidden group-hover/menu-item:flex" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-44 rounded-lg "
        // side={isMobile ? "bottom" : "bottom"}
        side="right"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuItem className="cursor-pointer hover:bg-muted py-2.5">
          <Edit />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-muted py-2.5">
          <Scroll />
          Message Logs
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-muted text-red-500 py-2.5">
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ChatView = () => {
  // TODO:: optimize this in one general funciton
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setcurrentMessage] = useState("");
  const { setNodes } = useReactFlow<GenericNode>();
  const { mutate: mutateBuildFlow, isPending, isError, error } = useBuildFlow();
  const nodes = useNodes<GenericNode>();
  const edges = useEdges();
  const params = useParams();
  const flowId = params?.flowId as string;
  const chatTriggerNode = getChatTriggerNode(nodes);

  if (!chatTriggerNode) {
    toast.error("This chat flow cant run without a chat trigger node");
    return;
  }

  const handleSendMessage = async () => {
    try {
      const chatMessages: ChatMessage[] = [
        ...messages,
        {
          role: "user",
          content: currentMessage,
          timestamp: new Date().toISOString(),
        },
      ];
      setMessages(chatMessages);

      // Update trigger node with these messages
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === chatTriggerNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                component: {
                  ...node.data.component,
                  external_data: {
                    messages: chatMessages,
                  },
                },
              },
            };
          }
          return node;
        });
      });
    } catch (err) {
      console.log({ err });
      toast.error(err + "");
    }
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error + "");
    }
  }, [isError, error]);

  useEffect(() => {
    if (!currentMessage) return;

    const updatedTriggerNode = nodes.find(
      (node) => node.id === chatTriggerNode.id
    );
    const nodeMessages =
      updatedTriggerNode?.data?.component?.external_data?.messages;
    const lastNodeMessage = nodeMessages?.[nodeMessages.length - 1];

    if (lastNodeMessage?.content === currentMessage) {
      // Only mutate if the last message matches the last sent message
      const flow = {
        flow_id: flowId!,
        vertexes: nodes,
        edges: edges,
        name: "asd",
      };
      mutateBuildFlow(flow);
      setcurrentMessage("");
    }
  }, [nodes, currentMessage]);

  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <header className="flex h-16 shrink-0 items-center gap-2  px-4 border-b">
        <SidebarTrigger className="-ml-1" />
      </header>

      {/** Empty Chat  */}
      {/* <EmptyChat /> */}

      {/** Chat With Messages */}
      <ChatWithMessages messages={messages} />

      <div className="mx-auto mb-[69px] w-full max-w-[768px] md:w-5/6 flex flex-col">
        <div
          className={cn(
            "    ",
            "flex w-full hover:border-gray-300 flex-col border-input text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[60px] border-[.1px] rounded-3xl dark:bg-[#303030] p-3 px-4 resize-none bg-muted"
          )}
        >
          <Textarea
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            value={currentMessage}
            onChange={(e) => {
              setcurrentMessage(e.target.value);
            }}
            placeholder="Type a message..."
            className="shadow-none focus:border-none focus:ring-0 ring-0 border-none outline-none resize-none"
            // rows={2}
            // maxLength={200}
          />
          <div className="flex flex-1  w-full items-end justify-end">
            {isPending ? (
              <Button disabled className="cursor-not-allowed">
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Sending
              </Button>
            ) : (
              <Button disabled={isPending} onClick={handleSendMessage}>
                Send
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mx-auto mt-2">
          {/* <Button
            onClick={() => {
              setMessages([]);
              setcurrentMessage("");
            }}
          >
            reset
          </Button> */}
          Press Enter to send your message
        </p>
      </div>
    </div>
  );
};

const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 ">
      <Logo withTitle={false} logoClassName="size-12" />
      <h1 className="font-semibold text-3xl">Playground</h1>
      <p className="text-md text-gray-500">
        Test your workflow with a chat prompt
      </p>
    </div>
  );
};

// Make sure it matches NedaFlowChatMessage (python) interface
interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

const ChatWithMessages = ({ messages }: { messages: ChatMessage[] }) => {
  const [isLoading, setisLoading] = useState(false);

  // const { setNodes } = useReactFlow<GenericNode>();
  const nodes = useNodes<GenericNode>();

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  // const chatTriggerNode = getChatTriggerNode(nodes);

  // if (!chatTriggerNode) {
  //   toast.error("This chat flow cant run without a chat trigger node");
  //   return;
  // }

  // useEffect(() => {
  //   // messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });

  //   // Update trigger node with these messages
  //   setNodes((nodes) => {
  //     return nodes.map((node) => {
  //       if (node.id === chatTriggerNode.id) {
  //         return {
  //           ...node,
  //           data: {
  //             ...node.data,
  //             component: {
  //               ...node.data.component,
  //               external_data: {
  //                 messages: messages,
  //               },
  //             },
  //           },
  //         };
  //       }
  //       return node;
  //     });
  //   });
  // }, [messages]);

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto items-center bg-white dark:bg-transparent">
      <ScrollArea className="flex-1 w-full pb-[110px]">
        <div className="container mx-auto max-w-6xl px-4">
          <div
            ref={messagesContainerRef}
            className="flex flex-col gap-4 py-4 min-h-full"
          >
            {messages.map((message, index) => (
              <ChatMessage
                key={`${index}`}
                role={message.role}
                content={message.content}
              />
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <Loader className="animate-spin w-5 h-5 text-primary ml-5" />
            )}
            <div
              ref={messagesEndRef}
              className="flex-shrink-0 min-w-[24px] min-h-[24px]"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

interface ChatMessageProps {
  content: string | ReactNode;
  role: "user" | "assistant" | "system" | "data";
  timestamp?: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  // TODO:: Implement Markdown rendering
  return (
    <motion.div
      // className={`flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "flex gap-3 p-4 items-start justify-start rounded-md  w-full",
        role === "assistant"
          ? "bg-muted/50"
          : "bg-background dark:bg-zinc-900/40 rounded-xl"
      )}
    >
      <Avatar
        className={cn(
          "h-8 w-8 flex items-center justify-center ",
          role === "assistant" ? "bg-primary" : "bg-muted"
        )}
      >
        {role === "assistant" ? (
          <Bot className="h-4 w-4 text-white" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </Avatar>

      <div className="flex flex-col gap-6 w-full">
        <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4  text-sm items-start justify-start">
          {/* <Markdown>{content as string}</Markdown> */}
          {content}
        </div>
      </div>
    </motion.div>
  );
};

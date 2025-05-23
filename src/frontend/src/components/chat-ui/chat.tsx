"use client";

import { useEffect, useState } from "react";
import { ChatMessage as PreviewMessage } from "@/components/chat-ui/chat-message";
import { Loader } from "lucide-react";
import { ChatInput } from "./chat-input";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Logo from "../layout/logo";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";

export function Chat({
  id,
  initialMessages,
}: {
  id?: string;
  initialMessages: Array<any>;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [chatId, setChatId] = useState<string>(id ?? "");
  const [startChat, setStartChat] = useState(initialMessages.length > 0);
  const [input, setInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const messages: any[] = [];

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  if (!isMounted) return null;

  return !startChat && initialMessages.length === 0 ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-full items-center justify-center flex flex-col"
    >
      <div className="w-full pb-[100px]">
        <main className="container mx-auto px-4 flex flex-col items-center justify-start">
          <div className="max-w-3xl w-full text-center">
            <div className="flex items-center justify-center">
              <Logo className="w-7 mr-2" />
            </div>
            <p className="text-sm mt-1 text-muted-foreground">
              Welcome to NedaFlow 👋, The workflow Builder
            </p>

            <ChatInput
              onSend={() => {
                setStartChat(true);
              }}
              input={input}
              onInputChange={setInput}
            />
          </div>
        </main>
      </div>
    </motion.div>
  ) : (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto items-center bg-white dark:bg-transparent">
      <ScrollArea className="flex-1 w-full pb-[110px]">
        <div className="container mx-auto max-w-6xl px-4">
          <div
            ref={messagesContainerRef}
            className="flex flex-col gap-4 py-4 min-h-full"
          >
            {messages.map((message, index) =>
              message.content.length > 1 ? (
                <PreviewMessage
                  key={`${chatId}-${index}`}
                  role={message.role}
                  content={message.content}
                />
              ) : null
            )}

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

      <div className="w-full fixed bottom-0 max-w-3xl flex items-center justify-center mx-auto">
        <div className="absolute bottom-0 pb-3 bg-white dark:bg-zinc-800 container mx-auto w-full z-100">
          <ChatInput
            onSend={() => {
              if (!id) router.push(`/${chatId}`);
              // handleSubmit();
            }}
            input={input}
            onInputChange={setInput}
          />
        </div>
      </div>
    </div>
  );
}

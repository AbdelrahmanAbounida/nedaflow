"use client";
import { Chat as PreviewChat } from "@/components/chat-ui/chat";

export default function ChatMain() {
  return (
    <div className="w-full h-screen flex pt-10 items-center justify-center">
      <PreviewChat initialMessages={[]} />
    </div>
  );
}

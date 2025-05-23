"use client";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User, Zap } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Markdown } from "./markdown";

interface ChatMessageProps {
  content: string | ReactNode;
  role: "user" | "assistant" | "system" | "data";
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
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
          <Zap className="h-4 w-4 text-white" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </Avatar>

      <div className="flex flex-col gap-6 w-full">
        <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4  text-sm items-start justify-start">
          {content?.toString().length! > 1 && (
            <Markdown>{content as string}</Markdown>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// "use client";

// import { motion } from "framer-motion";
// import { ReactNode } from "react";
// import { Markdown } from "./markdown";
// import { BotIcon, UserIcon } from "lucide-react";

// export const Message = ({
//   role,
//   content,
// }: {
//   role: string;
//   content: string | ReactNode;
// }) => {
//   return (
//     <motion.div
//       className={`flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20`}
//       initial={{ y: 5, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//     >
//       <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-400">
//         {role === "assistant" ? <BotIcon /> : <UserIcon />}
//       </div>

//       <div className="flex flex-col gap-6 w-full">
//         <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
//           <Markdown>{content as string}</Markdown>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

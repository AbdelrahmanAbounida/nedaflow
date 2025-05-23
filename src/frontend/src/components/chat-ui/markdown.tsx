import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  children: string;
}

const NonMemoizedMarkdown: React.FC<MarkdownProps> = ({ children }) => {
  const components = {
    // Code blocks and inline code
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");

      if (!inline && match) {
        return (
          <div className="relative ">
            <pre className="overflow-x-auto">
              <code
                className={`${className} block text-sm bg-zinc-100 dark:bg-zinc-800 
                  px-4 py-3 rounded-lg font-mono leading-relaxed`}
                {...props}
              >
                {children}
              </code>
            </pre>
          </div>
        );
      }

      return (
        <code
          className="px-1.5 py-0.5 text-sm bg-zinc-100 dark:bg-zinc-800 
            rounded font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },

    // Lists
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal list-outside ml-6  space-y-2" {...props}>
        {children}
      </ol>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc list-outside ml-6  space-y-2" {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }: any) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),

    // Text formatting
    p: ({ children, ...props }: any) => (
      <p className=" leading-relaxed" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="font-semibold" {...props}>
        {children}
      </strong>
    ),

    // Links
    a: ({ children, href, ...props }: any) => (
      <Link
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline break-words"
        target="_blank"
        rel="noreferrer noopener"
        {...props}
      >
        {children}
      </Link>
    ),

    // Blockquotes
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className=" border-zinc-300 dark:border-zinc-700 pl-4  italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
      className="prose dark:prose-invert "
    >
      {children}
    </ReactMarkdown>
  );
};

// Memoize the component for better performance
export const Markdown = React.memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

export default Markdown;

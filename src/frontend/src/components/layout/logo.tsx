import { cn } from "@/lib/utils";
import { Target } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React, { FC } from "react";

const Logo: FC<
  Omit<LinkProps, "href"> & {
    href?: string;
    withTitle?: boolean;
    logoClassName?: string;
  }
> = ({ logoClassName, href = "/", withTitle = true, ...props }) => {
  return (
    <Link {...props} href={href} className="flex items-center gap-1 ">
      <Target className={cn("text-primary size-6 ", logoClassName)} />
      {withTitle && (
        <p className="font-bold text-2xl">
          Neda<span className="text-primary">Flow</span>
        </p>
      )}
    </Link>
  );
};

export default Logo;

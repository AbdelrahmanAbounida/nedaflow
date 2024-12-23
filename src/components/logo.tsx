import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn("font-bold text-3xl", className)}>
      <span className="text-primary font-bold">Neda</span>Flow
    </Link>
  );
};

export default Logo;

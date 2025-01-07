import { Target } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React, { FC } from "react";

const Logo: FC<Omit<LinkProps, "href"> & { href?: string }> = ({
  href = "/",
  ...props
}) => {
  return (
    <Link {...props} href={href} className="flex items-center gap-1 ">
      <Target className="text-primary size-6 " />
      <p className="font-bold text-2xl">
        Neda<span className="text-primary">Lang</span>
      </p>
    </Link>
  );
};

export default Logo;

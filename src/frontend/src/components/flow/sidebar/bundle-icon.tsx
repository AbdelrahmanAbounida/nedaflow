import { IconDisplyName, SVG_ICONS_REGISTERY } from "@/constants/icons";
import Image from "next/image";
import React from "react";

export const BundleIcon = ({ icon_name }: { icon_name: IconDisplyName }) => {
  if (!(icon_name in SVG_ICONS_REGISTERY)) {
    return null;
  }

  return (
    <div className="size-4 relative">
      <Image
        src={SVG_ICONS_REGISTERY[icon_name]}
        alt={icon_name}
        fill
        className="absolute"
        // width={17}
        // height={17}
      />
    </div>
  );
};

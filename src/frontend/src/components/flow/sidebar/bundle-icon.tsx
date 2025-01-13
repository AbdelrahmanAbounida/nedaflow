import { BundleDisplayNames, BUNDLES_ICONS } from "@/constants/icons/bundles";
import Image from "next/image";
import React from "react";

export const BundleIcon = ({
  icon_name,
}: {
  icon_name: BundleDisplayNames;
}) => {
  if (!(icon_name in BUNDLES_ICONS)) {
    return null;
  }
  return (
    <div className="size-4 relative">
      <Image
        src={BUNDLES_ICONS[icon_name]}
        alt={icon_name}
        fill
        className="absolute"
        // width={17}
        // height={17}
      />
    </div>
  );
};

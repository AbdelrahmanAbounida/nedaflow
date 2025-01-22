import React from "react";
import * as LucideIcons from "lucide-react";

const checkLucidIcon = (icon: string) => {
  return LucideIcons[icon as keyof typeof LucideIcons] as any;
};

export const ComponentIcon = ({
  icon,
  ...props
}: {
  icon: string;
  props?: LucideIcons.LucideProps;
}) => {
  const LucideIcon = checkLucidIcon(icon);

  if (!LucideIcon) {
    console.warn(`Icon "${icon}" not found in Lucide Icons`);
    return null;
  }

  return (
    <div>
      <LucideIcon {...props} />
    </div>
  );
};

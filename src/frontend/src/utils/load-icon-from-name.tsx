import { lazy, Suspense } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_ICONS, IconDisplyName } from "@/constants/icons";
import Image, { ImageProps } from "next/image";

type IconProps = {
  name: keyof typeof dynamicIconImports;
  color?: string;
  size?: string;
  className?: string;
};

export const LucidIconFromName = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense>
      <LucideIcon className={cn("", className)} {...props} />
    </Suspense>
  );
};

export function getLucideIcon(iconName: string): any {
  if (!iconName) return null;

  const normalizedIconName =
    iconName.charAt(0).toUpperCase() + iconName.slice(1);

  if (normalizedIconName in LucideIcons) {
    return LucideIcons[normalizedIconName as keyof typeof LucideIcons];
  }

  return null;
}

export const LoadIcon = ({
  name,
  ...props
}: { name: IconDisplyName } & Omit<ImageProps, "alt" | "src">) => {
  const iconSrc = ALL_ICONS[name];
  if (!iconSrc) return null;

  return <Image src={iconSrc} alt={name} width={24} height={24} {...props} />;
};

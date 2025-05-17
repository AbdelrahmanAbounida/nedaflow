import { lazy, Suspense } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_ICONS, IconDisplayName } from "@/constants/icons";
import Image, { ImageProps } from "next/image";

type IconProps = {
  name: keyof typeof dynamicIconImports;
  color?: string;
  size?: string;
  className?: string;
};

export const LucidIconFromName = ({ name, className, ...props }: IconProps) => {
  // Correct usage: pass a function returning a promise to lazy
  const LucideIcon = lazy(() => dynamicIconImports[name]());

  return (
    <Suspense
      fallback={<span className="inline-block w-6 h-6 bg-gray-200 rounded" />}
    >
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
}: { name: IconDisplayName } & Omit<ImageProps, "alt" | "src">) => {
  const Icon = getLucideIcon(name);
  if (Icon) {
    return <Icon {...props} />;
  }
  const iconSrc = ALL_ICONS[name];
  return (
    <Image
      className="text-white"
      src={iconSrc}
      alt={name}
      width={24}
      height={24}
      {...props}
    />
  );
};

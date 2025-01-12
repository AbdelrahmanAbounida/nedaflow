import { lazy, Suspense } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import * as LucideIcons from "lucide-react";

type IconProps = {
  name: keyof typeof dynamicIconImports;
  color?: string;
  size?: string;
};

export const LucidIconFromName = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense>
      <LucideIcon {...props} />
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

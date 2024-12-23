import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative  mx-auto h-full flex-col items-center justify-center ">
      {/* <div className="relative hidden h-full flex-col bg-muted p-10 bg-[url('/auth-bg.jpg')] bg-cover bg-no-repeat text-white dark:border-r lg:flex">

      </div> */}
      <div className="p-0 h-full ">{children}</div>
    </div>
  );
}

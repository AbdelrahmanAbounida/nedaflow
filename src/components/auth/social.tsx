"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { toast } from "sonner";
import { useState } from "react";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [loading, setloading] = useState(false);
  const handleSubmit = async (provider: "google" | "github") => {
    try {
      setloading(true);
      signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return loading ? (
    <Button variant={"outline"} className=" w-full" disabled>
      <Loader className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="default"
        className="w-full gap-2 h-8"
        variant="outline"
        onClick={() => handleSubmit("google")}
      >
        <FcGoogle className="h-5 w-5" />
        Google
      </Button>
      {/* <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleSubmit("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button> */}
    </div>
  );
};

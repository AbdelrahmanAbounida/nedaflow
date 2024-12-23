"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth/logout";
import { toast } from "sonner";

export default function Home() {
  return (
    <div className="">
      <Button
        onClick={() => {
          toast.success("Logout");
          logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
}

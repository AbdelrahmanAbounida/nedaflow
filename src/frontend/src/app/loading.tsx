import { Loader } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full items-center justify-center flex">
      <Loader className="size-6 animate-spin" />
    </div>
  );
};

export default LoadingPage;

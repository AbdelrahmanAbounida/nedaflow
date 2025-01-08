import { Loader } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full items-center justify-center flex bg-gray-50 flex-col">
      <Loader className="size-7 text-primary animate-spin" />
      <p className="">Loading...</p>
    </div>
  );
};

export default LoadingPage;

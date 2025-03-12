import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCheck, CircleCheckBig, File, Upload } from "lucide-react";
import React, { useCallback, useState } from "react";

export const FileInputParam = ({ className, ...props }: any) => {
  const [selectedFile, setselectedFile] = useState<File>();
  const handleFileUpload = (e: any) => {
    const selectedFiles: File[] = Array.from(e.target.files || []);
    setselectedFile(selectedFiles[0]);
  };
  return (
    <div
      className={cn(
        " w-full max-w-sm items-center gap-1.5 rounded-lg border h-10 relative hover:bg-gray-100  transition-all",
        className
      )}
      {...props}
    >
      <Input
        id=""
        type="file"
        placeholder=""
        className="absolute  inset-0 z-10  left-0  w-full h-full opacity-0 cursor-pointer "
        onChange={handleFileUpload}
      />
      <p
        className={cn(
          "absolute top-3 text-xs left-3 left text-gray-400",
          selectedFile && " text-sm top-2 text-primary"
        )}
      >
        {selectedFile?.name ?? "Upload Your File Here"}
      </p>

      <Button
        className="absolute right-0 !h-10 w-10 z-0 rounded-lg rounded-l-none "
        variant={"default"}
        size={"icon"}
      >
        {selectedFile ? (
          <CircleCheckBig className="w-4 h-4" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

const TestLoad = () => {
  const [dragActive, setDragActive] = useState(false);
  // const [files, setFiles] = useState<TrainFile[]>(trainFiles);
  const [error, setError] = useState("");

  const handleDragOver = useCallback((e: any) => {
    setError("");
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError("");
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length === 0) {
      console.log("No files dropped");
      return [];
    }
    const selectedFiles: File[] = Array.from(droppedFiles);
    console.log({ selectedFiles: e.dataTransfer.files });
    processAndStoreFiles(selectedFiles);
  };

  const handleFileInput = (e: any) => {
    const selectedFiles: File[] = Array.from(e.target.files || []);
    processAndStoreFiles(selectedFiles);
  };
  const processAndStoreFiles = (files: File[]) => {
    setError("");
    const processedFilesPromises = files.map(
      (file) => {}
      // processFile(file, setError)
    );

    Promise.all(processedFilesPromises).then((processFiles) => {
      // const validfiles = processFiles.filter(
      //   (file): file is TrainFile => file !== null
      // );
    });
  };
  return (
    <div className="">
      <div
        className={cn(
          "rounded-lg border border-zinc-200  bg-white dark:bg-transparent text-zinc-950 shadow-sm dark:border-zinc-800  dark:text-zinc-50"
        )}
      >
        <div className="flex flex-col space-y-1.5 p-6"></div>
        <div className="p-6 pt-0  ">
          <div>
            <div
              onDragEnter={handleDragOver}
              onDragLeave={handleDragOver}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              role="presentation"
            >
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="absolute inset-0 border w-full h-full opacity-0 cursor-pointer"
                accept=".json,.txt,.pdf,.xlsx,.xls,.csv,.docs,.doc, .docx"
              />
              <div className="">upload file here</div>
            </div>

            <div className="pt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

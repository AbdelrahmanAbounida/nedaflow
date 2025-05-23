"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const FormSchema = z.object({
  outFormat: z.enum(["JSON", "CSV"]).default("JSON"),
  // paginationLimit: z.number().min(1).max(100).default(1), >> string number
  paginationLimit: z.string().default("1"),
  includePDF: z.boolean().default(false),
  includeImages: z.boolean().default(false),
  outputDataHeaders: z.string().default(""),
});

const SingleURLChoice = () => {
  const [fetchLoading, setfetchLoading] = useState(false);
  const [fetchedData, setfetchedData] = useState("");

  const selectedChoice = "no-url";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema) as any,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast.success("Form submitted successfully");
  }

  return (
    <div className="w-full">
      {/** In case of One Url */}
      {selectedChoice !== "no-url" ? (
        <Label className="mr-auto">URL</Label>
      ) : (
        <Label className="mr-auto"> Search Query </Label>
      )}

      {/** input */}
      <div className="flex  items-start gap-1 w-full">
        <div className="flex flex-col items-center gap-2 w-full  ">
          {fetchLoading ? (
            <Button disabled className="w-[125px] bg-indigo-600 h-[40px]">
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : selectedChoice == "no-url" ? (
            <Input className="w-full" />
          ) : (
            <Input className=" " />
          )}
        </div>

        <Button
          className="w-[125px]  bg-indigo-600 hover:bg-indigo-700"
          //   onClick={form.handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </div>

      {/** More Options */}
      <Accordion className="w-full" type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="max-w-[155px] mt-2  bg-slate-100 pl-3 p-2 hover:bg-slate-200 text-xs text-center rounded-md cursor-pointer">
            <span className="pl-1">More Options</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full">
              <div className="flex w-full items-center gap-1">
                <Form {...form}>
                  <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-6  w-full"
                  >
                    {/**  output data headers */}
                    <div className="flex w-full items-center gap-5 mt-3">
                      {/** 5 Output Data Headers */}
                      <FormField
                        control={form.control}
                        name="outputDataHeaders"
                        render={({ field }) => (
                          <FormItem className="flex-1 mt-1">
                            <FormLabel className="pl-1">
                              Output data headers
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Enter output data headers with comma seperated. Eg: Name, Email, Phone"
                                className="w-full text-xs placeholder:text-gray-400"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-start gap-10 justify-between w-full ">
                      {/** 1,2 Outputformat and Pagination Limit */}
                      <div className="flex flex-col  items-start flex-1  gap-5 max-w-sm ">
                        <FormField
                          control={form.control}
                          name="outFormat"
                          render={({ field }) => (
                            <FormItem className="flex-1 w-full">
                              {/* <FormLabel className="pl-1 text-xs">Output Format</FormLabel> */}
                              <Select
                                onValueChange={field.onChange}
                                // defaultValue={field.value}
                                defaultValue="CSV"
                              >
                                <FormControl>
                                  <SelectTrigger className=" text-xs  ">
                                    <SelectValue
                                      placeholder="Select output data format"
                                      className="text-red-500 text-xs  "
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="JSON" className="text-xs">
                                    JSON
                                  </SelectItem>
                                  <SelectItem value="CSV" className="text-xs">
                                    CSV
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-xs pl-1">
                                The format in which you want to receive the data
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/** Pagination Limit */}
                        <FormField
                          control={form.control}
                          name="paginationLimit"
                          render={({ field }) => (
                            <FormItem className="flex-1 w-full">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue="1"
                              >
                                <FormControl>
                                  <SelectTrigger className=" text-xs  ">
                                    <SelectValue
                                      placeholder="Select pagination limit (default 1)"
                                      className="text-red-500 text-xs  "
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 10, 20, 50, 100].map(
                                    (limit) => (
                                      <SelectItem
                                        value={limit.toString()}
                                        className="text-xs"
                                      >
                                        {limit}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-xs pl-1">
                                How deeply you want to scrape each url
                                (Pagination Limit)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/** 3,4 Include PDF and Images */}
                      <div className="flex flex-col items-start gap-5  ">
                        <FormField
                          control={form.control}
                          name="includePDF"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Extract content from any PDFs found on the
                                  website
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          disabled
                          control={form.control}
                          name="includeImages"
                          render={({ field }) => (
                            <FormItem className=" opacity-60 flex flex-row items-start space-x-3 space-y-0   ">
                              <FormControl>
                                <Checkbox
                                  disabled
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Extract data from any image on the website
                                  <Badge
                                    variant={"outline"}
                                    className=" ml-2 text-green-600  text-xs"
                                  >
                                    Soon
                                  </Badge>
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* <Button type="submit">Submit</Button> */}
                  </form>
                </Form>

                {/** Output Format Dropdown */}

                {/** Pagination Limit Dropdown */}
              </div>

              <div className="flex w-full items-center gap-1">
                {/** Output format Textarea */}

                {/** include pdf, images choices */}
              </div>

              {/** TODO: Show Modal */}
              <div className="flex items-center gap-1 underline mt-4 text-indigo-700 hover:text-indigo-600 cursor-pointer">
                update default settings
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SingleURLChoice;

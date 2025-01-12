"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Counter = ({ initalCount = 0 }: { initalCount?: number }) => {
  const [currentCount, setcurrentCount] = useState(initalCount);

  const increment = () => {
    setcurrentCount((prev) => prev + 1);
  };
  const decrement = () => {
    setcurrentCount((prev) => prev - 1);
  };
  const reset = () => {
    setcurrentCount((prev) => initalCount);
  };
  const changeSign = () => {
    setcurrentCount((prev) => prev * -1);
  };

  return (
    <div className="flex flex-col gap-2 container max-w-3xl mt-9 w-full  h-full mx-auto ">
      <div
        data-testid="countState"
        className="text-lg mx-auto text-center mt-9 font-bold"
      >
        Current Count = <span className="text-primary">{currentCount}</span>
      </div>

      <div className="flex items-center justify-center gap-2 mt-9">
        <Button onClick={increment}>increment</Button>
        <Button variant={"destructive"} onClick={decrement}>
          decrement
        </Button>
        <Button variant={"secondary"} onClick={reset}>
          reset
        </Button>
        <Button variant={"outline"} onClick={changeSign}>
          change Sign
        </Button>
      </div>
    </div>
  );
};

export const sumNumbers = (...numbers: number[]) => {
  let sum = 0;
  numbers.forEach((num) => {
    sum += num;
  });
  return sum;
};

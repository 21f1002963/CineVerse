"use client";

import { GhostIcon } from "lucide-react";
import React from "react";

const ErrorBoundary = () => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <GhostIcon
        className="w-[100px] h-[100px] animate-bounce text-slate-500"
        strokeWidth={1.4}
      />
      <h5 className="font-bold text-6xl md:text-8xl">404!</h5>
      <p className="text-sm md:text-base text-slate-500">Page not found!</p>
    </div>
  );
};

export default ErrorBoundary;

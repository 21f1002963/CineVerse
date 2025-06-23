import { Loader2Icon } from "lucide-react";
import React from "react";

const GlobalLoading = (props) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2Icon className="w-[100px] h-[100px] animate-spin" />
    </div>
  );
};

export default GlobalLoading;

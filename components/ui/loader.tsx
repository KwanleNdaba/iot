import React from "react";

interface Props {
  text: string;
  size?: "sm" | "md" | "lg";
}

const Loader: React.FC<Props> = ({ text, size = "md" }) => {
  const sizes = {
    sm: {
      border: "border-2",
      textSize: "text-xs",
      spinnerSize: "w-4 h-4",
    },
    md: {
      border: "border-4",
      textSize: "text-sm",
      spinnerSize: "w-6 h-6",
    },
    lg: {
      border: "border-4",
      textSize: "text-base",
      spinnerSize: "w-8 h-8",
    },
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div
        className={`${sizes[size].spinnerSize} ${sizes[size].border} border-transparent
        text-blue-400 animate-spin flex items-center justify-center
        border-t-blue-400 rounded-full relative z-50`}
      >
        <div
          className={`w-[70%] h-[70%] ${sizes[size].border} border-transparent
          text-red-400 animate-spin flex items-center justify-center
          border-t-red-400 rounded-full z-50`}
        />
      </div>
      <span className={`${sizes[size].textSize} whitespace-nowrap z-50`}>
        {text}
      </span>
    </div>
  );
};

export default Loader;


import React from "react";
import { Button } from "@/components/ui/button";

interface QuickReplyProps {
  options: string[];
  onSelect: (option: string) => void;
}

const QuickReply: React.FC<QuickReplyProps> = ({ options, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 my-4 justify-center md:justify-start animate-fade-in">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className="bg-background hover:bg-primary/10 text-foreground border-primary/30 rounded-full text-sm whitespace-nowrap"
          onClick={() => onSelect(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default QuickReply;

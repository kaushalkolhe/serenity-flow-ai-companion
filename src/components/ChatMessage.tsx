
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date | string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  // Convert string timestamp to Date if needed, or use as is if it's already a Date
  const getFormattedTime = () => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Failed to format timestamp:", error);
      return ""; // Return empty string if there's an error
    }
  };
  
  const formattedTime = getFormattedTime();
  
  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 mr-2">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="/bot-avatar.png" alt="Serenity" />
            <AvatarFallback className="bg-primary/20 text-primary">SF</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div className="flex flex-col">
        <div className={cn(
          "chat-bubble",
          isUser ? "chat-bubble-user" : "chat-bubble-bot"
        )}>
          {message}
        </div>
        <span className={cn(
          "text-xs text-muted-foreground mt-1",
          isUser ? "text-right" : "text-left"
        )}>
          {formattedTime}
        </span>
      </div>
      {isUser && (
        <div className="flex-shrink-0 ml-2">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="/user-avatar.png" alt="You" />
            <AvatarFallback className="bg-secondary/20 text-secondary">You</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;


import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "../ChatMessage";
import QuickReply from "../QuickReply";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date | string;
}

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
  onQuickReplySelect: (option: string) => void;
  quickReplyOptions: string[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping,
  onQuickReplySelect,
  quickReplyOptions,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        {messages.length === 1 && (
          <QuickReply options={quickReplyOptions} onSelect={onQuickReplySelect} />
        )}
        
        <div ref={chatEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;

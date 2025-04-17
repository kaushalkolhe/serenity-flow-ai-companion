import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Image, Smile } from "lucide-react";
import ChatMessage from "./ChatMessage";
import QuickReply from "./QuickReply";
import { generateBotResponse } from "@/utils/chatUtils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm Serenity, your AI companion. How are you feeling today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const quickReplyOptions = [
  "I'm feeling anxious today",
  "I'm feeling sad",
  "Can we try meditation?",
  "Tell me about breathing exercises",
  "How can you help me?",
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    const response = generateBotResponse(userMessage);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (input.trim() === "") return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    simulateResponse(input);
    setInput("");
  };
  
  const handleQuickReply = (option: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: option,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    simulateResponse(option);
  };
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div className="flex flex-col h-[calc(100vh-15rem)] md:h-[calc(100vh-14rem)] bg-card rounded-xl shadow-md overflow-hidden border">
      <div className="p-4 bg-muted/30 backdrop-blur-sm border-b">
        <h2 className="text-xl font-serif font-medium">Chat with Serenity</h2>
        <p className="text-sm text-muted-foreground">Your AI companion for emotional support</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
              <span className="text-sm">Serenity is typing...</span>
            </div>
          )}
          
          {messages.length === 1 && (
            <QuickReply options={quickReplyOptions} onSelect={handleQuickReply} />
          )}
          
          <div ref={chatEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <Image className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="floating-input"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

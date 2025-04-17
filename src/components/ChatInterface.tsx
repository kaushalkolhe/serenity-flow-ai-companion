
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Image, Smile } from "lucide-react";
import ChatMessage from "./ChatMessage";
import QuickReply from "./QuickReply";
import { generateAIResponse } from "@/utils/openaiService";
import { activities } from "@/utils/chatUtils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm Serenity, your AI companion for mental health support. How are you feeling today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const quickReplyOptions = [
  "I'm feeling anxious today",
  "I'm feeling sad",
  "Help me with stress management",
  "I need help sleeping",
  "What activities do you recommend?",
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const getActivitySuggestion = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("breathing") || lowerText.includes("breath")) {
      return "deep-breathing";
    } else if (lowerText.includes("meditation") || lowerText.includes("meditate")) {
      return "guided-meditation";
    } else if (lowerText.includes("gratitude") || lowerText.includes("thankful")) {
      return "gratitude";
    } else if (lowerText.includes("mood") || lowerText.includes("feeling")) {
      return "mood-check";
    }
    
    return null;
  };
  
  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    try {
      // Get AI response from OpenAI
      const response = await generateAIResponse(userMessage);
      
      // Check if there's an activity suggestion in the response
      const suggestedActivity = getActivitySuggestion(response);
      
      // Create the AI response message
      const newMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newMessage]);
      
      // If there's a suggested activity, add a follow-up message with the direct link
      if (suggestedActivity) {
        const activity = activities.find(a => a.id === suggestedActivity);
        if (activity) {
          setTimeout(() => {
            const activityMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: `Would you like to try our "${activity.title}" activity? Just click on it in the activities panel.`,
              isUser: false,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, activityMessage]);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Use a basic fallback response if the AI service fails
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        text: "I'm here to support you. How can I help with your mental well-being today?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
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

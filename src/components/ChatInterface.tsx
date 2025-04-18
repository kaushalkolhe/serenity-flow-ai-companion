import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Smile } from "lucide-react";
import ChatMessage from "./ChatMessage";
import QuickReply from "./QuickReply";
import { generateAIResponse } from "@/utils/openaiService";
import { activities } from "@/utils/chatUtils";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date | string;
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Fetch chat history from Supabase
  useEffect(() => {
    const fetchChatHistory = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching chat history:', error);
        return;
      }

      if (data && data.length > 0) {
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          text: msg.message,
          isUser: msg.is_user,
          timestamp: msg.timestamp,
        }));
        setMessages([...initialMessages, ...formattedMessages]);
      }
    };

    fetchChatHistory();
  }, []);

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
      const response = await generateAIResponse(userMessage);
      const suggestedActivity = getActivitySuggestion(response);
      
      const newMessage = {
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      // Save AI message to Supabase
      const { data: savedMessage, error } = await supabase
        .from('chat_messages')
        .insert({
          message: response,
          is_user: false,
          timestamp: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving AI message:', error);
        return;
      }

      setMessages(prev => [...prev, { ...newMessage, id: savedMessage.id }]);
      
      if (suggestedActivity) {
        const activity = activities.find(a => a.id === suggestedActivity);
        if (activity) {
          setTimeout(async () => {
            const activityMessage = {
              text: `Would you like to try our "${activity.title}" activity? Just click on it in the activities panel.`,
              isUser: false,
              timestamp: new Date(),
            };

            const { data: savedActivityMessage, error: activityError } = await supabase
              .from('chat_messages')
              .insert({
                message: activityMessage.text,
                is_user: false,
                timestamp: new Date().toISOString(),
              })
              .select()
              .single();

            if (!activityError) {
              setMessages(prev => [...prev, { ...activityMessage, id: savedActivityMessage.id }]);
            }
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
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

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (input.trim() === "") return;

    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    // Save user message to Supabase
    const { data: savedMessage, error } = await supabase
      .from('chat_messages')
      .insert({
        message: input,
        is_user: true,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving user message:', error);
      return;
    }

    setMessages(prev => [...prev, { ...userMessage, id: savedMessage.id }]);
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

  const clearChat = async () => {
    if (confirm("Are you sure you want to clear your chat history?")) {
      // Delete all chat messages from Supabase
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .neq('id', '0');

      if (error) {
        console.error('Error clearing chat history:', error);
        return;
      }

      setMessages(initialMessages);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-card rounded-xl shadow-md overflow-hidden border">
      <div className="p-4 bg-muted/30 backdrop-blur-sm border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-serif font-medium">Chat with Serenity</h2>
          <p className="text-sm text-muted-foreground">Your AI companion for emotional support</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearChat}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear Chat
        </Button>
      </div>
      
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
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="floating-input"
          />
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

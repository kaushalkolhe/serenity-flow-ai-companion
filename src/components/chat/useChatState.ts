
import { useState } from "react";
import { Message, initialMessages } from "./types";
import { useMessageSubscription } from "./useMessageSubscription";
import { useChatHistory } from "./useChatHistory";
import { generateResponse, saveMessage, clearChatHistory } from "./messageOperations";
import { toast } from "@/hooks/use-toast";

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useMessageSubscription(setMessages);
  useChatHistory(setMessages);

  const handleSendMessage = async (input: string) => {
    try {
      const savedMessage = await saveMessage(input, true);
      
      const userMessage = {
        id: savedMessage.id,
        text: input,
        isUser: true,
        timestamp: savedMessage.timestamp,
      };

      setMessages(prev => [...prev, userMessage]);
      generateResponse(input, setMessages, setIsTyping);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      toast({
        title: "Error sending message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const clearChat = async () => {
    if (confirm("Are you sure you want to clear your chat history?")) {
      try {
        await clearChatHistory();
        setMessages(initialMessages);
        toast({
          title: "Chat cleared",
          description: "Your chat history has been cleared",
        });
      } catch (error) {
        console.error('Error in clearChat:', error);
        toast({
          title: "Error clearing chat",
          description: "Please try again",
          variant: "destructive",
        });
      }
    }
  };

  return {
    messages,
    isTyping,
    handleSendMessage,
    clearChat,
  };
};

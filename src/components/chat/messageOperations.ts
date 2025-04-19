
import { supabase } from "@/integrations/supabase/client";
import { generateAIResponse } from "@/utils/openaiService";
import { toast } from "@/hooks/use-toast";
import { Message } from "./types";

export const saveMessage = async (message: string, isUser: boolean) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      message,
      is_user: isUser,
      timestamp: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error('Error saving message');
  }

  return data;
};

export const clearChatHistory = async () => {
  const { error } = await supabase
    .from('chat_messages')
    .delete()
    .neq('id', '0');

  if (error) {
    throw new Error('Error clearing chat history');
  }
};

export const generateResponse = async (
  userMessage: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsTyping: (value: boolean) => void
) => {
  setIsTyping(true);
  
  try {
    const response = await generateAIResponse(userMessage);
    const savedMessage = await saveMessage(response, false);

    const newMessage = {
      id: savedMessage.id,
      text: response,
      isUser: false,
      timestamp: savedMessage.timestamp,
    };

    setMessages(prev => [...prev, newMessage]);
    
  } catch (error) {
    console.error("Error getting AI response:", error);
    toast({
      title: "Error getting AI response",
      description: "Please try again",
      variant: "destructive",
    });
    
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

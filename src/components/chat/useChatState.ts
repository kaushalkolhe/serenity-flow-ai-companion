
import { useState, useEffect } from "react";
import { generateAIResponse } from "@/utils/openaiService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

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

  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    try {
      const response = await generateAIResponse(userMessage);
      
      const newMessage = {
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

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

  const handleSendMessage = async (input: string) => {
    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

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
  };

  const clearChat = async () => {
    if (confirm("Are you sure you want to clear your chat history?")) {
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

  return {
    messages,
    isTyping,
    handleSendMessage,
    clearChat,
  };
};

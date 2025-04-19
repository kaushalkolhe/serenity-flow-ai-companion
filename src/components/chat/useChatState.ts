
import { useState, useEffect } from "react";
import { generateAIResponse } from "@/utils/openaiService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { RealtimeChannel } from "@supabase/supabase-js";

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

  // Set up real-time subscription
  useEffect(() => {
    const channel: RealtimeChannel = supabase
      .channel('chat-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMessage = {
              id: payload.new.id,
              text: payload.new.message,
              isUser: payload.new.is_user,
              timestamp: payload.new.timestamp,
            };
            setMessages((prev) => 
              // Avoid duplicate messages if we were the ones who inserted it
              prev.some(msg => msg.id === newMessage.id) 
                ? prev 
                : [...prev, newMessage]
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('timestamp', { ascending: true });

        if (error) {
          console.error('Error fetching chat history:', error);
          toast({
            title: "Error loading chat history",
            description: "Please try refreshing the page",
            variant: "destructive",
          });
          return;
        }

        if (data && data.length > 0) {
          // Only show welcome message if no previous messages
          const formattedMessages = data.map(msg => ({
            id: msg.id,
            text: msg.message,
            isUser: msg.is_user,
            timestamp: msg.timestamp,
          }));
          
          setMessages(formattedMessages.length > 0 ? formattedMessages : initialMessages);
        }
      } catch (error) {
        console.error('Error in fetchChatHistory:', error);
        toast({
          title: "Error loading chat history",
          description: "Please try refreshing the page",
          variant: "destructive",
        });
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
        toast({
          title: "Error saving message",
          description: "Your message couldn't be saved",
          variant: "destructive",
        });
        return;
      }

      setMessages(prev => [...prev, { ...newMessage, id: savedMessage.id }]);
      
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

  const handleSendMessage = async (input: string) => {
    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    try {
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
        toast({
          title: "Error sending message",
          description: "Please try again",
          variant: "destructive",
        });
        return;
      }

      setMessages(prev => [...prev, { ...userMessage, id: savedMessage.id }]);
      simulateResponse(input);
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
        const { error } = await supabase
          .from('chat_messages')
          .delete()
          .neq('id', '0');

        if (error) {
          console.error('Error clearing chat history:', error);
          toast({
            title: "Error clearing chat",
            description: "Please try again",
            variant: "destructive",
          });
          return;
        }

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

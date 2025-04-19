
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Message, initialMessages } from "./types";

export const useChatHistory = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
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
  }, [setMessages]);
};

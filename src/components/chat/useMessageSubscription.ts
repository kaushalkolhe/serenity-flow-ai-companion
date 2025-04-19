
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "./types";
import { RealtimeChannel } from "@supabase/supabase-js";

export const useMessageSubscription = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
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
  }, [setMessages]);
};

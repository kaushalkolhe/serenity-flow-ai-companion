
import ChatHeader from "./chat/ChatHeader";
import ChatMessageList from "./chat/ChatMessageList";
import ChatInput from "./chat/ChatInput";
import { useChatState } from "./chat/useChatState";

const quickReplyOptions = [
  "I'm feeling anxious today",
  "I'm feeling sad",
  "Help me with stress management",
  "I need help sleeping",
  "What activities do you recommend for mindfulness?",
  "How can I improve my mental well-being?",
];

const ChatInterface: React.FC = () => {
  const { messages, isTyping, handleSendMessage, clearChat } = useChatState();

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-card rounded-xl shadow-md overflow-hidden border">
      <ChatHeader onClearChat={clearChat} />
      
      <ChatMessageList
        messages={messages}
        isTyping={isTyping}
        onQuickReplySelect={handleSendMessage}
        quickReplyOptions={quickReplyOptions}
      />
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;

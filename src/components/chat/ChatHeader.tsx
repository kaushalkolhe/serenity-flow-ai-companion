
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat }) => {
  return (
    <div className="p-4 bg-muted/30 backdrop-blur-sm border-b flex justify-between items-center">
      <div>
        <h2 className="text-xl font-serif font-medium">Chat with Serenity</h2>
        <p className="text-sm text-muted-foreground">Your AI companion for emotional support</p>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearChat}
        className="text-muted-foreground hover:text-foreground"
      >
        Clear Chat
      </Button>
    </div>
  );
};

export default ChatHeader;

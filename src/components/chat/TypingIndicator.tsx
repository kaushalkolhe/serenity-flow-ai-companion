
const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
      <span className="text-sm">Serenity is typing...</span>
    </div>
  );
};

export default TypingIndicator;

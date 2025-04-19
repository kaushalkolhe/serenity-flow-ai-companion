
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date | string;
}

export const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm Serenity, your AI companion for mental health support. How are you feeling today?",
    isUser: false,
    timestamp: new Date(),
  },
];

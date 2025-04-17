
export const generateBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
    return "I understand anxiety can be challenging. Would you like to try a deep breathing exercise? It can help calm your nerves. Just type 'yes' to begin.";
  } else if (lowerMessage.includes("sad") || lowerMessage.includes("depressed")) {
    return "I'm sorry you're feeling down. Remember it's okay to feel this way. Would you like to try a guided meditation to help lift your mood?";
  } else if (lowerMessage.includes("yes") && lowerMessage.length < 5) {
    return "Great! Let's begin. Click on 'Deep Breathing' in the daily activities panel to start a guided breathing exercise.";
  } else if (lowerMessage.includes("no") && lowerMessage.length < 5) {
    return "That's okay. I'm here whenever you'd like to talk or try an exercise. How else can I support you today?";
  } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hi! How are you feeling today? You can tell me about your mood, or we can try some relaxation exercises together.";
  }
  return "I'm here to support you. Would you like to try any of our daily activities? They can help improve your mood and reduce stress.";
};

export interface Activity {
  id: string;
  title: string;
  content: string;
  duration?: number;
  type: 'breathing' | 'meditation' | 'gratitude' | 'mood';
}

export const activities: Activity[] = [
  {
    id: 'deep-breathing',
    title: 'Deep Breathing',
    type: 'breathing',
    duration: 180,
    content: "Find a comfortable position. Breathe in through your nose for 4 counts, hold for 4, then exhale through your mouth for 6 counts. Let's begin..."
  },
  {
    id: 'guided-meditation',
    title: 'Guided Meditation',
    type: 'meditation',
    duration: 300,
    content: "Close your eyes and focus on your breath. Notice the sensation of breathing without trying to change it. If your mind wanders, gently bring it back to your breath..."
  },
  {
    id: 'gratitude',
    title: 'Gratitude Journal',
    type: 'gratitude',
    content: "Take a moment to write down three things you're grateful for today. They can be simple things like a warm cup of coffee or a friendly smile..."
  },
  {
    id: 'mood-check',
    title: 'Mood Check-in',
    type: 'mood',
    content: "How are you feeling right now? Use our mood tracker to log your current emotional state and track your well-being over time."
  }
];

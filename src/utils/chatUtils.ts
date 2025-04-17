
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
  description?: string;
  steps?: string[];
  duration?: number;
  type: 'breathing' | 'meditation' | 'gratitude' | 'mood';
}

export const activities: Activity[] = [
  {
    id: 'deep-breathing',
    title: 'Deep Breathing',
    type: 'breathing',
    duration: 180,
    description: "Deep breathing is a powerful technique to reduce stress, anxiety, and promote relaxation by activating your parasympathetic nervous system.",
    steps: [
      "Find a comfortable seated position with your back straight",
      "Place one hand on your chest and the other on your abdomen",
      "Inhale slowly through your nose for 4 counts, feeling your abdomen expand",
      "Hold your breath for 4 counts",
      "Exhale slowly through your mouth for 6 counts",
      "Repeat this cycle for 3 minutes"
    ],
    content: "Find a comfortable position with your back straight. Place one hand on your chest and the other on your abdomen. Breathe in through your nose for 4 counts, feeling your abdomen expand. Hold for 4 counts. Then exhale slowly through your mouth for 6 counts. Let's practice this rhythm together for the next few minutes."
  },
  {
    id: 'guided-meditation',
    title: 'Guided Meditation',
    type: 'meditation',
    duration: 300,
    description: "This mindfulness meditation helps you center yourself in the present moment, reducing worry about the past or future.",
    steps: [
      "Find a comfortable seated position where you won't be disturbed",
      "Close your eyes gently and take a few deep breaths",
      "Begin to notice your natural breathing without changing it",
      "When thoughts arise, acknowledge them without judgment",
      "Gently return your focus to your breath each time your mind wanders",
      "Continue this practice, cultivating awareness of the present moment"
    ],
    content: "Find a quiet place where you won't be disturbed. Sit comfortably with your back straight but not rigid. Close your eyes gently. Take a few deep breaths to settle in. Now, allow your breath to return to its natural rhythm. Notice the sensation of breathing—the rise and fall of your abdomen, the air moving through your nostrils. When your mind wanders—and it will—gently acknowledge the thought without judgment, then return your focus to your breath. This is the practice of mindfulness: returning to the present moment again and again."
  },
  {
    id: 'gratitude',
    title: 'Gratitude Journal',
    type: 'gratitude',
    description: "Practicing gratitude has been shown to increase happiness, reduce depression, and improve overall well-being.",
    steps: [
      "Find a quiet moment to reflect on your day",
      "Think of three specific things you're grateful for today",
      "For each item, write down why it matters to you",
      "Include small moments of joy, not just big events",
      "Try to find new things to be grateful for each day",
      "Review your entries regularly to reinforce positive thinking"
    ],
    content: "Take a moment to reflect on your day and write down three specific things you're grateful for. They can be simple moments, people in your life, or aspects of yourself. For each item, explain why you're grateful for it and how it made you feel. Research shows that regularly practicing gratitude can significantly improve mental well-being by shifting focus from what's lacking to what's present in your life. Some prompts to consider:\n\n• What made you smile today?\n• Who made a positive difference in your day?\n• What personal strength helped you today?\n• What beauty did you notice in your surroundings?\n• What challenge are you grateful for because it helped you grow?"
  },
  {
    id: 'mood-check',
    title: 'Mood Check-in',
    type: 'mood',
    description: "Regular mood tracking helps identify patterns and triggers in your emotional health, leading to better self-awareness.",
    steps: [
      "Take a moment to pause and notice how you're feeling right now",
      "Rate your current mood on a scale from 1-10",
      "Identify the primary emotions you're experiencing",
      "Note any factors that might be influencing your mood",
      "Consider what might help improve your mood if needed",
      "Track these check-ins over time to identify patterns"
    ],
    content: "How are you feeling right now? Take a moment to check in with yourself. Rate your current mood on a scale from 1-10. What emotions are you experiencing? Try to name them specifically (e.g., joyful, frustrated, anxious, peaceful). What might be contributing to how you're feeling? Are there any patterns you've noticed about when or why your mood changes? Regular mood tracking can help you identify triggers and develop strategies to manage your emotions more effectively."
  }
];

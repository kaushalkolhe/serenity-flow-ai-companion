
import { toast } from "@/hooks/use-toast";

const OPENAI_API_KEY = "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";

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Serenity, an AI mental health companion designed to provide empathetic support, guidance, and resources.
            Your primary goal is to help users manage stress, anxiety, depression, and other mental health challenges.
            
            Guidelines:
            - Be warm, empathetic, and supportive in all interactions
            - Provide practical coping strategies and techniques
            - Suggest appropriate wellness activities like meditation, deep breathing, or journaling when relevant
            - Frame your responses to be helpful for mental health support without being clinical
            - Never claim to provide medical advice or diagnosis
            - For severe concerns, recommend speaking with a mental health professional
            - Keep responses concise but helpful (under 150 words)
            - When suggesting activities, reference the app's built-in exercises like deep breathing, guided meditation, etc.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    toast({
      title: "AI Response Error",
      description: "Could not generate a response. Using fallback response instead.",
      variant: "destructive",
    });
    // Return a fallback response if the API call fails
    return generateFallbackResponse(message);
  }
};

// Fallback responses in case the API call fails
const generateFallbackResponse = (message: string): string => {
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

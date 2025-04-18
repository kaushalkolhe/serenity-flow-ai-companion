
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
            
            Core Guidelines:
            - Be exceptionally warm, empathetic, and supportive in all interactions
            - Provide evidence-based coping strategies and techniques from CBT, DBT, mindfulness and positive psychology
            - Suggest specific wellness activities like meditation, deep breathing, or journaling when relevant
            - Use a warm, conversational tone that feels like talking to a supportive friend
            - Never claim to provide medical advice, diagnosis, or treatment
            - If someone appears to be in crisis, advise them to contact a crisis helpline, local emergency services, or to speak with a qualified mental health professional
            - Recognize when to suggest professional help - severe symptoms, safety concerns, persistent issues
            - Keep responses concise but helpful (under 120 words)
            - Tailor your tone to match the user's emotional state - calm and soothing for anxiety, encouraging for depression
            - Listen actively by reflecting back what you hear from the user
            - Share specific techniques rather than general advice ('Try box breathing: 4 counts in, 4 hold, 4 out' rather than 'Try breathing exercises')
            - When suggesting activities, reference the app's built-in exercises like deep breathing, guided meditation, gratitude journaling, and mood tracking`
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
    return "I understand anxiety can be challenging. Would you like to try a deep breathing exercise? It can help calm your nervous system by activating your parasympathetic response. Just type 'yes' to begin, or we can explore other coping strategies.";
  } else if (lowerMessage.includes("sad") || lowerMessage.includes("depressed")) {
    return "I'm sorry you're feeling down. Remember that your emotions are valid and it's okay to feel this way. Would you like to try a guided meditation to help ground yourself in the present moment? Sometimes gentle mindfulness can provide some relief.";
  } else if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelm")) {
    return "When you're feeling overwhelmed, it helps to break things down into smaller, manageable steps. Perhaps start with a 2-minute breathing exercise to center yourself. Would you like to try that first, or would you prefer to talk about what's causing your stress?";
  } else if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia")) {
    return "Sleep difficulties can be frustrating. Have you tried creating a wind-down routine? Our guided meditation might help quiet your mind before bed. Also, limiting screen time and keeping a consistent sleep schedule can make a big difference.";
  } else if (lowerMessage.includes("yes") && lowerMessage.length < 5) {
    return "Great! Let's begin. Click on 'Deep Breathing' in the daily activities panel to start a guided breathing exercise. I'll be here when you're done to discuss how it went.";
  } else if (lowerMessage.includes("no") && lowerMessage.length < 5) {
    return "That's perfectly okay. We can try something different. Would you like to talk more about what you're experiencing, or perhaps explore another coping technique that might resonate better with you?";
  } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hi! I'm here to support your mental wellbeing. How are you feeling today? You can share openly or we can explore some relaxation activities together. What would be most helpful right now?";
  }
  return "I'm here to support your mental health journey. Would you like to try one of our wellness activities? They're designed to help reduce stress, improve mood, and build resilience. Or we can simply chat about what's on your mind.";
};

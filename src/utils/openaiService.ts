import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('chat-completion', {
      body: { message }
    });

    if (error) throw error;

    return data.response;
  } catch (error) {
    console.error('Error calling Edge Function:', error);
    toast({
      title: "AI Response Error",
      description: "Could not generate a response. Using fallback response instead.",
      variant: "destructive",
    });
    return generateFallbackResponse(message);
  }
};

const generateFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check for non-mental health content
  const mentalHealthKeywords = ['stress', 'anxiety', 'depression', 'mental health', 'well-being', 'emotion', 'feel', 'sad', 'happy', 'therapy', 'counseling', 'mood', 'panic', 'self-care', 'sleep', 'motivation', 'grief', 'loneliness', 'anger', 'fear'];
  const containsMentalHealthContent = mentalHealthKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (!containsMentalHealthContent) {
    return "I'm sorry, but I'm only able to assist with mental health-related questions. Is there something about your mental well-being you'd like to discuss?";
  }
  
  // Check for crisis keywords first
  if (lowerMessage.includes("suicide") || 
      lowerMessage.includes("kill myself") || 
      lowerMessage.includes("want to die") ||
      lowerMessage.includes("end my life") ||
      lowerMessage.includes("self harm")) {
    return `I'm deeply concerned about what you're sharing, and I want you to know that you're not alone. Your life matters. Please reach out to these 24/7 professional helplines immediately:

    • Tele-MANAS: 14416 or 1800-891-4416 (24/7, multiple languages)
    • KIRAN: 1800-599-0019 (24/7, national helpline)
    • Mpower: 1800-120-820050 (24/7, free counseling)
    • iCall (TISS): 9152987821 (Monday-Saturday, 8 AM-10 PM)
    • Samaritans Mumbai: +91 84229 84528/29/30 (3 PM-9 PM, daily)

    If you're in immediate danger, please call emergency services right away. Would you like to talk about what's troubling you? I'm here to listen without judgment.`;
  }

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

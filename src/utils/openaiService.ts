
import { toast } from "@/hooks/use-toast";

const OPENROUTER_API_KEY = "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";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Serenity Flow Mental Health Companion'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
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
            - If someone appears to be in crisis, ALWAYS provide the following Indian helpline numbers:
              * Tele-MANAS: 14416 or 1800-891-4416 (24/7, multiple languages)
              * KIRAN: 1800-599-0019 (24/7, national helpline)
              * Mpower: 1800-120-820050 (24/7, free counseling)
              * iCall (TISS): 9152987821 (Monday-Saturday, 8 AM-10 PM)
              * Samaritans Mumbai: +91 84229 84528/29/30 (3 PM-9 PM, daily)
            - For severe symptoms, safety concerns, or persistent issues, always suggest professional help
            - Keep responses concise but helpful (under 120 words)
            - Tailor your tone to match the user's emotional state
            - Listen actively by reflecting back what you hear from the user
            - Share specific techniques rather than general advice
            - Only respond to mental health-related queries. For any non-mental health questions, politely decline and say "I'm sorry, but I'm only able to assist with mental health-related questions. Is there something about your mental well-being you'd like to discuss?"
            - If the user asks about suicide, self-harm, or expresses wanting to die, immediately provide helpline information and encourage professional support.`
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
    console.error('Error calling OpenRouter API:', error);
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

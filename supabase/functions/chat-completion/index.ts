
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    console.log('Received message:', message)

    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
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
            - If someone appears to be in crisis, ALWAYS provide the following Indian helpline numbers:
              * Tele-MANAS: 14416 or 1800-891-4416 (24/7, multiple languages)
              * KIRAN: 1800-599-0019 (24/7, national helpline)
              * Mpower: 1800-120-820050 (24/7, free counseling)
              * iCall (TISS): 9152987821 (Monday-Saturday, 8 AM-10 PM)
              * Samaritans Mumbai: +91 84229 84528/29/30 (3 PM-9 PM, daily)
            - For severe symptoms, safety concerns, or persistent issues, always suggest professional help
            - Keep responses concise but helpful (under 120 words)
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
    })

    const data = await response.json()
    console.log('OpenAI API response:', data)

    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      },
    )
  }
})

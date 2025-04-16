
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import MoodTracker from "@/components/MoodTracker";
import StoryCard from "@/components/StoryCard";
import { MessageSquare, Book, BarChart4, Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-serenity-400" />,
      title: "AI Companion",
      description: "Chat with Serenity, your empathetic AI companion for emotional support.",
    },
    {
      icon: <Book className="h-8 w-8 text-nature-400" />,
      title: "Adaptive Stories",
      description: "Experience personalized stories that adapt to your emotional state.",
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-calm-400" />,
      title: "Mood Tracking",
      description: "Track your emotional journey and discover patterns over time.",
    },
    {
      icon: <Brain className="h-8 w-8 text-warmth-400" />,
      title: "Mindfulness Tools",
      description: "Access guided meditations and exercises for mental well-being.",
    },
  ];

  const stories = [
    {
      title: "The Calming Forest",
      description: "A serene journey through an enchanted forest to help quiet your mind.",
      mood: "Anxious",
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    },
    {
      title: "Ocean of Possibilities",
      description: "Explore the vast ocean of potential within yourself through this uplifting story.",
      mood: "Sad",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      title: "Starlight Meditation",
      description: "A gentle guided meditation under the stars to help you find peace.",
      mood: "Calm",
      imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    },
  ];

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-foreground">
                Your AI Companion <br />
                for Mental Wellness
              </h1>
              <p className="text-lg text-muted-foreground max-w-prose">
                Serenity Flow provides personalized emotional support, adaptive storytelling, 
                and mindfulness tools to help you navigate life's ups and downs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/chat")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg h-auto"
                >
                  Chat with Serenity
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/resources")}
                  className="rounded-full px-8 py-6 text-lg h-auto"
                >
                  Explore Resources
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-serenity-100 to-serenity-200 animate-breathing">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-calm-200 opacity-50 animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-nature-200 opacity-50 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-warmth-200 opacity-50 animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
                <div className="w-full h-full flex items-center justify-center">
                  <h2 className="text-3xl font-serif text-foreground/80">Serenity Flow</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">How Serenity Flow Helps You</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border transition-all hover:shadow-md">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <MoodTracker />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-serif font-bold mb-6">Stories for Your Mood</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stories.map((story, index) => (
                  <StoryCard
                    key={index}
                    title={story.title}
                    description={story.description}
                    mood={story.mood}
                    imageUrl={story.imageUrl}
                    onClick={() => navigate("/stories")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-serenity-50 to-calm-50">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold font-serif mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start your mental wellness journey today with Serenity Flow.
            Our AI companion is here to support you 24/7.
          </p>
          <Button 
            onClick={() => navigate("/chat")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg h-auto"
          >
            Chat Now
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

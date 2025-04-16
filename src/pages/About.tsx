
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Heart, Brain, AlertTriangle } from "lucide-react";

const About = () => {
  const principles = [
    {
      icon: <Shield className="h-8 w-8 text-serenity-400" />,
      title: "Privacy & Security",
      description: "Your data is encrypted and protected. We prioritize your privacy and confidentiality.",
    },
    {
      icon: <Heart className="h-8 w-8 text-warmth-400" />,
      title: "Empathy & Support",
      description: "Our AI is designed to provide empathetic, judgment-free support for your mental wellness journey.",
    },
    {
      icon: <Brain className="h-8 w-8 text-calm-400" />,
      title: "Evidence-Based Approach",
      description: "Our features are informed by cognitive behavioral therapy and mindfulness practices.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-nature-400" />,
      title: "Accessibility",
      description: "Mental wellness support should be accessible to everyone, regardless of location or background.",
    },
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold font-serif mb-4">About Serenity Flow</h1>
          <p className="text-lg text-muted-foreground">
            We're on a mission to make mental wellness support accessible to everyone through
            innovative AI technology and evidence-based approaches.
          </p>
        </div>

        <div className="grid gap-12">
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-4">
                  Serenity Flow was created to provide accessible, empathetic mental wellness
                  support through AI technology. We believe everyone deserves access to tools
                  that can help them navigate life's challenges.
                </p>
                <p className="text-lg mb-4">
                  Our AI companion combines cognitive behavioral therapy principles with
                  innovative features like adaptive storytelling and mood tracking to provide
                  personalized support whenever you need it.
                </p>
                <p className="text-lg">
                  While we're not a replacement for professional therapy, we aim to be a
                  supportive presence in your daily life and a bridge to professional
                  care when needed.
                </p>
              </div>
              <div className="bg-gradient-to-br from-serenity-100 to-calm-100 rounded-2xl p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-medium mb-4">Compassionate AI Support</h3>
                  <p className="text-muted-foreground">
                    Accessible mental wellness support,
                    anytime, anywhere.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-6">Our Principles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <Card key={index} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {principle.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                        <p className="text-muted-foreground">{principle.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-6">Important Notice</h2>
            <Card className="border-warmth-200 bg-warmth-50 dark:bg-warmth-900/10">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-warmth-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Not a Replacement for Professional Help</h3>
                    <p className="text-muted-foreground mb-4">
                      Serenity Flow is designed to provide support and resources for mental wellness,
                      but it is not a replacement for professional mental health care. If you're experiencing
                      a mental health crisis or need professional support, please reach out to a qualified
                      healthcare provider.
                    </p>
                    <Button className="bg-warmth-500 text-white hover:bg-warmth-600">
                      Find Mental Health Resources
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;

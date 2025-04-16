
import React from "react";
import Layout from "@/components/Layout";
import ResourceCard from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      title: "Understanding Anxiety",
      description: "Learn about the causes, symptoms, and management strategies for anxiety disorders.",
      category: "Mental Health",
      imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      link: "#",
    },
    {
      title: "Mindfulness Meditation Guide",
      description: "A comprehensive guide to practicing mindfulness meditation for beginners.",
      category: "Mindfulness",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      link: "#",
    },
    {
      title: "Sleep Hygiene Tips",
      description: "Improve your sleep quality with these evidence-based practices and habits.",
      category: "Wellness",
      imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      link: "#",
    },
    {
      title: "Cognitive Behavioral Therapy",
      description: "An introduction to CBT techniques that can help manage negative thought patterns.",
      category: "Therapy",
      imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      link: "#",
    },
    {
      title: "Stress Management Techniques",
      description: "Practical strategies to reduce stress and improve your overall well-being.",
      category: "Stress Relief",
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      link: "#",
    },
    {
      title: "Building Resilience",
      description: "Learn how to build emotional resilience and bounce back from life's challenges.",
      category: "Personal Growth",
      imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      link: "#",
    },
  ];

  const categories = [
    "All Resources",
    "Mental Health",
    "Mindfulness",
    "Wellness",
    "Therapy",
    "Stress Relief",
    "Personal Growth",
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-serif">Mental Health Resources</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resources..."
                className="pl-10 w-64 bg-muted/50"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-primary text-primary-foreground" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              category={resource.category}
              imageUrl={resource.imageUrl}
              link={resource.link}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Resources;

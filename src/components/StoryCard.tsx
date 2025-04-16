
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";

interface StoryCardProps {
  title: string;
  description: string;
  mood: string;
  imageUrl: string;
  onClick: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  description,
  mood,
  imageUrl,
  onClick,
}) => {
  // Determine background color based on mood
  const getBgColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "calm":
        return "bg-gradient-to-br from-calm-100 to-calm-200";
      case "happy":
        return "bg-gradient-to-br from-nature-100 to-nature-200";
      case "anxious":
        return "bg-gradient-to-br from-serenity-100 to-serenity-200";
      case "sad":
        return "bg-gradient-to-br from-warmth-100 to-warmth-200";
      default:
        return "bg-gradient-to-br from-muted to-muted/50";
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-none ${getBgColor(mood)}`}>
      <CardHeader className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm text-foreground mb-2">
              For {mood} moments
            </div>
            <CardTitle className="text-xl font-serif">{title}</CardTitle>
          </div>
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-background/30 backdrop-blur-sm">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>
        <CardDescription className="text-foreground/80">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={onClick} 
          className="gap-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background"
        >
          <span>Begin Journey</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;


import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Share2 } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  category,
  imageUrl,
  link,
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-border h-full">
      <div 
        className="h-40 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground mb-2">
              {category}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="gap-1">
          <BookOpen className="h-4 w-4" />
          <span>Read</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;

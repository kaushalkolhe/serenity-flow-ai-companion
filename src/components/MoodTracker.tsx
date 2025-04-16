
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmilePlus, Smile, Meh, Frown, FrownPlus } from "lucide-react";

interface MoodOption {
  value: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const moodOptions: MoodOption[] = [
  {
    value: 5,
    label: "Great",
    icon: <SmilePlus className="h-8 w-8" />,
    color: "bg-nature-400 text-nature-900",
  },
  {
    value: 4,
    label: "Good",
    icon: <Smile className="h-8 w-8" />,
    color: "bg-nature-300 text-nature-800",
  },
  {
    value: 3,
    label: "Okay",
    icon: <Meh className="h-8 w-8" />,
    color: "bg-warmth-200 text-warmth-800",
  },
  {
    value: 2,
    label: "Low",
    icon: <Frown className="h-8 w-8" />,
    color: "bg-warmth-300 text-warmth-900",
  },
  {
    value: 1,
    label: "Awful",
    icon: <FrownPlus className="h-8 w-8" />,
    color: "bg-warmth-400 text-warmth-900",
  },
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodLog, setMoodLog] = useState<Array<{ date: Date; mood: number }>>([
    { date: new Date(Date.now() - 86400000 * 6), mood: 3 },
    { date: new Date(Date.now() - 86400000 * 5), mood: 4 },
    { date: new Date(Date.now() - 86400000 * 4), mood: 2 },
    { date: new Date(Date.now() - 86400000 * 3), mood: 3 },
    { date: new Date(Date.now() - 86400000 * 2), mood: 4 },
    { date: new Date(Date.now() - 86400000), mood: 3 },
  ]);

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
  };

  const handleMoodSubmit = () => {
    if (selectedMood !== null) {
      const newMoodLog = [...moodLog, { date: new Date(), mood: selectedMood }];
      setMoodLog(newMoodLog);
      setSelectedMood(null);
    }
  };

  const renderMoodHistory = () => {
    const recentMoods = [...moodLog].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 7);
    
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Past 7 days</h3>
        <div className="flex items-end justify-between h-32 gap-1">
          {recentMoods.map((entry, index) => {
            const option = moodOptions.find(o => o.value === entry.mood);
            const height = `${(entry.mood / 5) * 100}%`;
            const dayName = entry.date.toLocaleDateString(undefined, { weekday: 'short' }).substring(0, 3);
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t-md ${option?.color.split(' ')[0]} transition-all duration-300`} 
                  style={{ height }}
                ></div>
                <span className="text-xs text-muted-foreground mt-1">{dayName}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-serif">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          {moodOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className={`flex flex-col items-center p-3 h-auto gap-2 transition-all ${
                selectedMood === option.value
                  ? `${option.color} border-2`
                  : "bg-background hover:bg-background/80"
              }`}
              onClick={() => handleMoodSelect(option.value)}
            >
              {option.icon}
              <span className="text-xs">{option.label}</span>
            </Button>
          ))}
        </div>
        
        <Button 
          onClick={handleMoodSubmit} 
          disabled={selectedMood === null}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Log My Mood
        </Button>
        
        {renderMoodHistory()}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;

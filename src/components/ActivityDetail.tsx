
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCcw, CheckCircle2, ListChecks } from "lucide-react";
import { Activity } from '@/utils/chatUtils';
import { Textarea } from "@/components/ui/textarea";

interface ActivityDetailProps {
  activity: Activity;
  onClose: () => void;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ activity, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(activity.duration || 0);
  const [isActive, setIsActive] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [showSteps, setShowSteps] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(activity.duration || 0);
    setIsActive(false);
    setCompleted(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-serif">{activity.title}</CardTitle>
        {activity.description && (
          <CardDescription>{activity.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground whitespace-pre-line">{activity.content}</p>
        </div>
        
        {activity.steps && (
          <div>
            <Button 
              variant="outline" 
              size="sm"
              className="mb-2 flex items-center gap-1"
              onClick={() => setShowSteps(!showSteps)}
            >
              <ListChecks className="h-4 w-4" />
              {showSteps ? "Hide Steps" : "Show Steps"}
            </Button>
            
            {showSteps && (
              <ol className="pl-5 space-y-1 text-sm">
                {activity.steps.map((step, index) => (
                  <li key={index} className="list-decimal">{step}</li>
                ))}
              </ol>
            )}
          </div>
        )}
        
        {activity.type === 'gratitude' && (
          <div className="space-y-2">
            <label htmlFor="journalEntry" className="text-sm font-medium">
              Your Gratitude Entry:
            </label>
            <Textarea
              id="journalEntry"
              placeholder="Write what you're grateful for..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-[100px]"
            />
            {journalEntry.length > 0 && (
              <Button 
                onClick={handleComplete} 
                className="w-full"
                variant={completed ? "ghost" : "default"}
                disabled={completed}
              >
                {completed ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Saved
                  </span>
                ) : (
                  "Save Entry"
                )}
              </Button>
            )}
          </div>
        )}
        
        {activity.duration && (
          <div className="space-y-2">
            <div className="text-2xl font-bold text-center">{formatTime(timeLeft)}</div>
            <div className="flex justify-center gap-2">
              <Button
                size="sm"
                variant={isActive ? "destructive" : "default"}
                onClick={toggleTimer}
                disabled={completed}
              >
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={resetTimer}
                disabled={completed && !isActive}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
            
            {completed && (
              <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-md mt-2 text-center">
                <p className="text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Activity completed!
                </p>
              </div>
            )}
          </div>
        )}
        
        <Button
          variant="ghost"
          className="w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActivityDetail;

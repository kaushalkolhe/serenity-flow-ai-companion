
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCcw } from "lucide-react";
import { Activity } from '@/utils/chatUtils';

interface ActivityDetailProps {
  activity: Activity;
  onClose: () => void;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ activity, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(activity.duration || 0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(activity.duration || 0);
    setIsActive(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-serif">{activity.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{activity.content}</p>
        
        {activity.duration && (
          <div className="space-y-2">
            <div className="text-2xl font-bold text-center">{formatTime(timeLeft)}</div>
            <div className="flex justify-center gap-2">
              <Button
                size="sm"
                variant={isActive ? "destructive" : "default"}
                onClick={toggleTimer}
              >
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={resetTimer}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
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

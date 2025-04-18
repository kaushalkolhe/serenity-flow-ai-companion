
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ChatInterface from "@/components/ChatInterface";
import MoodTracker from "@/components/MoodTracker";
import ActivityDetail from "@/components/ActivityDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, FileText, Settings } from "lucide-react";
import { activities } from "@/utils/chatUtils";
import { Link } from "react-router-dom";

const Chat = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleActivityClick = (activityId: string) => {
    setSelectedActivity(activityId);
  };

  const selectedActivityDetails = activities.find(a => a.id === selectedActivity);

  return (
    <Layout>
      <div className="container py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-3/4">
            <ChatInterface />
          </div>
          
          <div className="w-full lg:w-1/4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Daily Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activities.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleActivityClick(activity.id)}
                    >
                      <span>{activity.title}</span>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {selectedActivityDetails ? (
              <ActivityDetail 
                activity={selectedActivityDetails}
                onClose={() => setSelectedActivity(null)}
              />
            ) : (
              <MoodTracker />
            )}
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Chat History</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Schedule</span>
                </Button>
                <Link to="/journal" className="w-full">
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center w-full">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Journal</span>
                  </Button>
                </Link>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
                  <Settings className="h-5 w-5" />
                  <span className="text-xs">Settings</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

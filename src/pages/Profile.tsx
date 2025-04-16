
import React from "react";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Bell, Settings, Shield, Moon, Sun, Volume2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src="/user-avatar.png" alt="User" />
                    <AvatarFallback className="bg-primary/20 text-primary text-xl">JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-medium mt-4">Jane Doe</h2>
                  <p className="text-muted-foreground">Member since April 2025</p>
                  
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs bg-serenity-100 text-serenity-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <BadgeCheck className="h-3 w-3" />
                      Premium
                    </span>
                  </div>
                  
                  <div className="mt-6 w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Daily Streak</span>
                      <span className="text-sm font-medium">7 days</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-medium">42</p>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-medium">320</p>
                      <p className="text-xs text-muted-foreground">Resilience Points</p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full lg:w-2/3">
            <Tabs defaultValue="preferences">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="mood-history">Mood History</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Application Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">AI Companion</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4 text-muted-foreground" />
                          <span>Serenity's Personality</span>
                        </div>
                        <div className="flex gap-4">
                          <Button variant="outline" size="sm">Supportive</Button>
                          <Button variant="outline" size="sm">Wise</Button>
                          <Button variant="default" size="sm">Friendly</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4 text-muted-foreground" />
                          <span>Voice Responses</span>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span>Daily Check-ins</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span>Mindfulness Reminders</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Privacy</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>Save Chat History</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>Data Analytics</span>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <Button className="w-full">Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="mood-history">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Your Mood History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Detailed mood history visualization will appear here</p>
                      <Button className="mt-4" variant="outline">View Full Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Your Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Your achievements and resilience journey will appear here</p>
                      <Button className="mt-4" variant="outline">Set New Goals</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

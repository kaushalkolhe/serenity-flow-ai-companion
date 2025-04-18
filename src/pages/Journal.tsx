
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Save, Plus, Calendar, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood?: number;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const savedEntries = localStorage.getItem("journal-entries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("journal-entries", JSON.stringify(entries));
  }, [entries]);

  const handleNewEntry = () => {
    setActiveEntry({
      id: Date.now().toString(),
      title: "",
      content: "",
      date: new Date(),
    });
    setTitle("");
    setContent("");
  };

  const handleSaveEntry = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your journal entry",
        variant: "destructive",
      });
      return;
    }

    if (activeEntry) {
      const updatedEntry = {
        ...activeEntry,
        title,
        content,
        date: new Date(),
      };

      if (entries.some(entry => entry.id === activeEntry.id)) {
        // Update existing entry
        setEntries(entries.map(entry => 
          entry.id === activeEntry.id ? updatedEntry : entry
        ));
      } else {
        // Add new entry
        setEntries([updatedEntry, ...entries]);
      }

      toast({
        title: "Entry saved",
        description: "Your journal entry has been saved successfully",
      });
      
      setActiveEntry(updatedEntry);
    }
  };

  const handleSelectEntry = (entry: JournalEntry) => {
    setActiveEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    
    if (activeEntry && activeEntry.id === id) {
      setActiveEntry(null);
      setTitle("");
      setContent("");
    }
    
    toast({
      title: "Entry deleted",
      description: "Journal entry has been removed",
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif">My Journal</h2>
              <Button onClick={handleNewEntry} size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>New Entry</span>
              </Button>
            </div>
            
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              {entries.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <BookOpen className="mx-auto mb-2 h-8 w-8 opacity-50" />
                    <p>Your journal is empty. Start writing today!</p>
                  </CardContent>
                </Card>
              ) : (
                entries.map((entry) => (
                  <Card 
                    key={entry.id} 
                    className={`cursor-pointer hover:bg-muted/50 transition-colors ${activeEntry?.id === entry.id ? 'border-primary' : ''}`}
                    onClick={() => handleSelectEntry(entry)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium line-clamp-1">{entry.title}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 rounded-full opacity-50 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEntry(entry.id);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <CardDescription className="text-xs flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(entry.date)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">{entry.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  {activeEntry?.id ? "Edit Entry" : "New Journal Entry"}
                </CardTitle>
                <CardDescription>
                  Write your thoughts, feelings, and reflections
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Give your entry a title..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Journal Entry</Label>
                  <Textarea 
                    id="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="What's on your mind today?"
                    className="min-h-[300px] resize-none"
                  />
                </div>
              </CardContent>
              
              <CardFooter className="justify-end">
                <Button 
                  onClick={handleSaveEntry} 
                  className="flex items-center gap-2"
                  disabled={!title.trim()}
                >
                  <Save className="h-4 w-4" />
                  Save Entry
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Journal;

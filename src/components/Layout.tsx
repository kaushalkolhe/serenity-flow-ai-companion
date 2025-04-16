
import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 backdrop-blur-md bg-background/80 border-b sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate("/")}
              className="font-serif text-2xl font-bold text-foreground transition-all hover:text-primary"
            >
              Serenity Flow
            </button>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate("/")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => navigate("/resources")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Resources
            </button>
            <button 
              onClick={() => navigate("/about")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => navigate("/profile")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Profile
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            <Button
              onClick={() => navigate("/chat")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              Chat Now
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto">
        {children}
      </main>
      <footer className="w-full py-6 px-6 bg-muted/30">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Serenity Flow. This AI companion is designed to provide support, 
            but is not a replacement for professional mental health services.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

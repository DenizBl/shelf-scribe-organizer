
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-library-background">
      <div className="text-center space-y-6">
        <BookX className="h-20 w-20 mx-auto text-library-primary" />
        <h1 className="text-5xl font-bold text-library-primary">404</h1>
        <p className="text-xl text-library-text mb-6">Oops! This page is missing from our library</p>
        <Button 
          size="lg"
          className="bg-library-primary hover:bg-library-primary/90"
          onClick={() => window.location.href = "/"}
        >
          Return to Library
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

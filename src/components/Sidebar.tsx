
import { Book, Users, BookOpen, BookPlus, Settings, LogOut, LogIn, UserPlus } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useLibrary } from "@/contexts/LibraryContext";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function Sidebar() {
  const { isAuthenticated, logout, currentUser, canEditBooks } = useLibrary();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/login");
  };

  // Define navigation items based on authentication status and user role
  const getNavItems = () => {
    const baseItems = [
      { path: "/", name: "Dashboard", icon: <BookOpen className="h-5 w-5" /> },
      { path: "/books", name: "Books", icon: <Book className="h-5 w-5" /> },
    ];

    // Items for authenticated users
    if (isAuthenticated) {
      baseItems.push({ path: "/members", name: "Members", icon: <Users className="h-5 w-5" /> });
      baseItems.push({ path: "/settings", name: "Settings", icon: <Settings className="h-5 w-5" /> });
      
      // Admin-only items
      if (canEditBooks()) {
        baseItems.push({ path: "/add-book", name: "Add Book", icon: <BookPlus className="h-5 w-5" /> });
      }
    }
    
    return baseItems;
  };

  return (
    <ShadcnSidebar className="border-r border-library-light">
      <SidebarHeader className="px-6 py-3">
        <div className="flex items-center">
          <Book className="mr-2 h-6 w-6 text-library-primary" />
          <h1 className="text-xl font-bold text-library-primary">LibraryManager</h1>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <nav className="grid items-start px-2 py-4">
          {getNavItems().map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  "hover:bg-library-primary hover:text-white",
                  isActive
                    ? "bg-library-primary text-white"
                    : "text-library-text"
                )
              }
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter className="px-2 py-2 border-t border-library-light">
        {isAuthenticated ? (
          <div className="space-y-4 px-2">
            <div className="flex items-center gap-3 text-sm font-medium text-library-text">
              <span className="truncate">{currentUser?.name}</span>
              <span className="text-xs bg-library-primary text-white px-2 py-0.5 rounded">
                {currentUser?.role}
              </span>
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button variant="default" className="w-full justify-start" onClick={() => navigate('/login')}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/register')}>
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </Button>
          </div>
        )}
      </SidebarFooter>
    </ShadcnSidebar>
  );
}

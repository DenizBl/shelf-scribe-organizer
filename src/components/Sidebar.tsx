
import { Book, Users, BookOpen, BookPlus, Settings, LogOut, LogIn, UserPlus, BookCopy, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useLibrary } from "@/contexts/LibraryContext";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

export function Sidebar() {
  const { isAuthenticated, logout, currentUser, canEditBooks } = useLibrary();
  const navigate = useNavigate();
  const isAdmin = currentUser?.role === 'admin';

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/login");
  };

  // Common items for all authenticated users
  const commonItems = [
    { path: "/dashboard", name: "Dashboard", icon: <BookOpen className="h-5 w-5" /> },
    { path: "/books", name: "Books", icon: <Book className="h-5 w-5" /> },
    { path: "/members", name: "Members", icon: <Users className="h-5 w-5" /> },
    { path: "/settings", name: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  // Admin-specific items
  const adminItems = [
    { path: "/add-book", name: "Add Book", icon: <BookPlus className="h-5 w-5" /> },
    { path: "/add-member", name: "Add Member", icon: <UserPlus className="h-5 w-5" /> },
  ];

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
        {isAuthenticated ? (
          <>
            {/* User profile summary */}
            <div className="px-4 py-2 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-library-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-library-primary" />
                </div>
                <div>
                  <p className="font-medium truncate">{currentUser?.name}</p>
                  <Badge variant={isAdmin ? "default" : "outline"} className={isAdmin ? "bg-library-primary" : ""}>
                    {currentUser?.role}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Common navigation for all users */}
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {commonItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <NavLink
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
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Admin-only section */}
            {isAdmin && (
              <SidebarGroup>
                <SidebarGroupLabel>Administration</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <NavLink
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
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>Public</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/login" className="flex items-center gap-3">
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/register" className="flex items-center gap-3">
                      <UserPlus className="h-5 w-5" />
                      <span>Register</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      {isAuthenticated && (
        <SidebarFooter className="px-4 py-4 border-t border-library-light">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </SidebarFooter>
      )}
    </ShadcnSidebar>
  );
}


import { Book, Users, BookOpen, BookPlus, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function Sidebar() {
  const navItems = [
    { path: "/", name: "Dashboard", icon: <BookOpen className="h-5 w-5" /> },
    { path: "/books", name: "Books", icon: <Book className="h-5 w-5" /> },
    { path: "/add-book", name: "Add Book", icon: <BookPlus className="h-5 w-5" /> },
    { path: "/members", name: "Members", icon: <Users className="h-5 w-5" /> },
    { path: "/settings", name: "Settings", icon: <Settings className="h-5 w-5" /> },
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
        <nav className="grid items-start px-2 py-4">
          {navItems.map((item, index) => (
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
    </ShadcnSidebar>
  );
}

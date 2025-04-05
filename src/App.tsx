
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LibraryProvider } from "@/contexts/LibraryContext";
import Layout from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import BookDetails from "./pages/BookDetails";
import MemberDetails from "./pages/MemberDetails";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LibraryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/books" element={<Layout><Books /></Layout>} />
            <Route path="/books/:id" element={<Layout><BookDetails /></Layout>} />
            <Route path="/add-book" element={<Layout><AddBook /></Layout>} />
            <Route path="/members" element={<Layout><Members /></Layout>} />
            <Route path="/members/:id" element={<Layout><MemberDetails /></Layout>} />
            <Route path="/add-member" element={<Layout><AddMember /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LibraryProvider>
  </QueryClientProvider>
);

export default App;

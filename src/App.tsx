
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LibraryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout><Dashboard /></Layout>} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/books" element={<Layout><Books /></Layout>} />
            <Route path="/books/:id" element={<Layout><BookDetails /></Layout>} />
            
            {/* Admin only routes */}
            <Route path="/add-book" element={
              <AuthGuard requireAdmin={true}>
                <Layout><AddBook /></Layout>
              </AuthGuard>
            } />
            
            {/* Member management */}
            <Route path="/members" element={
              <AuthGuard>
                <Layout><Members /></Layout>
              </AuthGuard>
            } />
            <Route path="/members/:id" element={
              <AuthGuard>
                <Layout><MemberDetails /></Layout>
              </AuthGuard>
            } />
            <Route path="/add-member" element={
              <AuthGuard requireAdmin={true}>
                <Layout><AddMember /></Layout>
              </AuthGuard>
            } />
            
            {/* Settings */}
            <Route path="/settings" element={
              <AuthGuard>
                <Layout><Settings /></Layout>
              </AuthGuard>
            } />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LibraryProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import { MainLayout } from "@/components/layout/main-layout";
import { AdminLayout } from "@/components/layout/admin-layout";
import { isAdmin } from "@/lib/admin";

// Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ModelSelection from "./pages/ModelSelection";
import MentalHealthTest from "./pages/MentalHealthTest";
import Results from "./pages/Results";
import AISupport from "./pages/AISupport";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

// Admin Route Guard Component
function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  
  if (!isAdmin(user)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="neurosense-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <SignedOut>
                  <Landing />
                </SignedOut>
                <SignedIn>
                  <Navigate to="/dashboard" replace />
                </SignedIn>
              </>
            } />
            
            {/* Protected Routes - Require Authentication */}
            <Route path="/*" element={
              <SignedIn>
                <Routes>
                  {/* Protected Routes with Layout */}
                  <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/model-selection" element={<ModelSelection />} />
                    <Route path="/test" element={<MentalHealthTest />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/ai-support" element={<AISupport />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                  
                  {/* Admin Routes with Admin Layout */}
                  <Route element={
                    <AdminRouteGuard>
                      <AdminLayout />
                    </AdminRouteGuard>
                  }>
                    <Route path="/admin/overview" element={<AdminOverview />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SignedIn>
            } />
            
            {/* Fallback for signed out users */}
            <Route path="*" element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

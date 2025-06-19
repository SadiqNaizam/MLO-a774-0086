import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Assuming a Homepage component exists from previous examples or setup
// If not, you might want to set LoginPage as the index route or create a Homepage
// For now, we'll keep the structure as if a Homepage exists.
// import Homepage from "./pages/Homepage"; // Example import

import LoginPage from "./pages/LoginPage";
import PasswordRecoveryRequestPage from "./pages/PasswordRecoveryRequestPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import NotFound from "./pages/NotFound"; // Always Must Include (Assuming we already have NotFound.tsx)

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* If you have a Homepage, it would typically be the index route: */}
          {/* <Route path="/" element={<Homepage />} /> */}

          {/* For this exercise, let's make LoginPage the default, or reachable directly */}
          {/* If you want LoginPage to be the very first page users see if no other matches: */}
          <Route path="/" element={<LoginPage />} /> {/* Or point to a real Homepage */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/password-recovery-request" element={<PasswordRecoveryRequestPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          
          {/* Add other application routes here */}
          {/* Example: <Route path="/dashboard" element={<DashboardPage />} /> */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
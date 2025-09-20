import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamAuthProvider } from "@/contexts/TeamAuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Index from "./pages/Index";
import Access from "./pages/Access";
import TeamDashboard from "./pages/TeamDashboard";
import SubmitCase from "./pages/SubmitCase";
import Confirmation from "./pages/Confirmation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TeamAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/acesso" element={<Access />} />
              <Route path="/central" element={<TeamDashboard />} />
              <Route path="/enviar-caso" element={<SubmitCase />} />
              <Route path="/confirmacao" element={<Confirmation />} />
              <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
              <Route path="/configuracoes" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TeamAuthProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;

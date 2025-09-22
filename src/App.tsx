import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamAuthProvider } from "@/contexts/TeamAuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy load non-critical routes to reduce initial bundle size
const Access = lazy(() => import("./pages/Access"));
const TeamDashboard = lazy(() => import("./pages/TeamDashboard"));
const SubmitCase = lazy(() => import("./pages/SubmitCase"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Settings = lazy(() => import("./pages/Settings"));
const Admin = lazy(() => import("./pages/Admin"));
const AuditLogs = lazy(() => import("./pages/AuditLogs"));

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TeamAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-muted-foreground">Carregando...</div></div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/acesso" element={<Access />} />
                <Route path="/central-equipe" element={<TeamDashboard />} />
                <Route path="/enviar-caso" element={<SubmitCase />} />
                <Route path="/confirmacao" element={<Confirmation />} />
                <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
                <Route path="/configuracoes" element={<Settings />} />
                <Route path="/auditoria" element={<AuditLogs />} />
                <Route path="/logs-auditoria" element={<AuditLogs />} />
                
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </TeamAuthProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTeamAuth } from "@/contexts/TeamAuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SecurityIndicator from "@/components/SecurityIndicator";
import { 
  FileText, 
  MessageCircle, 
  History, 
  Plus, 
  LogOut, 
  Users, 
  Calendar,
  TrendingUp,
  Settings,
  Shield,
  Scale,
  Sparkles,
  Bot,
  FileCheck
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TeamDashboard = () => {
  const navigate = useNavigate();
  const { teamData, logout, isAuthenticated, isLoading: authLoading } = useTeamAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalCases: 0,
    pendingCases: 0,
    completedCases: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth loading to complete before checking authentication
    if (authLoading) return;
    
    if (!isAuthenticated || !teamData) {
      navigate("/acesso");
      return;
    }
    loadStats();
  }, [isAuthenticated, teamData, navigate, authLoading]);

  const loadStats = async () => {
    if (!teamData) return;
    
    try {
      // Set team context for RLS
      await supabase.rpc('set_team_context', { p_team_id: teamData.team_id });
      
      // Get cases count
      const { data: cases, error } = await supabase
        .from('cases')
        .select('case_data')
        .eq('team_id', teamData.team_id);

      if (error) {
        console.error('Error loading stats:', error);
      } else {
        const totalCases = cases?.length || 0;
        // For now, we'll simulate pending/completed based on simple logic
        const pendingCases = Math.floor(totalCases * 0.3);
        const completedCases = totalCases - pendingCases;
        
        setStats({
          totalCases,
          pendingCases,
          completedCases
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/");
  };

  const handleNewCase = () => {
    navigate("/enviar-caso");
  };

  const handleChatbot = () => {
    toast({
      title: "Chatbot",
      description: "Funcionalidade do chatbot será implementada em breve!",
    });
  };

  const handleHistory = () => {
    toast({
      title: "Histórico",
      description: "Histórico de casos será implementado em breve!",
    });
  };

  if (authLoading || !teamData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="header-sticky bg-card border-b border-axcontrol-secondary-1/30">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-4 flex-1 min-w-0">
              <img 
                src="/logo-axia-principal.png"
                alt="AxiaCare Logo" 
                className="w-14 h-14 md:w-16 md:h-16 object-contain flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-axcontrol-dark">Themis™</h1>
                <span className="text-sm md:text-sm text-axcontrol-primary font-medium hidden sm:block">
                  Central de Equipe • Análise Jurídico-Médica
                </span>
                <span className="text-sm text-axcontrol-primary font-medium sm:hidden">
                  Central de Equipe
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-3 flex-shrink-0">
              <Badge variant="secondary" className="px-3 md:px-3 py-1.5 text-sm">
                <Users className="w-4 h-4 md:w-4 md:h-4 mr-1" />
                <span className="hidden sm:inline">{teamData.team_id}</span>
                <span className="sm:hidden">{teamData.team_id.substring(0, 8)}...</span>
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground text-sm md:text-sm px-3 py-2"
              >
                <LogOut className="w-4 h-4 md:w-4 md:h-4 mr-2 md:mr-2" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Security Banner */}
      <div className="bg-axcontrol-secondary-2/20 border-b border-axcontrol-accent/20">
        <div className="container mx-auto px-4 py-1.5 md:py-2">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-axcontrol-dark">
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-axcontrol-accent" />
              <span className="font-medium text-center">Ambiente seguro • ISO/IEC 27001 e 27701 • LGPD</span>
            </div>
            <div className="flex items-center space-x-2">
              <Scale className="w-3 h-3 md:w-4 md:h-4 text-axcontrol-accent" />
              <span className="font-medium text-center">Ferramenta de apoio • Não substitui avaliação profissional</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <SecurityIndicator />
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 md:p-6 border mt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Olá, {teamData.team_name}! 👋
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Bem-vindo à sua Central de Equipe. 
              Gerencie seus casos, acesse insights e utilize nossas ferramentas de apoio.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total de Casos</p>
                <p className="text-3xl font-bold text-foreground">{isLoading ? "..." : stats.totalCases}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Em Análise</p>
                <p className="text-3xl font-bold text-foreground">{isLoading ? "..." : stats.pendingCases}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Concluídos</p>
                <p className="text-3xl font-bold text-foreground">{isLoading ? "..." : stats.completedCases}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Primary Actions */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Novo Caso para Análise</h3>
                <p className="text-muted-foreground mb-4">
                  Envie um novo caso para análise completa
                </p>
                <Button onClick={handleNewCase} size="lg" className="w-full">
                  <FileText className="w-5 h-5 mr-2" />
                  Enviar Novo Caso
                </Button>
              </div>
            </div>
          </Card>

          {/* Chatbot */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Chatbot Themis™ AI</h3>
                <p className="text-muted-foreground mb-4">
                  Obtenha insights e orientações instantâneas
                </p>
                <Button onClick={handleChatbot} variant="outline" size="lg" className="w-full">
                  <Bot className="w-5 h-5 mr-2" />
                  Iniciar Conversa
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={handleHistory}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <History className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Histórico de Casos</h4>
                <p className="text-muted-foreground text-sm">Consulte casos anteriores</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Relatórios</h4>
                <p className="text-muted-foreground text-sm">Análises e estatísticas</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <Link to="/conferencia-seguranca" className="block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Conferência de Segurança</h4>
                  <p className="text-muted-foreground text-sm">Auditoria completa do sistema</p>
                </div>
              </div>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <Link to="/auditoria" className="block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Logs de Auditoria</h4>
                  <p className="text-muted-foreground text-sm">Transparência total de acessos</p>
                </div>
              </div>
            </Link>
          </Card>
        </div>

        <Separator className="my-6 md:my-8" />
      </main>

      {/* Footer - Padrão AxControl™ conforme referência */}
      <footer className="bg-white border-t border-axcontrol-secondary-1/30 py-6 md:py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-3 md:mb-4">
              <img 
                src="/logo-axia-principal.png"
                alt="AxiaCare" 
                className="w-7 h-7 md:w-8 md:h-8 object-contain"
              />
              <span className="text-axcontrol-primary font-semibold text-sm md:text-base">AxiaCare</span>
            </div>
            
            <p className="text-axcontrol-dark/70 text-xs md:text-sm mb-3 md:mb-4">
              AxView™ | WebApps – Gestão e Consultoria em Saúde
            </p>
            
            {/* Desktop layout */}
            <div className="hidden md:flex items-center justify-center space-x-6 text-sm text-axcontrol-muted">
              <a href="https://axcare.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-axcontrol-primary transition-smooth">
                axcare.com.br
              </a>
              <span>|</span>
              <span>Copyright © 2025 AxiaCare | Todos os direitos reservados</span>
              <span>|</span>
              <span>Uma empresa GTCorp.</span>
            </div>
            
            {/* Mobile layout */}
            <div className="md:hidden text-xs text-axcontrol-dark/60 leading-relaxed">
              <a href="https://axcare.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-axcontrol-primary transition-smooth">
                axcare.com.br
              </a>
              <span> © 2025 AxiaCare Todos os direitos reservados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeamDashboard;
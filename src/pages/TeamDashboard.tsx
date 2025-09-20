import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeamAuth } from "@/contexts/TeamAuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  MessageCircle, 
  History, 
  Plus, 
  LogOut, 
  Users, 
  Calendar,
  TrendingUp,
  Settings
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
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Central da Equipe</h1>
                <p className="text-muted-foreground text-sm">Sistema Temis - Análise Jurídico-Médica</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {teamData.team_id}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Olá, {teamData.team_name}! 👋
            </h2>
            <p className="text-muted-foreground text-lg">
              Bem-vindo à sua central de análises jurídico-médicas. 
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
                  Envie um novo caso para análise jurídico-médica completa
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
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Assistente Temis</h3>
                <p className="text-muted-foreground mb-4">
                  Obtenha insights jurídicos e orientações instantâneas
                </p>
                <Button onClick={handleChatbot} variant="outline" size="lg" className="w-full">
                  <MessageCircle className="w-5 h-5 mr-2" />
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
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Configurações</h4>
                <p className="text-muted-foreground text-sm">Gerencie sua equipe</p>
              </div>
            </div>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Footer Info */}
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            Sistema Temis - Desenvolvido para análises jurídico-médicas especializadas
          </p>
          <p className="text-xs mt-1">
            Equipe: {teamData.team_name} • ID: {teamData.team_id}
          </p>
        </div>
      </main>
    </div>
  );
};

export default TeamDashboard;
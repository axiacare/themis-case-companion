import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTeamAuth } from "@/contexts/TeamAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SecurityIndicator from "@/components/SecurityIndicator";
import { ArrowLeft, FileCheck, Shield, Clock, Eye, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

interface AuditLog {
  id: string;
  action: string;
  target_table: string;
  target_team_id: string;
  accessed_fields: string[];
  timestamp: string;
}

const AuditLogs = () => {
  const navigate = useNavigate();
  const { teamData } = useTeamAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuditLogs();
  }, [teamData]);

  const loadAuditLogs = async () => {
    if (!teamData) return;
    
    try {
      setLoading(true);
      
      // Set team context
      await supabase.rpc('set_team_context', { p_team_id: teamData.team_id });
      
      // Load audit logs for this team
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('team_id', teamData.team_id)
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error loading audit logs:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os logs de auditoria.",
          variant: "destructive"
        });
      } else {
        setLogs(data || []);
      }
    } catch (error) {
      console.error('Error loading audit logs:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar logs de auditoria.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatAction = (action: string) => {
    const actionMap: Record<string, { label: string; color: string; icon: JSX.Element }> = {
      'LOGIN_SUCCESS': { 
        label: 'Login Realizado', 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: <Shield className="w-3 h-3" />
      },
      'LOGIN_FAILED': { 
        label: 'Tentativa de Login', 
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: <AlertCircle className="w-3 h-3" />
      },
      'VIEW_TEAMS_SAFE': { 
        label: 'Consulta Dados', 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: <Eye className="w-3 h-3" />
      },
      'ADMIN_LIST_TEAMS': { 
        label: 'Acesso Admin', 
        color: 'bg-orange-100 text-orange-800 border-orange-200', 
        icon: <FileCheck className="w-3 h-3" />
      },
    };

    const actionInfo = actionMap[action] || { 
      label: action, 
      color: 'bg-gray-100 text-gray-800 border-gray-200', 
      icon: <Clock className="w-3 h-3" />
    };

    return (
      <Badge variant="outline" className={`${actionInfo.color} font-medium`}>
        {actionInfo.icon}
        <span className="ml-1">{actionInfo.label}</span>
      </Badge>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header */}
        <header className="header-sticky bg-card border-b border-axcontrol-secondary-1/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                <img 
                  src="/logo-axia-principal.png"
                  alt="AxiaCare Logo" 
                  className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <h1 className="text-xl md:text-2xl font-bold text-axcontrol-dark">Themis™</h1>
                  <span className="text-xs md:text-sm text-axcontrol-primary font-medium hidden sm:block">
                    Logs de Auditoria • {teamData?.team_name}
                  </span>
                  <span className="text-xs text-axcontrol-primary font-medium sm:hidden">
                    Auditoria
                  </span>
                </div>
              </div>
              
              <Link to="/central-equipe">
                <Button variant="outline" size="sm" className="transition-smooth text-xs md:text-sm px-2 md:px-4">
                  <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Voltar</span>
                  <span className="sm:hidden">←</span>
                </Button>
              </Link>
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
                <FileCheck className="w-3 h-3 md:w-4 md:h-4 text-axcontrol-accent" />
                <span className="font-medium text-center">Auditoria completa • Transparência total</span>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-6 md:py-8">
          {/* Security Indicator */}
          <div className="mb-6">
            <SecurityIndicator />
          </div>

          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 md:p-6 border">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <FileCheck className="w-8 h-8 text-primary" />
                Logs de Auditoria
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Registro completo de todos os acessos aos dados da equipe <strong>{teamData?.team_name}</strong>.
                Transparência total para sua segurança.
              </p>
            </div>
          </div>

          {/* Audit Logs Table */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-primary" />
                <span>Histórico de Acessos</span>
                <Badge variant="secondary">{logs.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="text-muted-foreground">Carregando logs de auditoria...</div>
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center py-8">
                  <FileCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhum log de auditoria registrado ainda.</p>
                  <p className="text-sm text-muted-foreground">
                    Os acessos aos dados serão registrados aqui automaticamente.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Ação</TableHead>
                        <TableHead>Tabela</TableHead>
                        <TableHead>Campos Acessados</TableHead>
                        <TableHead>Equipe Alvo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-sm">
                            {formatTimestamp(log.timestamp)}
                          </TableCell>
                          <TableCell>
                            {formatAction(log.action)}
                          </TableCell>
                          <TableCell className="font-medium">
                            {log.target_table || 'N/A'}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {log.accessed_fields?.map((field, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {field}
                                </Badge>
                              )) || 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">
                            {log.target_team_id || 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Footer */}
          <div className="mt-8 p-6 bg-muted/50 rounded-lg border-l-4 border-primary">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Sobre os Logs de Auditoria</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• <strong>Transparência Total:</strong> Todos os acessos aos dados são registrados automaticamente</p>
                  <p>• <strong>Proteção LGPD:</strong> Você tem direito de saber quem acessa suas informações</p>
                  <p>• <strong>Segurança Ativa:</strong> Logs são imutáveis e protegidos por RLS</p>
                  <p>• <strong>Retenção:</strong> Logs são mantidos por 12 meses para conformidade</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer - Padrão AxControl™ */}
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
              <div className="hidden md:flex items-center justify-center space-x-6 text-sm text-axcontrol-dark/60">
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
    </ProtectedRoute>
  );
};

export default AuditLogs;
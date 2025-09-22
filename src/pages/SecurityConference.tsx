import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SecurityIndicator from "@/components/SecurityIndicator";
import SecurityDocumentation from "@/components/SecurityDocumentation";
import { 
  Shield, 
  FileCheck, 
  Lock, 
  Eye, 
  Database, 
  Network, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Clock,
  ArrowLeft,
  Download,
  Gauge,
  Server
} from "lucide-react";
import { Link } from "react-router-dom";

const SecurityConference = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  // Métricas simuladas para demonstração
  const securityMetrics = {
    totalAudits: 1247,
    activeTeams: 23,
    securityScore: 98.7,
    lastSecurityReview: "2025-01-15",
    dataProtectionLevel: "Máximo",
    complianceStatus: "100% Conforme"
  };

  return (
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
                  Conferência de Segurança • Auditoria Completa
                </span>
                <span className="text-xs text-axcontrol-primary font-medium sm:hidden">
                  Segurança
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="transition-smooth">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Security Banner */}
      <div className="bg-axcontrol-secondary-2/20 border-b border-axcontrol-accent/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-axcontrol-dark">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-axcontrol-accent" />
              <span className="font-medium">Classificação: CONFIDENCIAL</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-axcontrol-accent" />
              <span className="font-medium">ISO/IEC 27001:2022 • ISO/IEC 27701:2019 • LGPD</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Security Indicator */}
        <div className="mb-8">
          <SecurityIndicator />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <Shield className="w-10 h-10 text-primary" />
                  Conferência de Segurança Themis™
                </h2>
                <p className="text-muted-foreground text-lg">
                  Auditoria completa das medidas de proteção de dados e conformidade regulatória
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Sistema Seguro
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar Relatório
              </Button>
            </div>
          </div>
        </div>

        {/* Security Metrics Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700 mb-1">{securityMetrics.securityScore}%</div>
              <p className="text-xs text-green-600 flex items-center justify-center gap-1">
                <Gauge className="w-3 h-3" />
                Score de Segurança
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 mb-1">{securityMetrics.totalAudits}</div>
              <p className="text-xs text-blue-600 flex items-center justify-center gap-1">
                <FileCheck className="w-3 h-3" />
                Eventos Auditados
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-700 mb-1">{securityMetrics.activeTeams}</div>
              <p className="text-xs text-purple-600 flex items-center justify-center gap-1">
                <Users className="w-3 h-3" />
                Equipes Ativas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-orange-700 mb-1">100%</div>
              <p className="text-xs text-orange-600 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Dados Criptografados
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-indigo-700 mb-1">0</div>
              <p className="text-xs text-indigo-600 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Vulnerabilidades
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-teal-700 mb-1">24/7</div>
              <p className="text-xs text-teal-600 flex items-center justify-center gap-1">
                <Server className="w-3 h-3" />
                Monitoramento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Security Content Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
            <TabsTrigger value="compliance">Conformidade</TabsTrigger>
            <TabsTrigger value="audit">Auditoria</TabsTrigger>
            <TabsTrigger value="response">Resposta</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SecurityDocumentation />
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Arquitetura de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      Camadas de Proteção
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 1:</strong> Firewall de Aplicação (WAF)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 2:</strong> Autenticação e Autorização
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 3:</strong> Row Level Security (RLS)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 4:</strong> Mascaramento de Dados
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 5:</strong> Auditoria Completa
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Network className="w-4 h-4 text-blue-600" />
                      Controles de Rede
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        TLS 1.3 para todas as conexões
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Certificate Pinning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Rate Limiting avançado
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Detecção de anomalias
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Geo-blocking inteligente
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                  <h4 className="font-semibold text-foreground mb-2">Princípio de Zero Trust</h4>
                  <p className="text-sm text-muted-foreground">
                    Nossa arquitetura segue o modelo Zero Trust, onde nenhum sistema ou usuário é confiável por padrão. 
                    Toda requisição é verificada, autenticada e autorizada independentemente da origem.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <FileCheck className="w-5 h-5" />
                    LGPD - Lei Geral de Proteção de Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    100% Conforme
                  </Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Consentimento explícito para coleta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Direito ao esquecimento implementado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Portabilidade de dados garantida</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>DPO designado e atuante</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Shield className="w-5 h-5" />
                    ISO/IEC 27001:2022
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Certificado
                  </Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>SGSI implementado e operacional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Análise de riscos atualizada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Controles de segurança validados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Auditoria interna semestral</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Eye className="w-5 h-5" />
                    ISO/IEC 27701:2019
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Certificado
                  </Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span>PIMS implementado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span>Privacy by Design aplicado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span>PIA realizadas sistematicamente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span>Notificação de incidentes 72h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <TrendingUp className="w-5 h-5" />
                    Certificações Adicionais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Múltiplas
                  </Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600" />
                      <span>SOC 2 Type II</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600" />
                      <span>PCI DSS Level 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600" />
                      <span>HIPAA Compliance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600" />
                      <span>GDPR Ready</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Sistema de Auditoria
                  </div>
                  <Link to="/logs-auditoria">
                    <Button variant="outline" size="sm">
                      Ver Logs Detalhados
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-muted/50 rounded-lg border">
                    <div className="text-3xl font-bold text-primary mb-2">{securityMetrics.totalAudits}</div>
                    <p className="text-sm text-muted-foreground">Eventos auditados</p>
                    <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-lg border">
                    <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Taxa de captura</p>
                    <p className="text-xs text-muted-foreground mt-1">Todos os eventos</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-lg border">
                    <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                    <p className="text-sm text-muted-foreground">Eventos suspeitos</p>
                    <p className="text-xs text-muted-foreground mt-1">Sem anomalias</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Eventos Monitorados</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Autenticação</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Login bem-sucedido</li>
                        <li>• Tentativas de login falhadas</li>
                        <li>• Logout de sessões</li>
                        <li>• Tentativas de acesso não autorizado</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Acesso a Dados</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Consulta de dados de equipes</li>
                        <li>• Visualização de informações sensíveis</li>
                        <li>• Acesso administrativo</li>
                        <li>• Operações de backup</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Plano de Resposta a Incidentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Procedimentos de Emergência</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                        <div>
                          <h5 className="font-medium text-red-800">Detecção Imediata</h5>
                          <p className="text-sm text-red-700">Sistemas de monitoramento 24/7 detectam anomalias em tempo real</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <h5 className="font-medium text-orange-800">Isolamento</h5>
                          <p className="text-sm text-orange-700">Sistemas comprometidos são imediatamente isolados</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                        <div>
                          <h5 className="font-medium text-yellow-800">Análise Forense</h5>
                          <p className="text-sm text-yellow-700">Investigação completa para determinar escopo e impacto</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Comunicação de Incidentes</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg border">
                        <h5 className="font-medium text-foreground mb-2">Notificação Interna</h5>
                        <p className="text-sm text-muted-foreground">Equipe de segurança notificada em até 15 minutos</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg border">
                        <h5 className="font-medium text-foreground mb-2">Autoridades Reguladoras</h5>
                        <p className="text-sm text-muted-foreground">ANPD notificada em até 72 horas quando aplicável</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg border">
                        <h5 className="font-medium text-foreground mb-2">Clientes Afetados</h5>
                        <p className="text-sm text-muted-foreground">Comunicação transparente em até 24 horas</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Status Atual: Sistema Seguro</h4>
                      <p className="text-sm text-green-700">
                        Nenhum incidente de segurança reportado nos últimos 12 meses. 
                        Todos os sistemas operando dentro dos parâmetros de segurança estabelecidos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/logs-auditoria">
            <Button className="w-full sm:w-auto">
              <FileCheck className="w-4 h-4 mr-2" />
              Acessar Logs de Auditoria
            </Button>
          </Link>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Baixar Relatório Completo
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-axcontrol-secondary-1/30 py-6 px-4 mt-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="/logo-axia-principal.png"
                alt="AxiaCare" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-axcontrol-primary font-semibold">AxiaCare</span>
            </div>
            <p className="text-axcontrol-dark/70 text-sm mb-4">
              Conferência de Segurança Themis™ • Documento Confidencial
            </p>
            <div className="text-sm text-axcontrol-muted">
              <span>Copyright © 2025 AxiaCare | Todos os direitos reservados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SecurityConference;
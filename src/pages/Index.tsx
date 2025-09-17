import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Scale, Shield, Clock, CheckCircle, ArrowRight, Building, Cpu, Users, Mail, TrendingUp, BarChart3, FileCheck, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header - AxControl™ Padrão */}
      <header className="header-sticky bg-white border-b border-axcontrol-secondary-1/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo-axia-principal.png"
                alt="AxiaCare Logo" 
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-axcontrol-dark">Themis™</h1>
                <span className="text-sm text-axcontrol-primary font-medium">Ambiente Inteligente de Necessidades Jurídicas na Saúde</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <img 
                  src="/axiacare-logo-oficial.png"
                  alt="AxiaCare" 
                  className="h-8 object-contain"
                />
              </div>
              <Link to="/acesso">
                <Button className="bg-axcontrol-primary hover:bg-axcontrol-primary/90 text-white shadow-button px-6 py-2.5 text-base font-medium">
                  Entrar no ambiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* LGPD Badge - AxControl™ Compliance */}
      <div className="bg-axcontrol-secondary-2/20 border-b border-axcontrol-accent/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-4 text-sm text-axcontrol-dark">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-axcontrol-accent" />
              <span className="font-medium">Ambiente seguro • ISO/IEC 27001 e 27701 • LGPD</span>
            </div>
            <a 
              href="https://hub.guithome.com.br/axia/privacidade.html"
              target="_blank"
              rel="noopener noreferrer"
              className="chip-compliance hover:bg-success/80 transition-smooth"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section - Padrão AxControl™ */}
      <section className="py-20 px-4 bg-axcontrol-light">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-axcontrol-dark mb-6">
              AxSets™ para Análise Inteligente
            </h2>
            <p className="text-lg text-axcontrol-dark/70 max-w-3xl mx-auto leading-relaxed">
              Padronização e replicabilidade entre equipes e períodos através de metodologias consolidadas 
              para acompanhamento de resultados assistenciais.
            </p>
          </div>
        </div>
      </section>

      {/* Metodologias - Padrão AxControl Metron™ */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* THEMIS™ - Metodologia Jurídico-Médica */}
            <Card className="interactive-card bg-white border border-axcontrol-primary/20 shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-axcontrol-primary rounded-2xl flex items-center justify-center shadow-button">
                    <Scale className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-axcontrol-primary">THEMIS™</h3>
                    <p className="text-axcontrol-dark/70">Metodologia Integrada de Análise Jurídico-Médica por IA</p>
                  </div>
                </div>
                
                <p className="text-axcontrol-dark/80 mb-6 leading-relaxed">
                  Análise avançada de casos jurídico-médicos apresentada em relatório estruturado, 
                  combinando expertise jurídica e médica para respostas precisas.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-axcontrol-primary" />
                    <span className="text-sm text-axcontrol-dark">Análise AxIntel™ Especializada</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Cpu className="w-5 h-5 text-axcontrol-primary" />
                    <span className="text-sm text-axcontrol-dark">Metodologia AxSet ACORDO™</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileCheck className="w-5 h-5 text-axcontrol-primary" />
                    <span className="text-sm text-axcontrol-dark">Relatório Estruturado</span>
                  </div>
                </div>
                
                <Link to="/acesso">
                  <Button className="w-full bg-axcontrol-primary hover:bg-axcontrol-primary/90 text-white font-semibold py-3">
                    Acessar THEMIS™
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* FUTURO - Segunda Metodologia */}
            <Card className="interactive-card bg-white border border-axcontrol-accent/20 shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-axcontrol-accent rounded-2xl flex items-center justify-center shadow-button">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-axcontrol-accent">EM BREVE</h3>
                    <p className="text-axcontrol-dark/70">Nova Metodologia AxControl™</p>
                  </div>
                </div>
                
                <p className="text-axcontrol-dark/80 mb-6 leading-relaxed">
                  Estamos desenvolvendo uma nova metodologia complementar que ampliará 
                  as capacidades de análise do ecossistema AxControl™.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-axcontrol-accent" />
                    <span className="text-sm text-axcontrol-dark">5 Dimensões Analíticas</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-axcontrol-accent" />
                    <span className="text-sm text-axcontrol-dark">Score Inteligente 0-100</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-axcontrol-accent" />
                    <span className="text-sm text-axcontrol-dark">Consolidados por Eixo</span>
                  </div>
                </div>
                
                <Button disabled className="w-full bg-muted text-muted-foreground font-semibold py-3 cursor-not-allowed">
                  Em Desenvolvimento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona - Processo */}
      <section className="py-16 px-4 bg-axcontrol-light">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-axcontrol-primary mb-4">Como Funciona</h3>
            <p className="text-lg text-axcontrol-dark/70">Processo seguro e eficiente em 4 etapas</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-axcontrol-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-3">1. Acesso da equipe</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  A equipe entra com login institucional (ID da equipe + senha).
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-axcontrol-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-3">2. Envio de caso</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  Dados do caso são submetidos de forma segura e estruturada.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-axcontrol-secondary-2 rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Cpu className="w-8 h-8 text-axcontrol-dark" />
                </div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-3">3. Análise AxIntel™</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  IA especializada processa e analisa o caso com metodologia AxSet ACORDO™.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-3">4. Entrega</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  Parecer técnico estruturado, com quesitos e recomendações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AxIntel™ Dashboard - Métricas */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-axcontrol-primary mb-4">AxIntel™ em Ação</h3>
            <p className="text-lg text-axcontrol-dark/70">Veja nossa inteligência artificial trabalhando em tempo real</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="interactive-card bg-white backdrop-blur-sm border-axcontrol-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-axcontrol-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-axcontrol-primary mb-2">98</div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-2">Casos Lidos</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  PDFs analisados pela AxIntel™
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white backdrop-blur-sm border-axcontrol-accent/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-axcontrol-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-axcontrol-primary mb-2">47</div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-2">Relatórios Gerados</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  Pareceres estruturados entregues
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white backdrop-blur-sm border-axcontrol-secondary-2/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-axcontrol-secondary-2 rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Target className="w-8 h-8 text-axcontrol-dark" />
                </div>
                <div className="text-3xl font-bold text-axcontrol-primary mb-2">156</div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-2">Quesitos Elaborados</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  Perguntas jurídico-médicas formuladas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AxWise™ - MedValor® - Corrigido conforme referência */}
      <section className="py-16 px-4 bg-axcontrol-light">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-axcontrol-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <h3 className="text-3xl font-bold text-axcontrol-primary">AxWise™ - MedValor®</h3>
              </div>
              
              <p className="text-lg text-axcontrol-dark mb-6 leading-relaxed">
                Aprendizado contínuo através de eventos e cursos especializados. A <strong>MedValor®</strong> 
                oferece capacitação em VBHC, análises jurídico-médicas e uso de tecnologias em saúde.
              </p>
              
              <div className="space-y-4 mb-8">
                <a 
                  href="https://cursos.medvalor.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-axcontrol-accent hover:text-axcontrol-primary transition-smooth font-medium"
                >
                  Ver cursos disponíveis →
                </a>
                
                <div className="block">
                  <a 
                    href="https://medvalor.com.br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-axcontrol-accent hover:text-axcontrol-primary transition-smooth font-medium"
                  >
                    Acesse MedValor® →
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border border-axcontrol-secondary-1/30 p-6 text-center">
                <div className="w-12 h-12 bg-axcontrol-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-axcontrol-primary mb-2">Eventos Corporativos</h4>
                <p className="text-sm text-axcontrol-dark/70 mb-4">Workshops e treinamentos in-company</p>
              </Card>

              <Card className="bg-white border border-axcontrol-secondary-1/30 p-6 text-center">
                <div className="w-12 h-12 bg-axcontrol-secondary-2 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-axcontrol-dark" />
                </div>
                <h4 className="text-xl font-bold text-axcontrol-primary mb-2">Cursos Online</h4>
                <p className="text-sm text-axcontrol-dark/70 mb-4">Capacitação a distância especializada</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Padrão AxControl™ conforme referência */}
      <footer className="bg-white border-t border-axcontrol-secondary-1/30 py-8 px-4">
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
              AxView™ | WebApps – Gestão e Consultoria em Saúde
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-axcontrol-dark/60 flex-wrap">
              <a href="https://axcare.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-axcontrol-primary transition-smooth">
                axcare.com.br
              </a>
              <span>|</span>
              <span>Copyright © 2025 AxiaCare | Todos os direitos reservados</span>
              <span>|</span>
              <span>Uma empresa GTCorp.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
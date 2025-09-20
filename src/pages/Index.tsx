import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Scale, Shield, Clock, CheckCircle, ArrowRight, Building, Cpu, Users, Mail, TrendingUp, BarChart3, FileCheck, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header - AxControl™ Visual */}
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
                  Ambiente Inteligente de Necessidades Jurídicas na Saúde
                </span>
                <span className="text-xs text-axcontrol-primary font-medium sm:hidden">
                  Necessidades Jurídicas na Saúde
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <div className="hidden md:block">
                <img 
                  src="/axiacare-logo-oficial.png"
                  alt="AxiaCare" 
                  className="h-8 object-contain"
                />
              </div>
              <Link to="/acesso">
                <Button 
                  size="sm"
                  className="bg-axcontrol-primary hover:bg-axcontrol-primary/90 text-white shadow-button px-3 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-medium whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Entrar no ambiente</span>
                  <span className="sm:hidden">Entrar</span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* LGPD Badge */}
      <div className="bg-axcontrol-secondary-2/20 border-b border-axcontrol-accent/20">
        <div className="container mx-auto px-4 py-1.5 md:py-2">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-axcontrol-dark">
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-axcontrol-accent" />
              <span className="font-medium text-center">Ambiente seguro • ISO/IEC 27001 e 27701 • LGPD</span>
            </div>
            <a 
              href="https://hub.guithome.com.br/axia/privacidade.html"
              target="_blank"
              rel="noopener noreferrer"
              className="chip-compliance hover:bg-success/80 transition-smooth text-xs"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section - Conteúdo Original */}
      <section className="py-12 md:py-20 px-4 bg-axcontrol-light">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-axcontrol-dark mb-4 md:mb-6">
              Themis™
              <span className="block text-axcontrol-dark/80 text-xl md:text-3xl mt-2">Um ambiente inteligente em necessidades jurídicas na saúde</span>
            </h2>
            <p className="text-lg md:text-xl text-axcontrol-dark/80 max-w-3xl mx-auto leading-relaxed mb-4 md:mb-6 font-medium">
              Criado por profissionais da saúde. Potencializado por <span className="font-bold text-axcontrol-primary">AI</span>.
            </p>
            <p className="text-base md:text-lg text-axcontrol-dark/70 max-w-3xl mx-auto leading-relaxed">
              Gera relatórios e quesitos para diferentes necessidades jurídico-médicas, com automações e motores de IA pensados para equipes.
            </p>
          </div>
          
          <Link to="/acesso">
            <Button size="lg" className="bg-axcontrol-primary hover:bg-axcontrol-primary/90 text-white shadow-institutional hover-lift px-6 md:px-10 py-3 md:py-5 text-base md:text-lg font-semibold rounded-xl">
              Entrar no ambiente
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Como Funciona - Conteúdo Original */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-axcontrol-primary mb-2 md:mb-4">Como Funciona</h3>
            <p className="text-base md:text-lg text-axcontrol-dark/70">Processo seguro e eficiente em 4 etapas</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-axcontrol-primary rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-button">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-axcontrol-primary mb-2 md:mb-3">1. Acesso da equipe</h4>
                <p className="text-xs md:text-sm text-axcontrol-dark/70">
                  A equipe entra com login institucional (ID da equipe + senha).
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-axcontrol-accent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-button">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-axcontrol-primary mb-2 md:mb-3">2. Envio de caso</h4>
                <p className="text-xs md:text-sm text-axcontrol-dark/70">
                  Envie PDFs e os dados do caso por formulário seguro.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-axcontrol-secondary-2 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-button">
                  <Cpu className="w-6 h-6 md:w-8 md:h-8 text-axcontrol-dark" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-axcontrol-primary mb-2 md:mb-3">3. Análise IA</h4>
                <p className="text-xs md:text-sm text-axcontrol-dark/70">
                  A Themis™ organiza o material e estrutura pontos clínicos e técnico-jurídicos usando prompts privados versionados.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-button">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-axcontrol-primary mb-2 md:mb-3">4. Entrega</h4>
                <p className="text-xs md:text-sm text-axcontrol-dark/70">
                  O relatório estruturado chega no e-mail institucional com protocolo do caso e registro da equipe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AxIntel™ Em Ação - Dashboard */}
      <section className="py-12 md:py-16 px-4 bg-axcontrol-secondary-1/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-axcontrol-primary mb-2 md:mb-4">AxIntel™ em Ação</h3>
            <p className="text-base md:text-lg text-axcontrol-dark/70">Veja nossa inteligência artificial trabalhando em tempo real</p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            <Card className="interactive-card bg-white backdrop-blur-sm border-axcontrol-accent/20">
              <CardContent className="p-4 md:p-8 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-axcontrol-primary rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-button">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-axcontrol-primary mb-1 md:mb-2">98</div>
                <h4 className="text-base md:text-lg font-semibold text-axcontrol-primary mb-1 md:mb-2">Casos Lidos</h4>
                <p className="text-xs md:text-sm text-axcontrol-dark/70">
                  PDFs analisados pela <span className="font-bold text-axcontrol-primary">AxIntel™</span>
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white backdrop-blur-sm border-axcontrol-accent/20">
              <CardContent className="p-4 md:p-8 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-axcontrol-accent rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-button">
                  <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-axcontrol-primary mb-1 md:mb-2">47</div>
                <h4 className="text-base md:text-lg font-semibold text-axcontrol-primary mb-1 md:mb-2">Relatórios Gerados</h4>
                <p className="text-xs md:text-sm text-axcontrol-dark/70">
                  Pareceres estruturados entregues pelas equipes
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white backdrop-blur-sm border-axcontrol-accent/20">
              <CardContent className="p-4 md:p-8 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-axcontrol-secondary-2 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-button">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-axcontrol-dark" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-axcontrol-primary mb-1 md:mb-2">156</div>
                <h4 className="text-base md:text-lg font-semibold text-axcontrol-primary mb-1 md:mb-2">Quesitos Elaborados</h4>
                <p className="text-xs md:text-sm text-axcontrol-dark/70">
                  Perguntas jurídico-médicas formuladas automaticamente
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* O que é a Themis™ */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-axcontrol-primary mb-4 md:mb-6">O que é a Themis™?</h3>
          <p className="text-base md:text-lg text-axcontrol-dark leading-relaxed">
            A <strong>Themis™</strong> é um ambiente inteligente pensado para diferentes equipes e necessidades jurídico-médicas. 
            Utilizando inteligência artificial especializada (<strong>AxIntel™</strong>), a plataforma gera pareceres estruturados, 
            quesitos e relatórios seguindo a metodologia <strong>AxSet ACORDO™</strong>, desenvolvida especificamente para análises médicas.
          </p>
        </div>
      </section>

      {/* Por que escolher a Themis™ */}
      <section className="py-12 md:py-16 px-4 bg-axcontrol-light">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-axcontrol-primary mb-2 md:mb-4">Por que escolher a Themis™?</h3>
            <p className="text-base md:text-lg text-axcontrol-dark/70">Vantagens que fazem a diferença</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-axcontrol-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <FileCheck className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-3">Relatórios Estruturados</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  Documentos organizados seguindo padrões profissionais e metodologia específica.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-axcontrol-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-3">Multi-tenancy</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  Cada equipe tem seu ambiente seguro e isolado com controle de acesso próprio.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-axcontrol-secondary-2 rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Cpu className="w-8 h-8 text-axcontrol-dark" />
                </div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-3">IA Especializada</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  AxIntel™ com conhecimento específico em análises jurídico-médicas.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card bg-white border-axcontrol-secondary-1/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-axcontrol-primary mb-3">Ambiente Institucional</h4>
                <p className="text-sm text-axcontrol-dark/70">
                  Governança, compliance e segurança em ambiente profissional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Importante - Disclosure */}
      <section className="py-8 md:py-12 px-4 bg-axcontrol-secondary-2/20 border-y border-axcontrol-accent/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-3 md:mb-4">
            <Scale className="w-5 h-5 md:w-6 md:h-6 text-axcontrol-accent" />
            <h3 className="text-lg md:text-xl font-semibold text-axcontrol-dark">Importante</h3>
          </div>
          <p className="text-xs md:text-sm text-axcontrol-dark/80 leading-relaxed">
            A <strong>Themis™</strong> é uma ferramenta de apoio e não substitui a análise médica ou jurídica profissional. 
            Os relatórios gerados devem sempre ser revistos por profissionais qualificados antes de qualquer uso oficial ou decisório.
          </p>
        </div>
      </section>

      {/* A força da AxiaCare® */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
                <img 
                  src="/axia-logo.png" 
                  alt="AxiaCare®" 
                  className="w-12 h-12 md:w-16 md:h-16 object-contain shadow-button"
                />
                <h3 className="text-2xl md:text-3xl font-bold text-axcontrol-primary">A força da AxiaCare®</h3>
              </div>
              
              <p className="text-base md:text-lg text-axcontrol-dark mb-4 md:mb-6 leading-relaxed">
                A <strong>AxiaCare®</strong> é uma empresa comprometida com cuidados de saúde baseados em valor (VBHC - Value Based Health Care), 
                desenvolvendo soluções inteligentes que conectam profissionais, instituições e pacientes.
              </p>
              
              <div className="mb-4 md:mb-6">
                <h4 className="text-lg md:text-xl font-semibold text-axcontrol-primary mb-3 md:mb-4">AxControls™ - Ecossistema Integrado:</h4>
                <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-axcontrol-accent rounded-full"></div>
                    <span className="text-axcontrol-dark"><strong>AxWay™</strong> - Experiência clínica aplicada à área jurídica.</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-axcontrol-secondary-2 rounded-full"></div>
                    <span className="text-axcontrol-dark"><strong>AxView™</strong> - Documentos organizados em padrões profissionais.</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-axcontrol-primary rounded-full"></div>
                    <span className="text-axcontrol-dark"><strong>AxIntel™</strong> - Inteligência artificial especializada.</span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-axcontrol-secondary-1 rounded-full"></div>
                    <span className="text-axcontrol-dark"><strong>AxWise™</strong> - Educação continuada e MedValor®.</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-6">
                <a 
                  href="https://axiacare.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-axcontrol-accent hover:text-axcontrol-primary transition-smooth font-medium text-sm md:text-base"
                >
                  Conheça mais sobre a AxiaCare® 
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-axcontrol-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            Pronto para transformar sua prática jurídico-médica?
          </h3>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
            Junte-se às equipes que já utilizam a Themis™ para análises mais precisas e eficientes
          </p>
          
          <div className="space-y-3 md:space-y-4">
            <Link to="/acesso">
              <Button size="lg" className="bg-white text-axcontrol-primary hover:bg-white/90 shadow-institutional hover-lift px-6 md:px-10 py-3 md:py-5 text-base md:text-lg font-semibold rounded-xl mr-0 md:mr-4 mb-3 md:mb-0">
                Entrar no Ambiente
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" />
              </Button>
            </Link>
            
            <p className="text-xs md:text-sm text-white/80">
              Ou solicite cadastro para sua equipe: <a href="mailto:themis@axcare.com.br" className="text-white underline font-medium">themis@axcare.com.br</a>
            </p>
          </div>
        </div>
      </section>

      {/* AxWise™ - MedValor® - Mais sutil */}
      <section className="py-8 md:py-12 px-4 bg-axcontrol-light/50 border-t border-axcontrol-secondary-1/20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/medvalor-logo-new.png"
                  alt="MedValor Logo" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-80"
                />
                <h3 className="text-lg md:text-xl font-semibold text-axcontrol-primary/80">AxWise™ - MedValor®</h3>
              </div>
              
              <p className="text-sm md:text-base text-axcontrol-dark/70 mb-4 leading-relaxed">
                Aprendizado contínuo através de eventos e cursos especializados. A <strong>MedValor®</strong> 
                oferece capacitação em VBHC, análises jurídico-médicas e uso de tecnologias em saúde.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <a 
                  href="https://cursos.medvalor.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-axcontrol-accent/80 hover:text-axcontrol-primary transition-smooth"
                >
                  Ver cursos disponíveis →
                </a>
                
                <a 
                  href="https://medvalor.med.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-axcontrol-accent/80 hover:text-axcontrol-primary transition-smooth"
                >
                  Acesse MedValor® →
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Card className="bg-white/60 border border-axcontrol-secondary-1/20 p-3 md:p-4 text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-axcontrol-primary/80 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Building className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-axcontrol-primary mb-1">Eventos Corporativos</h4>
                <p className="text-xs text-axcontrol-dark/60">Workshops e treinamentos in-company</p>
              </Card>

              <Card className="bg-white/60 border border-axcontrol-secondary-1/20 p-3 md:p-4 text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-axcontrol-secondary-2/80 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-axcontrol-dark" />
                </div>
                <h4 className="text-sm md:text-base font-semibold text-axcontrol-primary mb-1">Cursos Online</h4>
                <p className="text-xs text-axcontrol-dark/60">Capacitação a distância especializada</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

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
  );
};

export default Index;
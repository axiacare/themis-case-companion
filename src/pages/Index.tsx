import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Scale, Shield, Clock, CheckCircle, ArrowRight, Building, Cpu, Users, Mail, TrendingUp, BarChart3, FileCheck, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary dark">
      {/* Header */}
      <header className="border-b bg-card backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/1d3ef3f4-c925-4cf4-9f21-94a108155b6f.png"
                alt="Themis™ Logo" 
                className="w-16 h-16 rounded-xl object-cover hover-glow"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-foreground">Themis™</h1>
                <span className="text-sm text-foreground/70 font-medium">AxControl™</span>
              </div>
            </div>
            <Link to="/acesso">
              <Button variant="default" className="gradient-primary text-primary-foreground shadow-button hover-lift px-6 py-2.5 text-base font-medium">
                Entrar no ambiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* LGPD Badge */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-primary">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Ambiente seguro • ISO/IEC 27001 e 27701 • LGPD</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Themis™
              <span className="block text-foreground/70 text-3xl mt-2">Um ambiente inteligente em necessidades jurídicas na saúde</span>
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed mb-6 font-medium">
              Criado por profissionais da saúde. Potencializado por IA.
            </p>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Gera relatórios e quesitos para diferentes necessidades jurídico-médicas, com automações e motores de IA pensados para equipes.
            </p>
          </div>
          
          <Link to="/acesso">
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant hover-lift px-10 py-5 text-lg font-semibold rounded-xl">
              Entrar no ambiente
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Como Funciona - Second fold */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Como Funciona</h3>
            <p className="text-lg text-foreground/70">Processo seguro e eficiente em 4 etapas</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">1. Acesso da equipe</h4>
                <p className="text-sm text-foreground/70">
                  A equipe entra com login institucional (ID da equipe + senha).
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <FileText className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">2. Envio de caso</h4>
                <p className="text-sm text-foreground/70">
                  Envie PDFs e os dados do caso por formulário seguro.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Cpu className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">3. Análise IA</h4>
                <p className="text-sm text-foreground/70">
                  A Themis™ organiza o material e estrutura pontos clínicos e técnico-jurídicos usando prompts privados versionados.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">4. Entrega</h4>
                <p className="text-sm text-foreground/70">
                  O relatório estruturado chega no e-mail institucional com protocolo do caso e registro da equipe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* O que é a Themis™ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-6">O que é a Themis™</h3>
          </div>
          <Card className="shadow-elegant bg-gradient-accent border-primary/20">
            <CardContent className="p-8">
              <p className="text-lg text-foreground leading-relaxed text-center">
                A Themis™ é um AxControl™ desenhado pela AxiaCare® para apoiar equipes em necessidades jurídicas na saúde. Combina método, visuais e inteligência (AxIntel™) para transformar documentos extensos em relatórios objetivos. Na parte de quesitos médicos, utiliza o AxSet ACORDO™ — uma metodologia prática para construir quesitos técnicos que apoiam o jurídico e organizam a atuação clínica da equipe. A entrega ocorre por relatórios estruturados, produzidos a partir dos PDFs enviados pelo ambiente da equipe e disponibilizados no e-mail institucional.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Por que escolher a Themis™ */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Por que escolher a Themis™</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">Relatórios estruturados</h4>
                    <p className="text-foreground/80">
                      Receba em poucos minutos no seu e-mail institucional, acelerando seus processos jurídicos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">Multi-tenant por equipe</h4>
                    <p className="text-foreground/80">
                      Dados segregados por equipe, com trilha auditável e governança institucional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">IA especializada</h4>
                    <p className="text-foreground/80">
                      Linguagem clara e metodologia de quesitos, alinhadas ao trabalho do jurídico.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">Ambiente institucional</h4>
                    <p className="text-foreground/80">
                      Fluxo padronizado, política de retenção e acessos definidos pela sua equipe.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* A força da AxiaCare® */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-6">A força da AxiaCare® por trás da Themis™</h3>
            <Card className="shadow-elegant bg-gradient-accent border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src="/axiacare-logo.png"
                    alt="AxiaCare®" 
                    className="h-12 object-contain"
                  />
                </div>
                <p className="text-lg text-foreground leading-relaxed text-center mb-6">
                  A AxiaCare cria e conduz soluções completas para ecossistemas de saúde, integrando empresas, instituições, prestadores e líderes do setor. Nosso trabalho segue os <strong className="text-primary">princípios do cuidado baseado em valor (Value-Based Health Care)</strong>: é centrado no paciente, guiado por dados e orientado a resultados concretos.
                </p>
                <p className="text-base text-foreground/80 leading-relaxed text-center">
                  Muito além de uma consultoria, atuamos em todas as etapas – do diagnóstico inicial à sustentação contínua. Identificamos a necessidade, mapeamos e engajamos os parceiros certos, co-desenhamos a jornada de valor e implementamos a solução com apoio institucional sólido e governança clínica efetiva.
                </p>
                <div className="mt-6 flex justify-center">
                  <a 
                    href="https://www.axcare.com.br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover transition-smooth font-semibold hover-lift inline-flex items-center gap-2"
                  >
                    Conheça mais sobre AxiaCare® 
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold text-primary-foreground mb-6">Pronto para Começar?</h3>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Acesse o ambiente da sua equipe ou solicite o cadastro para ter um ambiente próprio da Themis™.
          </p>
          <Link to="/acesso">
            <Button size="lg" className="bg-card text-primary hover:bg-card/90 shadow-elegant hover-lift px-10 py-4 text-lg font-semibold rounded-xl">
              Entrar no Ambiente
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* AxWise™ - MedValor® */}
      <section className="py-12 px-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/medvalor-logo.png"
                alt="MedValor®" 
                className="h-12 object-contain"
              />
              <div className="h-8 w-px bg-orange-300"></div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-1">AxWise™</h3>
                <p className="text-sm text-orange-600 dark:text-orange-300 font-medium">Capacitação Contínua</p>
              </div>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Aprenda enquanto usa com eventos e cursos especializados da <strong className="text-orange-600 dark:text-orange-300">MedValor®</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://linktr.ee/gui.thome" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium hover-lift transition-smooth"
              >
                Em Alta - Cursos Disponíveis
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="https://www.medvalor.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-orange-500 text-orange-600 dark:text-orange-300 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition-smooth"
              >
                MedValor® - Site Oficial
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AxIntel™ Em Ação - Dashboard */}
      <section className="py-16 px-4 bg-gradient-accent/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">AxIntel™ em Ação</h3>
            <p className="text-lg text-foreground/70">Veja nossa inteligência artificial trabalhando em tempo real</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-card hover-lift bg-card backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <FileText className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">98</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Casos Lidos</h4>
                <p className="text-sm text-foreground/70">PDFs analisados pela IA hoje</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover-lift bg-card backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <BarChart3 className="w-8 h-8 text-accent-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">80</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Relatórios Gerados</h4>
                <p className="text-sm text-foreground/70">Análises estruturadas entregues</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover-lift bg-card backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Target className="w-8 h-8 text-success-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">1.372</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Quesitos Elaborados</h4>
                <p className="text-sm text-foreground/70">Pontos técnicos identificados</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclosure - Importante */}
      <section className="py-8 px-4 bg-muted/50 border-t">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-accent bg-accent/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-foreground mb-3">Importante</h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  A Themis™ não substitui análise jurídica nem avaliação clínica. É uma ferramenta de apoio para equipes institucionais, que devem revisar e validar tecnicamente as entregas. Em situações urgentes, procure avaliação presencial.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-dark text-primary-foreground py-12 px-4 border-t border-border/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <img 
                  src="/lovable-uploads/1d3ef3f4-c925-4cf4-9f21-94a108155b6f.png"
                  alt="Themis™ Logo" 
                  className="w-12 h-12 rounded-xl object-cover hover-glow"
                />
                <div className="flex flex-col">
                  <h4 className="text-xl font-bold">Themis™</h4>
                  <span className="text-sm text-primary-foreground/70">AxControl™</span>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/80 max-w-xs mx-auto md:mx-0">
                Um ambiente inteligente em necessidades jurídicas na saúde
              </p>
            </div>

            {/* Links Section */}
            <div className="text-center">
              <h5 className="font-semibold text-primary-foreground mb-4">Links Úteis</h5>
              <div className="space-y-3">
                <Link 
                  to="/politica-privacidade" 
                  className="block text-primary-foreground/70 hover:text-primary transition-smooth text-sm hover-lift"
                >
                  Política de Privacidade
                </Link>
                <a 
                  href="https://www.axcare.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-primary-foreground/70 hover:text-primary transition-smooth text-sm hover-lift"
                >
                  AxiaCare® - www.axcare.com.br
                </a>
                <a 
                  href="https://guithome.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-primary-foreground/70 hover:text-primary transition-smooth text-sm hover-lift"
                >
                  GuiTHome - guithome.com.br
                </a>
              </div>
            </div>

            {/* Information Section */}
            <div className="text-center md:text-right">
              <h5 className="font-semibold text-primary-foreground mb-4">Informações</h5>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>Powered by AxiaCare®</p>
                <p>Ambiente interno por equipe</p>
                <p className="text-xs">LGPD Compliant</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-primary-foreground/20 pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-primary-foreground/90 font-medium">
                Themis™ é um AxControl™ da AxiaCare®
              </p>
              <p className="text-sm text-primary-foreground/80">
                © 2025 AxiaCare® • Todos os direitos reservados.
              </p>
              <p className="text-xs text-primary-foreground/60 max-w-2xl mx-auto leading-relaxed">
                Serviço de apoio técnico; não substitui avaliação médica ou jurídica. 
                Em situações urgentes, procure avaliação presencial.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Scale, Shield, Clock, CheckCircle, ArrowRight, Building, Cpu, Users, Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Themis™</h1>
            </div>
            <Link to="/acesso">
              <Button variant="default" className="shadow-button transition-bounce hover:scale-105">
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
            <span className="font-medium">Ambiente interno • Dados tratados por equipe (LGPD)</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-primary mb-6">
              Themis™ • Assistente jurídico médica
              <span className="block text-muted-foreground text-3xl mt-2">para equipes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ambiente interno e seguro para análise de casos e geração de relatórios/quesitos com apoio de IA.
            </p>
          </div>
          
          <Link to="/acesso">
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant hover:shadow-button transition-bounce hover:scale-105 px-8 py-4 text-lg">
              Entrar no ambiente
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Como Funciona</h3>
            <p className="text-lg text-muted-foreground">Processo seguro e eficiente em 4 etapas</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-primary mb-3">1. Acesso da Equipe</h4>
                <p className="text-sm text-muted-foreground">
                  A equipe acessa o ambiente com login institucional (ID da equipe + senha)
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <FileText className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-primary mb-3">2. Envio de Caso</h4>
                <p className="text-sm text-muted-foreground">
                  Envia PDFs médicos e dados do caso através de formulário seguro
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Cpu className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-primary mb-3">3. Análise IA</h4>
                <p className="text-sm text-muted-foreground">
                  A Themis™ organiza e gera o relatório estruturado com IA especializada
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-primary mb-3">4. Entrega</h4>
                <p className="text-sm text-muted-foreground">
                  Relatório enviado por email com protocolo do caso e registro da equipe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AxControl/AxSet Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-elegant bg-gradient-accent border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  AxControl Themis™ – Ambiente Inteligente em Necessidades Jurídicas na Saúde
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Linha:</strong> Apoio Médico em Processos
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">AxSet ACORDO™</h4>
                    <p className="text-sm text-muted-foreground">
                      Estruturando Quesitos Médicos
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Método</h4>
                    <p className="text-sm text-muted-foreground">
                      Metodologia para construir quesitos técnicos que apoiam o jurídico
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Visual</h4>
                    <p className="text-sm text-muted-foreground">
                      Relatório Estruturado
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Automação</h4>
                    <p className="text-sm text-muted-foreground">
                      WebApp + Make + IA (OpenAI Responses)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Por que Escolher a Themis™?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-3">Segurança por Equipe</h4>
                    <p className="text-muted-foreground">
                      Dados segregados por equipe, ambiente controlado e auditável. Conformidade total LGPD.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-3">Entrega Rápida</h4>
                    <p className="text-muted-foreground">
                      Relatórios técnicos estruturados em até 48 horas, acelerando seus processos jurídicos.
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
                    <h4 className="text-xl font-semibold text-primary mb-3">Multi-tenant</h4>
                    <p className="text-muted-foreground">
                      Cada equipe possui ambiente isolado, com controle total sobre seus dados e casos.
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
                    <h4 className="text-xl font-semibold text-primary mb-3">IA Especializada</h4>
                    <p className="text-muted-foreground">
                      Análise médico-legal com IA treinada em metodologias técnicas e normas jurídicas.
                    </p>
                  </div>
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
            <Button size="lg" className="bg-card text-primary hover:bg-card/90 shadow-elegant hover:shadow-card transition-bounce hover:scale-105 px-8 py-4 text-lg">
              Entrar no Ambiente
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-semibold">Themis™</h4>
          </div>
          <div className="text-center text-primary-foreground/80 space-y-2">
            <p className="text-sm">
              Themis™ é um ambiente AxIntel™ da AxiaCare®.
            </p>
            <p className="text-sm">
              © 2025 AxiaCare® • Todos os direitos reservados.
            </p>
            <p className="text-xs mt-4 max-w-2xl mx-auto">
              Serviço de apoio técnico; não substitui avaliação médica ou jurídica.
            </p>
          </div>
          <div className="text-center mt-6">
            <Link 
              to="/politica-privacidade" 
              className="text-primary-foreground/70 hover:text-primary-foreground text-sm underline-offset-4 hover:underline transition-smooth"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
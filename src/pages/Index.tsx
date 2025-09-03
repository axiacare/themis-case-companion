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
              Themis™
              <span className="block text-muted-foreground text-3xl mt-2">um ambiente inteligente em necessidades jurídicas na saúde</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ambiente interno e seguro, pensado para equipes. Gera relatórios e quesitos para diferentes necessidades jurídico-médicas, com automações e motores de IA.
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
                <h4 className="text-lg font-semibold text-primary mb-3">1. Acesso da equipe</h4>
                <p className="text-sm text-muted-foreground">
                  A equipe entra com login institucional (ID da equipe + senha).
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-button">
                  <FileText className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-primary mb-3">2. Envio de caso</h4>
                <p className="text-sm text-muted-foreground">
                  Envie PDFs e os dados do caso por formulário seguro.
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
                  A Themis organiza o material e estrutura pontos clínicos e técnico-jurídicos usando prompts privados versionados.
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
                  O relatório estruturado chega no e-mail institucional com protocolo do caso e registro da equipe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* O que é a Themis */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-primary mb-6">O que é a Themis</h3>
          </div>
          <Card className="shadow-elegant bg-gradient-accent border-primary/20">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                A Themis™ é um AxControl™ desenhado pela AxiaCare® para apoiar equipes em necessidades jurídicas na saúde. Combina método, visuais e inteligência (AxIntel™) para transformar documentos extensos em relatórios objetivos. Na parte de quesitos médicos, utiliza o AxSet ACORDO™ — uma metodologia prática para construir quesitos técnicos que apoiam o jurídico e organizam a atuação clínica da equipe. A entrega ocorre por relatórios estruturados, produzidos a partir dos PDFs enviados pelo ambiente da equipe e disponibilizados no e-mail institucional.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Por que escolher a Themis</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-3">Relatórios estruturados</h4>
                    <p className="text-muted-foreground">
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
                    <h4 className="text-xl font-semibold text-primary mb-3">Multi-tenant por equipe</h4>
                    <p className="text-muted-foreground">
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
                    <h4 className="text-xl font-semibold text-primary mb-3">IA especializada</h4>
                    <p className="text-muted-foreground">
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
                    <h4 className="text-xl font-semibold text-primary mb-3">Ambiente institucional</h4>
                    <p className="text-muted-foreground">
                      Fluxo padronizado, política de retenção e acessos definidos pela sua equipe.
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

      {/* Disclosure - Importante */}
      <section className="py-8 px-4 bg-muted/50 border-t">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-accent bg-accent/10">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-primary mb-3">Importante</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A Themis™ não substitui análise jurídica nem avaliação clínica. É uma ferramenta de apoio para equipes institucionais, que devem revisar e validar tecnicamente as entregas. Em situações urgentes, procure avaliação presencial.
                </p>
              </div>
            </CardContent>
          </Card>
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
            <p className="text-xs text-primary-foreground/60">
              Ambiente interno por equipe • LGPD.
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
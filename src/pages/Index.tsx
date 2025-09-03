import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Scale, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";

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
              <h1 className="text-2xl font-bold text-primary">Themis</h1>
            </div>
            <Link to="/enviar-caso">
              <Button variant="default" className="shadow-button transition-bounce hover:scale-105">
                Enviar Caso
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-primary mb-6">
              Assistente Jurídico-Médica
              <span className="block text-accent-primary">Inteligente</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A Themis utiliza inteligência artificial para analisar casos médico-legais, fornecendo pareceres técnicos precisos e fundamentados para profissionais do direito.
            </p>
          </div>
          
          <Link to="/enviar-caso">
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant hover:shadow-button transition-bounce hover:scale-105 px-8 py-4 text-lg">
              Começar Análise Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Como Funciona</h3>
            <p className="text-lg text-muted-foreground">Processo simples e seguro em 3 etapas</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-4">1. Envie seu Caso</h4>
                <p className="text-muted-foreground">
                  Preencha nosso formulário com as informações do caso e anexe os documentos médicos relevantes.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scale className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-4">2. Análise Técnica</h4>
                <p className="text-muted-foreground">
                  Nossa IA especializada analisa os documentos e gera um parecer técnico fundamentado em literatura médica.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-4">3. Receba o Parecer</h4>
                <p className="text-muted-foreground">
                  Em até 48h, você recebe um parecer detalhado pronto para ser utilizado em seu processo jurídico.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">Por que Escolher a Themis?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-3">Segurança Total</h4>
                    <p className="text-muted-foreground">
                      Todos os dados são criptografados e tratados com total confidencialidade, seguindo as normas LGPD.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-3">Agilidade</h4>
                    <p className="text-muted-foreground">
                      Pareceres técnicos em até 48 horas, acelerando significativamente seus processos jurídicos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-accent">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold text-primary mb-6">Pronto para Começar?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Envie seu primeiro caso agora e experimente a precisão da análise jurídico-médica com IA.
          </p>
          <Link to="/enviar-caso">
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant hover:shadow-button transition-bounce hover:scale-105 px-8 py-4 text-lg">
              Enviar Meu Caso
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-semibold">Themis</h4>
          </div>
          <p className="text-primary-foreground/80">
            Assistente Jurídico-Médica Inteligente © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, ArrowLeft, Shield, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <picture>
                <source srcSet="/logo-axia-principal-optimized.webp" type="image/webp" />
                <img 
                  src="/logo-axia-principal-optimized.png"
                  alt="Themis™ Logo" 
                  className="w-16 h-16 object-contain"
                />
              </picture>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white">Themis™</h1>
                <span className="text-sm text-white/80 font-medium">AxControl™</span>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" className="transition-smooth">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* LGPD Badge */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-4 text-sm text-white">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Ambiente interno por equipe • LGPD</span>
            </div>
            <a 
              href="https://hub.guithome.com.br/axia/privacidade.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/20 hover:bg-primary/30 px-3 py-1 rounded-full text-xs font-medium text-white/90 hover:text-white transition-smooth border border-primary/30 hover:border-primary/50 shadow-sm hover:shadow-md"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">Política de Privacidade</h2>
          <p className="text-lg text-muted-foreground">
            Como tratamos os dados no ambiente Themis™
          </p>
        </div>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Shield className="w-5 h-5" />
                <span>Tratamento de Dados por Equipe</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                A Themis™ é um ambiente AxIntel™ da AxiaCare® que opera com base no tratamento de dados 
                em nível institucional por equipe cadastrada. Cada equipe possui um ambiente segregado e 
                controlado, garantindo que os dados sejam tratados de forma isolada.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Principios Fundamentais:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Segregação completa de dados entre equipes</li>
                  <li>Acesso restrito aos membros autorizados da equipe</li>
                  <li>Controle de sessão por equipe, não por usuário individual</li>
                  <li>Ambiente interno controlado e auditável</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">Documentos e Arquivos PDF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Os arquivos PDF enviados pelas equipes são vinculados exclusivamente ao ambiente da 
                equipe que os submeteu. O tratamento dos documentos segue rigorosos protocolos de segurança:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-accent/30 p-4 rounded-lg">
                  <h5 className="font-semibold text-primary mb-2">Durante o Processamento</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>URLs temporárias e assinadas</li>
                    <li>Processamento isolado por equipe</li>
                    <li>Análise com IA dedicada</li>
                    <li>Geração de relatório estruturado</li>
                  </ul>
                </div>
                <div className="bg-accent/30 p-4 rounded-lg">
                  <h5 className="font-semibold text-primary mb-2">Após o Processamento</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Exclusão automática dos arquivos temporários</li>
                    <li>Manutenção apenas do relatório gerado</li>
                    <li>Registro do protocolo e equipe</li>
                    <li>Auditoria completa do processo</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">Retenção e Exclusão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                A política de retenção de dados é acordada individualmente com cada equipe cadastrada, 
                respeitando as necessidades institucionais e os requisitos legais aplicáveis.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold text-primary mb-2">Controles de Retenção:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Período de retenção definido no acordo da equipe</li>
                  <li>Exclusão segura após o período acordado</li>
                  <li>Possibilidade de exclusão antecipada mediante solicitação</li>
                  <li>Backup seguro conforme acordo de nível de serviço</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">Compartilhamento e Uso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Os dados tratados pela Themis™ não são compartilhados externamente. O uso é 
                exclusivamente direcionado para:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Scale className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h5 className="font-semibold text-primary mb-1">Análise Técnica</h5>
                  <p className="text-xs text-muted-foreground">Processamento do caso médico-legal</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h5 className="font-semibold text-primary mb-1">Geração de Relatório</h5>
                  <p className="text-xs text-muted-foreground">Criação do parecer técnico estruturado</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h5 className="font-semibold text-primary mb-1">Entrega Segura</h5>
                  <p className="text-xs text-muted-foreground">Envio por email à equipe solicitante</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Contato e Direitos LGPD</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Para exercer seus direitos previstos na LGPD ou esclarecer dúvidas sobre o 
                tratamento de dados, entre em contato com nosso DPO (Data Protection Officer):
              </p>
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Canal DPO AxiaCare®</p>
                    <p className="text-sm text-muted-foreground">dpo@axiacare.com.br</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Resposta em até 15 dias úteis conforme Art. 19 da LGPD
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg border-l-4 border-primary">
          <p className="text-sm text-muted-foreground">
            <strong className="text-primary">Importante:</strong> A Themis™ é um serviço de apoio técnico 
            e não substitui avaliação médica ou jurídica profissional. Os relatórios gerados devem ser 
            utilizados como suporte complementar à análise especializada.
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8">
          <Link to="/">
            <Button variant="outline" className="mr-4">
              Voltar ao Início
            </Button>
          </Link>
          <Link to="/acesso">
            <Button className="gradient-primary text-primary-foreground">
              Acessar Ambiente
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
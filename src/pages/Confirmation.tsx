import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Scale, Mail, Clock, ArrowLeft, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Confirmation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { protocolNumber, teamRecord, email, teamId } = location.state || {};

  useEffect(() => {
    // If no protocol number, redirect to home
    if (!protocolNumber) {
      window.location.href = "/";
    }
  }, [protocolNumber]);

  const copyProtocol = () => {
    navigator.clipboard.writeText(protocolNumber);
    toast({
      title: "Protocolo copiado!",
      description: "Número do protocolo copiado para a área de transferência.",
    });
  };

  if (!protocolNumber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Themis™</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-elegant">
            <CheckCircle className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Caso Enviado com Sucesso!</h2>
          <p className="text-lg text-muted-foreground">
            Seu caso foi recebido e já está sendo processado pela nossa equipe de análise.
          </p>
        </div>

        <Card className="shadow-elegant mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Protocol Number */}
              <div className="text-center p-6 gradient-accent rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-2">Número do Protocolo</h3>
                <div className="flex items-center justify-center space-x-2">
                  <code className="text-2xl font-mono font-bold text-primary bg-background px-4 py-2 rounded border">
                    {protocolNumber}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyProtocol}
                    className="shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Guarde este número para acompanhar seu caso
                </p>
              </div>

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Próximos Passos:</h3>
                
                <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Confirmação por Email</h4>
                    <p className="text-sm text-muted-foreground">
                      Um email de confirmação foi enviado para <strong>{email}</strong> com os detalhes do seu caso.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Análise em Andamento</h4>
                    <p className="text-sm text-muted-foreground">
                      Nossa equipe de especialistas iniciará a análise dos seus documentos nas próximas horas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Parecer Técnico</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Em até 48 horas</strong>, você receberá o parecer técnico completo por email, 
                      pronto para ser utilizado em seu processo jurídico.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-foreground mb-2">Precisa de Ajuda?</h4>
                <p className="text-sm text-muted-foreground">
                  Entre em contato conosco citando seu número de protocolo: <strong>{protocolNumber}</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full transition-smooth">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
          <Link to="/enviar-caso" className="flex-1">
            <Button className="w-full gradient-primary text-primary-foreground shadow-button hover:shadow-elegant transition-bounce hover:scale-[1.02]">
              Enviar Outro Caso
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
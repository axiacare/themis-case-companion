import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, ArrowLeft, Building, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTeamAuth } from "@/contexts/TeamAuthContext";
import { useWebhookSettings } from "@/hooks/useWebhookSettings";

const Access = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useTeamAuth();
  const { settings } = useWebhookSettings();
  
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    teamId: "",
    password: ""
  });

  // Registration form state
  const [registrationData, setRegistrationData] = useState({
    institution: "",
    cnpj: "",
    responsibleName: "",
    position: "",
    email: "",
    phone: "",
    cityState: "",
    estimatedCases: "",
    consent: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.teamId.trim() || !loginData.password.trim()) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha ID da equipe e senha.",
        variant: "destructive"
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      // Modo de teste - aceita qualquer credencial se for URL de teste
      if (settings.authWebhookUrl.includes('httpbin.org')) {
        toast({
          title: "Modo de Teste Ativo",
          description: `Acesso liberado para equipe ${loginData.teamId} (modo desenvolvimento)`,
        });
        // Simula login bem-sucedido
        const success = await login(loginData.teamId, loginData.password, settings.authWebhookUrl);
        navigate("/enviar-caso");
      } else {
        const success = await login(loginData.teamId, loginData.password, settings.authWebhookUrl);
        
        if (success) {
          toast({
            title: "Acesso autorizado",
            description: `Bem-vindo à equipe ${loginData.teamId}!`,
          });
          navigate("/enviar-caso");
        } else {
          toast({
            title: "Acesso negado",
            description: "ID da equipe ou senha incorretos.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível validar as credenciais. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { institution, responsibleName, email, consent } = registrationData;
    
    if (!institution.trim() || !responsibleName.trim() || !email.trim()) {
      toast({
        title: "Dados obrigatórios",
        description: "Por favor, preencha instituição, responsável e email.",
        variant: "destructive"
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, informe um email válido.",
        variant: "destructive"
      });
      return;
    }

    if (!consent) {
      toast({
        title: "Consentimento obrigatório",
        description: "É necessário autorizar o contato para formalização.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingRegistration(true);

    try {
      // Modo de teste - simula sucesso se for URL de teste
      if (settings.teamWebhookUrl.includes('httpbin.org')) {
        toast({
          title: "Modo de Teste Ativo",
          description: "Solicitação simulada com sucesso (modo desenvolvimento).",
        });
      } else {
        const response = await fetch(settings.teamWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit');
        }

        toast({
          title: "Solicitação enviada",
          description: "Recebemos sua solicitação. Em breve entraremos em contato.",
        });
      }
      
      // Reset form
      setRegistrationData({
        institution: "",
        cnpj: "",
        responsibleName: "",
        position: "",
        email: "",
        phone: "",
        cityState: "",
        estimatedCases: "",
        consent: false
      });
    } catch (error) {
      toast({
        title: "Erro no envio",
        description: "Não foi possível enviar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingRegistration(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo-axia-principal.png"
                alt="Themis™ Logo" 
                className="w-16 h-16 object-contain"
              />
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
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">Acesso ao Ambiente</h2>
          <p className="text-lg text-muted-foreground">
            Entre com sua equipe cadastrada ou solicite o cadastro de uma nova equipe
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-primary text-center">Acesso por Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sou equipe cadastrada</TabsTrigger>
                <TabsTrigger value="register">Solicitar cadastro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-6 mt-6">
                <div className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg">
                  <Building className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Equipe Cadastrada</p>
                    <p className="text-sm text-muted-foreground">
                      Acesse com o ID e senha da sua equipe
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamId" className="text-sm font-medium">
                      ID da Equipe *
                    </Label>
                    <Input
                      id="teamId"
                      type="text"
                      placeholder="Ex: unimed236"
                      value={loginData.teamId}
                      onChange={(e) => setLoginData(prev => ({ ...prev, teamId: e.target.value }))}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Senha da Equipe *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite a senha da equipe"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoggingIn}
                    className="w-full gradient-primary text-primary-foreground shadow-button hover:shadow-elegant transition-bounce hover:scale-[1.02]"
                  >
                    {isLoggingIn ? "Validando..." : "Entrar na minha equipe"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6 mt-6">
                <div className="flex items-center space-x-3 p-4 bg-accent/50 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Solicitar Cadastro</p>
                    <p className="text-sm text-muted-foreground">
                      Cadastre sua equipe para ter um ambiente próprio da Themis™ (dados segregados por unidade)
                    </p>
                  </div>
                </div>

                <form onSubmit={handleRegistration} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution" className="text-sm font-medium">
                      Instituição/Empresa *
                    </Label>
                    <Input
                      id="institution"
                      type="text"
                      placeholder="Nome da instituição ou empresa"
                      value={registrationData.institution}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, institution: e.target.value }))}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj" className="text-sm font-medium">
                      CNPJ (opcional)
                    </Label>
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="00.000.000/0000-00"
                      value={registrationData.cnpj}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, cnpj: e.target.value }))}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="responsibleName" className="text-sm font-medium">
                        Nome do Responsável *
                      </Label>
                      <Input
                        id="responsibleName"
                        type="text"
                        placeholder="Nome completo"
                        value={registrationData.responsibleName}
                        onChange={(e) => setRegistrationData(prev => ({ ...prev, responsibleName: e.target.value }))}
                        className="transition-smooth focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-sm font-medium">
                        Cargo
                      </Label>
                      <Input
                        id="position"
                        type="text"
                        placeholder="Ex: Diretor Médico"
                        value={registrationData.position}
                        onChange={(e) => setRegistrationData(prev => ({ ...prev, position: e.target.value }))}
                        className="transition-smooth focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        E-mail Corporativo *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@empresa.com"
                        value={registrationData.email}
                        onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                        className="transition-smooth focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={registrationData.phone}
                        onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                        className="transition-smooth focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cityState" className="text-sm font-medium">
                        Cidade/UF
                      </Label>
                      <Input
                        id="cityState"
                        type="text"
                        placeholder="Ex: São Paulo/SP"
                        value={registrationData.cityState}
                        onChange={(e) => setRegistrationData(prev => ({ ...prev, cityState: e.target.value }))}
                        className="transition-smooth focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedCases" className="text-sm font-medium">
                        Volume estimado/mês (opcional)
                      </Label>
                      <Input
                        id="estimatedCases"
                        type="text"
                        placeholder="Ex: 10-20 casos"
                        value={registrationData.estimatedCases}
                        onChange={(e) => setRegistrationData(prev => ({ ...prev, estimatedCases: e.target.value }))}
                        className="transition-smooth focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                    <Checkbox
                      id="consent"
                      checked={registrationData.consent}
                      onCheckedChange={(checked) => setRegistrationData(prev => ({ ...prev, consent: checked as boolean }))}
                      className="mt-0.5"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="consent" className="text-sm font-medium text-foreground cursor-pointer">
                        Confirmação de contato *
                      </Label>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Autorizo o contato para formalização de termos de uso e configuração do ambiente da equipe.
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmittingRegistration}
                    className="w-full gradient-primary text-primary-foreground shadow-button hover:shadow-elegant transition-bounce hover:scale-[1.02]"
                  >
                    {isSubmittingRegistration ? "Enviando..." : "Solicitar cadastro da equipe"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Access;
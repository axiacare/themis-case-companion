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
import { useTeamAuth } from "@/contexts/TeamAuthContext"; // AJUSTAR: caminho do seu contexto

const Access = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useTeamAuth();
  
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
      const success = await login(loginData.teamId, loginData.password);
      
      if (success) {
        toast({
          title: "Acesso autorizado",
          description: `Bem-vindo à equipe ${loginData.teamId}!`,
        });
        // CONFIGURAR: Ajuste a rota de redirecionamento após login
        navigate("/central-equipe");
      } else {
        toast({
          title: "Acesso negado",
          description: "ID da equipe ou senha incorretos.",
          variant: "destructive"
        });
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
      // CONFIGURAR: Implementar registro via Supabase ou API
      toast({
        title: "Funcionalidade em desenvolvimento",
        description: "O registro de novas equipes será implementado em breve.",
      });
      
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="header-sticky bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
              {/* CONFIGURAR: Ajuste o logo e nome da sua solução */}
              <img 
                src="/logo-axia-principal.png"
                alt="Logo da Solução" 
                width="64"
                height="64"
                className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-primary">SUA SOLUÇÃO™</h1>
                <span className="text-xs md:text-sm text-primary font-medium hidden sm:block">
                  Descrição da sua solução
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Voltar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4">
            Acesso ao Ambiente
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Entre com sua equipe ou solicite acesso para começar
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
            <TabsTrigger value="login" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Entrar</span>
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Solicitar Acesso</span>
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Acesso da Equipe</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamId">ID da Equipe</Label>
                    <Input
                      id="teamId"
                      type="text"
                      placeholder="Digite o ID da sua equipe"
                      value={loginData.teamId}
                      onChange={(e) => setLoginData({ ...loginData, teamId: e.target.value })}
                      disabled={isLoggingIn}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite a senha da equipe"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      disabled={isLoggingIn}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Autenticando...</span>
                      </div>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Entrar no Ambiente
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registration Tab */}
          <TabsContent value="register">
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Building className="w-5 h-5 text-primary" />
                  <span>Solicitação de Acesso</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegistration} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution">Instituição *</Label>
                      <Input
                        id="institution"
                        type="text"
                        placeholder="Nome da instituição"
                        value={registrationData.institution}
                        onChange={(e) => setRegistrationData({ ...registrationData, institution: e.target.value })}
                        disabled={isSubmittingRegistration}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={registrationData.cnpj}
                        onChange={(e) => setRegistrationData({ ...registrationData, cnpj: e.target.value })}
                        disabled={isSubmittingRegistration}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsibleName">Responsável *</Label>
                      <Input
                        id="responsibleName"
                        type="text"
                        placeholder="Nome do responsável"
                        value={registrationData.responsibleName}
                        onChange={(e) => setRegistrationData({ ...registrationData, responsibleName: e.target.value })}
                        disabled={isSubmittingRegistration}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Cargo</Label>
                      <Input
                        id="position"
                        type="text"
                        placeholder="Cargo do responsável"
                        value={registrationData.position}
                        onChange={(e) => setRegistrationData({ ...registrationData, position: e.target.value })}
                        disabled={isSubmittingRegistration}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@instituicao.com"
                        value={registrationData.email}
                        onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                        disabled={isSubmittingRegistration}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={registrationData.phone}
                        onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                        disabled={isSubmittingRegistration}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={registrationData.consent}
                      onCheckedChange={(checked) => setRegistrationData({ ...registrationData, consent: checked as boolean })}
                      disabled={isSubmittingRegistration}
                    />
                    <Label htmlFor="consent" className="text-sm text-muted-foreground">
                      Autorizo o contato para formalização do acesso à plataforma *
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmittingRegistration || !registrationData.consent}
                  >
                    {isSubmittingRegistration ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      <>
                        <Building className="w-4 h-4 mr-2" />
                        Solicitar Acesso
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Access;
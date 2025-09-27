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
      // Para o registro, implementaremos posteriormente via Supabase
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
      {/* Header - AxControl™ Visual */}
      <header className="header-sticky bg-card border-b border-axcontrol-secondary-1/30">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-4 flex-1 min-w-0">
              <img 
                src="/logo-axia-principal.png"
                alt="AxiaCare Logo" 
                width="64"
                height="64"
                className="w-14 h-14 md:w-16 md:h-16 object-contain flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-axcontrol-dark">Themis™</h1>
                <span className="text-sm md:text-sm text-axcontrol-primary font-medium hidden sm:block">
                  Ambiente Inteligente de Necessidades Jurídicas na Saúde
                </span>
                <span className="text-sm text-axcontrol-primary font-medium sm:hidden">
                  Necessidades Jurídicas na Saúde
                </span>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="transition-smooth text-sm md:text-sm px-4 md:px-4 py-2 md:py-2">
                <ArrowLeft className="w-4 h-4 md:w-4 md:h-4 mr-2 md:mr-2" />
                <span className="hidden sm:inline">Voltar</span>
                <span className="sm:hidden">Voltar</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* LGPD Badge */}
      <div className="bg-axcontrol-secondary-2/20 border-b border-axcontrol-accent/20">
        <div className="container mx-auto px-4 py-1.5 md:py-2">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-axcontrol-dark">
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-axcontrol-accent" />
              <span className="font-medium text-center">Ambiente interno por equipe • LGPD</span>
            </div>
            <a 
              href="https://hub.guithome.com.br/axia/privacidade.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-axcontrol-accent/20 hover:bg-axcontrol-accent/30 px-2 md:px-3 py-1 rounded-full text-xs font-medium text-axcontrol-dark/90 hover:text-axcontrol-dark transition-smooth border border-axcontrol-accent/30 hover:border-axcontrol-accent/50 shadow-sm hover:shadow-md"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-2xl">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">Acesso ao Ambiente</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Entre com sua equipe cadastrada ou solicite o cadastro de uma nova equipe
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader className="pb-4 md:pb-6">
            <CardTitle className="text-primary text-center text-lg md:text-xl">Acesso por Equipe</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 text-xs md:text-sm">
                <TabsTrigger value="login">Sou equipe cadastrada</TabsTrigger>
                <TabsTrigger value="register">Solicitar cadastro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 md:space-y-6 mt-4 md:mt-6">
                <div className="flex items-center space-x-3 p-3 md:p-4 bg-primary/5 rounded-lg">
                  <Building className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-primary text-sm md:text-base">Equipe Cadastrada</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Acesse com o ID e senha da sua equipe
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="teamId" className="text-xs md:text-sm font-medium">
                      ID da Equipe *
                    </Label>
                    <Input
                      id="teamId"
                      type="text"
                      placeholder="Ex: unimed236"
                      value={loginData.teamId}
                      onChange={(e) => setLoginData(prev => ({ ...prev, teamId: e.target.value }))}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20 text-sm md:text-base"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="password" className="text-xs md:text-sm font-medium">
                      Senha da Equipe *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite a senha da equipe"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20 text-sm md:text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoggingIn}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-sm md:text-base py-3 md:py-4 border-0"
                  >
                    {isLoggingIn ? "Validando..." : "Acessar Central de Equipe"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 md:space-y-6 mt-4 md:mt-6">
                <div className="flex items-center space-x-3 p-3 md:p-4 bg-accent/50 rounded-lg">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-primary text-sm md:text-base">Solicitar Cadastro</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Cadastre sua equipe para ter um ambiente próprio da Themis™ (dados segregados por unidade)
                    </p>
                  </div>
                </div>

                <form onSubmit={handleRegistration} className="space-y-3 md:space-y-4">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="institution" className="text-xs md:text-sm font-medium">
                      Instituição/Empresa *
                    </Label>
                    <Input
                      id="institution"
                      type="text"
                      placeholder="Nome da instituição ou empresa"
                      value={registrationData.institution}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, institution: e.target.value }))}
                      className="transition-smooth focus:ring-2 focus:ring-primary/20 text-sm md:text-base"
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
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-sm md:text-base py-3 md:py-4 border-0"
                  >
                    {isSubmittingRegistration ? "Enviando..." : "Solicitar cadastro da equipe"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Footer - Padrão AxControl™ conforme referência */}
      <footer className="bg-white border-t border-axcontrol-secondary-1/30 py-6 md:py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-3 md:mb-4">
              <img 
                src="/logo-axia-principal.png"
                alt="AxiaCare" 
                width="32"
                height="32"
                loading="lazy"
                decoding="async"
                className="w-7 h-7 md:w-8 md:h-8 object-contain"
              />
              <span className="text-axcontrol-primary font-semibold text-sm md:text-base">AxiaCare</span>
            </div>
            
            <p className="text-axcontrol-dark/70 text-xs md:text-sm mb-3 md:mb-4">
              AxView™ | WebApps – Gestão e Consultoria em Saúde
            </p>
            
            {/* Desktop layout */}
            <div className="hidden md:flex items-center justify-center space-x-6 text-sm text-axcontrol-muted">
              <a href="https://axcare.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-axcontrol-primary transition-smooth">
                axcare.com.br
              </a>
              <span>|</span>
              <span>Copyright © 2025 AxiaCare | Todos os direitos reservados</span>
              <span>|</span>
              <span>Uma empresa do Grupo CSV</span>
            </div>
            
            {/* Mobile layout */}
            <div className="md:hidden text-xs text-axcontrol-muted leading-relaxed">
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

export default Access;
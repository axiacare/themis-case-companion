import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, ArrowLeft, Settings as SettingsIcon, Save, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWebhookSettings, WebhookSettings } from "@/hooks/useWebhookSettings";

const Settings = () => {
  const { toast } = useToast();
  const { settings, updateSettings } = useWebhookSettings();
  const [formData, setFormData] = useState<WebhookSettings>(settings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  useEffect(() => {
    const isChanged = 
      formData.authWebhookUrl !== settings.authWebhookUrl ||
      formData.teamWebhookUrl !== settings.teamWebhookUrl ||
      formData.caseWebhookUrl !== settings.caseWebhookUrl;
    setHasChanges(isChanged);
  }, [formData, settings]);

  const handleInputChange = (field: keyof WebhookSettings, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateUrl = (url: string): boolean => {
    if (!url) return true; // Allow empty URLs
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = () => {
    // Validate URLs
    if (!validateUrl(formData.authWebhookUrl)) {
      toast({
        title: "URL inválida",
        description: "URL de autenticação de equipe inválida.",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(formData.teamWebhookUrl)) {
      toast({
        title: "URL inválida", 
        description: "URL de cadastro de equipe inválida.",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(formData.caseWebhookUrl)) {
      toast({
        title: "URL inválida",
        description: "URL de envio de casos inválida.", 
        variant: "destructive"
      });
      return;
    }

    updateSettings(formData);
    setHasChanges(false);
    
    toast({
      title: "Configurações salvas",
      description: "URLs dos webhooks Make.com atualizadas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">
                Themis™
              </h1>
            </Link>
            <Link to="/">
              <Button variant="outline" className="transition-smooth">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <SettingsIcon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Configurações do Sistema</h2>
          <p className="text-lg text-muted-foreground">
            Configuração de URLs dos webhooks Make.com para integração
          </p>
        </div>

        {/* Admin Notice */}
        <Card className="shadow-card mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-primary">Acesso Administrativo</p>
                <p className="text-sm text-muted-foreground">
                  Esta página é destinada apenas para administradores GT Corporation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-primary">URLs dos Webhooks Make.com</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Auth Webhook */}
            <div className="space-y-2">
              <Label htmlFor="authWebhook" className="text-sm font-medium text-foreground">
                MAKE_AUTH_WEBHOOK_URL
              </Label>
              <Input
                id="authWebhook"
                type="url"
                placeholder="https://hook.eu2.make.com/xxxxx (Autenticar equipe)"
                value={formData.authWebhookUrl}
                onChange={(e) => handleInputChange('authWebhookUrl', e.target.value)}
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Webhook para autenticação de equipes. Recebe {JSON.stringify({team_id: "...", team_password: "..."})} e retorna {JSON.stringify({ok: true, team_name: "..."})}
              </p>
            </div>

            {/* Team Registration Webhook */}
            <div className="space-y-2">
              <Label htmlFor="teamWebhook" className="text-sm font-medium text-foreground">
                MAKE_TEAM_WEBHOOK_URL
              </Label>
              <Input
                id="teamWebhook"
                type="url"
                placeholder="https://hook.eu2.make.com/xxxxx (Cadastrar equipe)"
                value={formData.teamWebhookUrl}
                onChange={(e) => handleInputChange('teamWebhookUrl', e.target.value)}
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Webhook para solicitações de cadastro de novas equipes. Recebe todos os dados do formulário de cadastro.
              </p>
            </div>

            {/* Case Submission Webhook */}
            <div className="space-y-2">
              <Label htmlFor="caseWebhook" className="text-sm font-medium text-foreground">
                MAKE_CASE_WEBHOOK_URL
              </Label>
              <Input
                id="caseWebhook"
                type="url"
                placeholder="https://hook.eu2.make.com/xxxxx (Enviar casos)"
                value={formData.caseWebhookUrl}
                onChange={(e) => handleInputChange('caseWebhookUrl', e.target.value)}
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Webhook para envio de casos. Recebe payload completo com dados da equipe, protocolo, arquivos e informações do caso.
              </p>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {hasChanges ? "Há alterações não salvas" : "Todas as alterações foram salvas"}
              </p>
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="gradient-primary text-primary-foreground shadow-button hover:shadow-elegant transition-bounce hover:scale-[1.02]"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Integration Info */}
        <Card className="shadow-card mt-6">
          <CardHeader>
            <CardTitle className="text-primary">Informações de Integração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <h5 className="font-semibold text-primary mb-2">Autenticação</h5>
                <p className="text-xs text-muted-foreground">
                  Validação de credenciais de equipe via webhook
                </p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <h5 className="font-semibold text-primary mb-2">Cadastro</h5>
                <p className="text-xs text-muted-foreground">
                  Processamento de solicitações de nova equipe
                </p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <h5 className="font-semibold text-primary mb-2">Casos</h5>
                <p className="text-xs text-muted-foreground">
                  Envio e processamento de casos médico-legais
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
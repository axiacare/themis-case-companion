import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Scale, ArrowLeft, Upload, X, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTeamAuth } from "@/contexts/TeamAuthContext";
import { useWebhookSettings } from "@/hooks/useWebhookSettings";
import { genCaseProtocol, genTeamRecord } from "@/lib/ids";
import ProtectedRoute from "@/components/ProtectedRoute";

const SubmitCase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { teamData } = useTeamAuth();
  const { settings } = useWebhookSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    requesterName: "",
    requesterEmail: "",
    stage: "",
    description: "",
    consent: false
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Validate file types - only PDF
    const invalidFiles = selectedFiles.filter(file => file.type !== "application/pdf");
    if (invalidFiles.length > 0) {
      toast({
        title: "Arquivos inválidos",
        description: "Apenas arquivos PDF são aceitos.",
        variant: "destructive"
      });
      return;
    }

    // Validate file sizes (10MB each)
    const oversizedFiles = selectedFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "Arquivos muito grandes",
        description: "Cada arquivo deve ter no máximo 10MB.",
        variant: "destructive"
      });
      return;
    }

    // Validate total number of files
    const totalFiles = files.length + selectedFiles.length;
    if (totalFiles > 5) {
      toast({
        title: "Muitos arquivos",
        description: "Máximo de 5 arquivos permitidos.",
        variant: "destructive"
      });
      return;
    }

    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    const { requesterName, requesterEmail, stage, description, consent } = formData;
    
    if (!requesterName.trim() || requesterName.length < 3 || requesterName.length > 80) {
      toast({ title: "Nome inválido", description: "Nome deve ter entre 3 e 80 caracteres.", variant: "destructive" });
      return false;
    }

    if (!requesterEmail.trim() || !/\S+@\S+\.\S+/.test(requesterEmail)) {
      toast({ title: "Email inválido", description: "Por favor, informe um email válido.", variant: "destructive" });
      return false;
    }

    if (!stage) {
      toast({ title: "Estágio obrigatório", description: "Por favor, selecione o estágio do processo.", variant: "destructive" });
      return false;
    }

    if (!description.trim() || description.length < 200 || description.length > 1500) {
      toast({ title: "Descrição inválida", description: "A descrição deve ter entre 200 e 1500 caracteres.", variant: "destructive" });
      return false;
    }

    if (files.length === 0) {
      toast({ title: "Documentos obrigatórios", description: "Por favor, anexe pelo menos um documento PDF.", variant: "destructive" });
      return false;
    }

    if (!consent) {
      toast({ title: "Consentimento obrigatório", description: "Por favor, aceite os termos de consentimento.", variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (!settings.caseWebhookUrl) {
      toast({
        title: "Sistema não configurado",
        description: "URL do webhook de casos não foi configurada.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const caseProtocol = genCaseProtocol();
      const teamRecord = genTeamRecord(teamData?.team_id || '');
      
      // Create file URLs (in a real implementation, these would be signed URLs)
      const fileData = files.map(file => ({
        fileName: file.name,
        fileUrl: `https://temp-storage.example.com/${Date.now()}-${file.name}` // Mock URL
      }));

      const payload = {
        team_id: teamData?.team_id,
        team_name: teamData?.team_name,
        case_protocol: caseProtocol,
        team_record: teamRecord,
        requester_name: formData.requesterName,
        requester_email: formData.requesterEmail,
        stage: formData.stage,
        description: formData.description,
        files: fileData,
        lgpd_consent: true
      };

      const response = await fetch(settings.caseWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate('/confirmacao', { 
          state: { 
            protocolNumber: caseProtocol,
            teamRecord,
            email: formData.requesterEmail,
            teamId: teamData?.team_id
          } 
        });
      } else {
        throw new Error('Failed to submit case');
      }

    } catch (error) {
      toast({
        title: "Erro no envio",
        description: "Não foi possível enviar agora. Tente novamente ou contate o suporte da sua equipe.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-secondary">
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

        {/* Team Badge */}
        {teamData && (
          <div className="bg-accent/20 border-b">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-center">
                <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2">
                  <span className="text-sm font-medium text-primary">
                    Equipe: {teamData.team_id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Enviar Caso</h2>
            <p className="text-lg text-muted-foreground">
              Preencha as informações do seu caso para análise jurídico-médica
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-primary">Informações do Caso</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome do Solicitante */}
                <div className="space-y-2">
                  <Label htmlFor="requesterName" className="text-sm font-medium text-foreground">
                    Nome do Solicitante *
                  </Label>
                  <Input
                    id="requesterName"
                    type="text"
                    placeholder="Digite o nome completo do solicitante"
                    value={formData.requesterName}
                    onChange={(e) => setFormData(prev => ({ ...prev, requesterName: e.target.value }))}
                    className="transition-smooth focus:ring-2 focus:ring-primary/20"
                    required
                    minLength={3}
                    maxLength={80}
                  />
                </div>

                {/* Email do Solicitante */}
                <div className="space-y-2">
                  <Label htmlFor="requesterEmail" className="text-sm font-medium text-foreground">
                    Email do Solicitante *
                  </Label>
                  <Input
                    id="requesterEmail"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.requesterEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, requesterEmail: e.target.value }))}
                    className="transition-smooth focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                {/* Estágio do Processo */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Estágio do Processo *
                  </Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                    <SelectTrigger className="transition-smooth focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Selecione o estágio atual" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inicial">Inicial</SelectItem>
                      <SelectItem value="contestacao">Contestação</SelectItem>
                      <SelectItem value="laudo">Laudo</SelectItem>
                      <SelectItem value="parecer">Parecer</SelectItem>
                      <SelectItem value="recurso">Recurso</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Descrição do Caso */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-foreground">
                    Descrição Breve do Caso * ({formData.description.length}/1500)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Explique o que aconteceu, o que precisa e as principais datas. Descreva detalhadamente o caso médico-legal..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[150px] transition-smooth focus:ring-2 focus:ring-primary/20"
                    maxLength={1500}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo 200 caracteres, máximo 1500 caracteres
                  </p>
                </div>

                {/* Upload de Arquivos */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Upload de PDF(s) * (1-5 arquivos, máx. 10MB cada)
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center transition-smooth hover:border-primary/50">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Aceitar somente PDFs • Processo integral com muitas páginas
                      </p>
                      <Input
                        type="file"
                        accept="application/pdf"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label
                        htmlFor="file-upload"
                        className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
                      >
                        Selecionar Arquivos PDF
                      </Label>
                    </div>
                  </div>

                  {/* Lista de Arquivos */}
                  {files.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <p className="text-sm font-medium text-foreground">Arquivos selecionados:</p>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Consentimento */}
                <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg border">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="consent" className="text-sm font-medium text-foreground cursor-pointer">
                      Consentimento para Análise *
                    </Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Autorizo o uso dos dados e arquivos enviados exclusivamente para análise do meu caso e geração do Relatório Themis™. 
                      Estou ciente de que este serviço não substitui avaliação médica ou jurídica.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gradient-primary text-primary-foreground shadow-button hover:shadow-elegant transition-bounce hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {isSubmitting ? "Enviando para análise..." : "Enviar para análise"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SubmitCase;
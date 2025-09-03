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

  const generateProtocol = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `THE-${year}${month}${day}-${random}`;
  };

  const generateTeamRecord = () => {
    if (!teamData) return '';
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${teamData.team_id}-${year}-${random}`;
  };

  // ... keep existing code (file handling functions, validation, etc.)

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
      const caseProtocol = generateProtocol();
      const teamRecord = generateTeamRecord();
      
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
        <header className="border-b bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-primary">Themis™</h1>
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

        {/* LGPD Badge */}
        <div className="bg-primary/10 border-b border-primary/20">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-primary">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Ambiente interno por equipe • LGPD</span>
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
                      Autorizo o uso dos dados e arquivos enviados exclusivamente para análise do meu caso e geração do Relatório Themis. 
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

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Themis</h1>
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
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="requesterName" className="text-sm font-medium text-foreground">
                  Nome Completo *
                </Label>
                <Input
                  id="requesterName"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.requesterName}
                  onChange={(e) => setFormData(prev => ({ ...prev, requesterName: e.target.value }))}
                  className="transition-smooth focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="requesterEmail" className="text-sm font-medium text-foreground">
                  Email *
                </Label>
                <Input
                  id="requesterEmail"
                  type="email"
                  placeholder="seu@email.com"
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
                  Descrição do Caso * ({formData.description.length}/1500)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente o caso médico-legal, incluindo circunstâncias, questões médicas envolvidas e objetivos da análise..."
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
                  Documentos PDF * (1-5 arquivos, máx. 10MB cada)
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center transition-smooth hover:border-primary/50">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Clique para selecionar ou arraste arquivos PDF aqui
                    </p>
                    <Input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
                    >
                      Selecionar Arquivos
                    </Label>
                  </div>
                </div>

                {/* Lista de Arquivos */}
                {files.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium text-foreground">Arquivos selecionados:</p>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
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
              <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
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
                    Autorizo a Themis a analisar os documentos fornecidos para fins de parecer jurídico-médico. 
                    Confirmo que todos os dados pessoais foram devidamente anonimizados e que possuo autorização 
                    para compartilhar as informações médicas contidas nos documentos.
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
                {isSubmitting ? "Enviando..." : "Enviar Caso para Análise"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitCase;
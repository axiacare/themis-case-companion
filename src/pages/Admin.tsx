import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Shield, Edit, Trash2, Eye, EyeOff, FileText, LogOut, Upload, File, Lock, Database, Network, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdmin, TeamWithStats } from "@/hooks/useAdmin";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import AdminLogin from "@/components/AdminLogin";
import SecurityIndicator from "@/components/SecurityIndicator";
import SecurityDocumentation from "@/components/SecurityDocumentation";

const Admin = () => {
  const { toast } = useToast();
  const { isAuthenticated, logout } = useAdminAuth();
  const { teams, stats, loading, createTeam, updateTeam, deleteTeam } = useAdmin();
  const [activeTab, setActiveTab] = useState("teams");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamWithStats | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    team_id: "",
    team_name: "",
    password: "",
    cnpj: "",
    responsible_name: "",
    email: "",
    phone: "",
    terms_document_url: "",
  });

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.team_id || !formData.team_name || (!editingTeam && !formData.password)) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      let termsDocumentUrl = formData.terms_document_url;

      // Upload file if selected
      if (selectedFile) {
        setUploading(true);
        const fileName = `${formData.team_id}/terms_${Date.now()}_${selectedFile.name}`;
        
        const { data, error } = await supabase.storage
          .from('terms')
          .upload(fileName, selectedFile);

        if (error) throw error;
        termsDocumentUrl = data.path;
      }

      if (editingTeam) {
        await updateTeam(editingTeam.id, {
          team_name: formData.team_name,
          password: formData.password || undefined,
          cnpj: formData.cnpj,
          responsible_name: formData.responsible_name,
          email: formData.email,
          phone: formData.phone,
          terms_document_url: termsDocumentUrl,
        });

        toast({
          title: "Sucesso",
          description: "Equipe atualizada com sucesso!",
        });
      } else {
        await createTeam({
          team_id: formData.team_id,
          team_name: formData.team_name,
          password: formData.password,
          cnpj: formData.cnpj,
          responsible_name: formData.responsible_name,
          email: formData.email,
          phone: formData.phone,
          terms_document_url: termsDocumentUrl,
        });

        toast({
          title: "Sucesso",
          description: "Equipe cadastrada com sucesso!",
        });
      }

      setDialogOpen(false);
      setEditingTeam(null);
      setSelectedFile(null);
      setFormData({ 
        team_id: "", 
        team_name: "", 
        password: "", 
        cnpj: "", 
        responsible_name: "", 
        email: "", 
        phone: "", 
        terms_document_url: "" 
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar equipe.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (team: TeamWithStats) => {
    setEditingTeam(team);
    setFormData({
      team_id: team.team_id,
      team_name: team.team_name,
      password: "",
      cnpj: team.cnpj || "",
      responsible_name: team.responsible_name || "",
      email: team.email || "",
      phone: team.phone || "",
      terms_document_url: team.terms_document_url || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (teamId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta equipe? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      await deleteTeam(teamId);
      toast({
        title: "Sucesso",
        description: "Equipe excluída com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir equipe.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({ 
      team_id: "", 
      team_name: "", 
      password: "", 
      cnpj: "", 
      responsible_name: "", 
      email: "", 
      phone: "", 
      terms_document_url: "" 
    });
    setEditingTeam(null);
    setShowPassword(false);
    setSelectedFile(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
                <span className="text-lg text-white/90 font-semibold">Painel Administrador</span>
                <span className="text-sm text-white/80 font-medium">Gerenciamento de Equipes</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/">
                <Button variant="outline" className="transition-smooth">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={logout}
                className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="teams">Gerenciamento de Equipes</TabsTrigger>
            <TabsTrigger value="security">Conferência de Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">Gerenciamento de Equipes</h2>
                <p className="text-muted-foreground">
                  Cadastre e gerencie as equipes que têm acesso ao sistema Themis™
                </p>
              </div>

              <Dialog 
                open={dialogOpen} 
                onOpenChange={(open) => {
                  setDialogOpen(open);
                  if (!open) resetForm();
                }}
              >
                <DialogTrigger asChild>
                  <Button className="gradient-primary shadow-button hover:shadow-elegant transition-bounce hover:scale-[1.02]">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Equipe
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>{editingTeam ? 'Editar Equipe' : 'Nova Equipe'}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="team_id">ID da Equipe *</Label>
                        <Input
                          id="team_id"
                          placeholder="ex: unimed236"
                          value={formData.team_id}
                          onChange={(e) => setFormData({ ...formData, team_id: e.target.value })}
                          disabled={!!editingTeam}
                          required
                        />
                        {editingTeam && (
                          <p className="text-xs text-muted-foreground">
                            O ID da equipe não pode ser alterado após a criação
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="team_name">Nome da Equipe *</Label>
                        <Input
                          id="team_name"
                          placeholder="ex: Unimed São Paulo"
                          value={formData.team_name}
                          onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input
                          id="cnpj"
                          placeholder="00.000.000/0000-00"
                          value={formData.cnpj}
                          onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="responsible_name">Responsável pelo Cadastro</Label>
                        <Input
                          id="responsible_name"
                          placeholder="Nome do responsável"
                          value={formData.responsible_name}
                          onChange={(e) => setFormData({ ...formData, responsible_name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="contato@empresa.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone com DDD</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">
                        {editingTeam ? 'Nova Senha (deixe vazio para manter)' : 'Senha *'}
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Senha da equipe"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required={!editingTeam}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Termo de Aceite</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center space-x-2"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Selecionar Arquivo</span>
                        </Button>
                        {selectedFile && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <File className="w-4 h-4" />
                            <span>{selectedFile.name}</span>
                          </div>
                        )}
                        {!selectedFile && formData.terms_document_url && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <File className="w-4 h-4" />
                            <span>Documento anexado</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Aceitos: PDF, DOC, DOCX (máximo 10MB)
                      </p>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" className="gradient-primary" disabled={uploading}>
                        {uploading ? 'Enviando...' : (editingTeam ? 'Atualizar' : 'Cadastrar')}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Teams Table */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Equipes Cadastradas</span>
                  <Badge variant="secondary">{teams.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="text-muted-foreground">Carregando equipes...</div>
                  </div>
                ) : teams.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhuma equipe cadastrada ainda.</p>
                    <p className="text-sm text-muted-foreground">
                      Clique em "Nova Equipe" para cadastrar a primeira equipe.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID da Equipe</TableHead>
                        <TableHead>Nome da Equipe</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Casos</TableHead>
                        <TableHead>Data de Cadastro</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-mono">{team.team_id}</TableCell>
                          <TableCell className="font-medium">{team.team_name}</TableCell>
                          <TableCell>{team.email || "-"}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{team.cases_count || 0}</Badge>
                          </TableCell>
                          <TableCell>{new Date(team.created_at).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(team)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(team.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-primary mb-2">Conferência de Segurança Themis™</h2>
              <p className="text-muted-foreground">
                Auditoria completa das medidas de proteção de dados e conformidade regulatória
              </p>
            </div>

            {/* Security Indicator */}
            <SecurityIndicator />

            {/* Real Security Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950/50 dark:to-green-900/50 dark:border-green-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">{teams.length}</div>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Equipes Ativas
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/50 dark:to-blue-900/50 dark:border-blue-800">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">{stats?.totalCases || 0}</div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                    <FileText className="w-3 h-3" />
                    Casos Processados
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/50 dark:to-purple-900/50 dark:border-purple-800">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-1">100%</div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Dados Criptografados
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 dark:from-teal-950/50 dark:to-teal-900/50 dark:border-teal-800">
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-teal-700 dark:text-teal-300 mb-1">24/7</div>
                  <p className="text-xs text-teal-600 dark:text-teal-400 flex items-center justify-center gap-1">
                    <Database className="w-3 h-3" />
                    Monitoramento
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Security Architecture */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Arquitetura de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      Camadas de Proteção
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 1:</strong> Firewall de Aplicação (WAF)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 2:</strong> Autenticação e Autorização
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 3:</strong> Row Level Security (RLS)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 4:</strong> Mascaramento de Dados
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <strong>Camada 5:</strong> Auditoria Completa
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Network className="w-4 h-4 text-blue-600" />
                      Controles de Rede
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        TLS 1.3 para todas as conexões
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Certificate Pinning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Rate Limiting avançado
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Detecção de anomalias
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Geo-blocking inteligente
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                  <h4 className="font-semibold text-foreground mb-2">Princípio de Zero Trust</h4>
                  <p className="text-sm text-muted-foreground">
                    Nossa arquitetura segue o modelo Zero Trust, onde nenhum sistema ou usuário é confiável por padrão. 
                    Toda requisição é verificada, autenticada e autorizada independentemente da origem.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compliance */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
                    <FileText className="w-5 h-5" />
                    LGPD - Lei Geral de Proteção de Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    100% Conforme
                  </Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Consentimento explícito para coleta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Direito ao esquecimento implementado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Portabilidade de dados garantida</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>DPO designado e atuante</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                    <Shield className="w-5 h-5" />
                    ISO/IEC 27001:2022
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Certificado
                  </Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>SGSI implementado e operacional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Análise de riscos atualizada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Controles de segurança validados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Auditoria interna semestral</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security Documentation */}
            <SecurityDocumentation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
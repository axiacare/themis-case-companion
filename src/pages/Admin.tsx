import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Shield, Edit, Trash2, Eye, EyeOff, FileText, LogOut, Upload, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdmin, TeamWithStats } from "@/hooks/useAdmin";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import AdminLogin from "@/components/AdminLogin";

const Admin = () => {
  const { toast } = useToast();
  const { isAuthenticated, logout } = useAdminAuth();
  const { teams, stats, loading, createTeam, updateTeam, deleteTeam } = useAdmin();
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
                src="/logo-axia-principal-optimized.png"
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

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{stats.totalTeams}</div>
              <p className="text-sm text-muted-foreground">Equipes Ativas</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {stats.newThisMonth}
              </div>
              <p className="text-sm text-muted-foreground">Novas Este Mês</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{stats.totalCases}</div>
              <p className="text-sm text-muted-foreground">Total de Casos</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, FileCheck, AlertTriangle, CheckCircle } from "lucide-react";

const SecurityDocumentation = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Proteção de Dados Comerciais Implementada
        </h2>
        <p className="text-muted-foreground">
          Medidas avançadas de segurança para proteger informações sensíveis da sua empresa
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mascaramento de Dados */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Eye className="w-5 h-5" />
              Mascaramento Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
              <p className="text-sm text-green-700">
                Dados sensíveis são automaticamente mascarados quando acessados por outras equipes:
              </p>
              <ul className="text-xs space-y-1 text-green-600">
                <li>• <strong>Email:</strong> joao@empresa.com → j***@empresa.com</li>
                <li>• <strong>Telefone:</strong> (11) 99999-9999 → (11) ****-***9</li>
                <li>• <strong>CNPJ:</strong> 12.345.678/0001-90 → **.***.***/****-**</li>
                <li>• <strong>Nome:</strong> João Silva → J*** S***</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Auditoria Completa */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <FileCheck className="w-5 h-5" />
              Auditoria Completa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
              <p className="text-sm text-blue-700">
                Todo acesso aos dados é registrado automaticamente:
              </p>
              <ul className="text-xs space-y-1 text-blue-600">
                <li>• <strong>Logins:</strong> Sucessos e tentativas falhadas</li>
                <li>• <strong>Consultas:</strong> Quais dados foram acessados</li>
                <li>• <strong>Timestamp:</strong> Data e hora exata</li>
                <li>• <strong>Contexto:</strong> Qual equipe fez o acesso</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Proteção RLS */}
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Shield className="w-5 h-5" />
              Row Level Security (RLS)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
              <p className="text-sm text-purple-700">
                Isolamento completo de dados por equipe:
              </p>
              <ul className="text-xs space-y-1 text-purple-600">
                <li>• Cada equipe vê apenas seus próprios dados</li>
                <li>• Impossível acessar dados de outras equipes</li>
                <li>• Verificação em nível de banco de dados</li>
                <li>• Zero exposição de informações cruzadas</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Criptografia */}
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Lock className="w-5 h-5" />
              Proteção de Senhas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
              <p className="text-sm text-orange-700">
                Senhas totalmente protegidas e inacessíveis:
              </p>
              <ul className="text-xs space-y-1 text-orange-600">
                <li>• Hash SHA-256 para todas as senhas</li>
                <li>• Nunca expostas via API pública</li>
                <li>• Verificação apenas em funções seguras</li>
                <li>• Impossible recuperar senha original</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo de Conformidade */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Shield className="w-6 h-6" />
            Conformidade e Certificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-1">LGPD</div>
              <p className="text-xs text-green-700">Lei Geral de Proteção de Dados</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">ISO 27001</div>
              <p className="text-xs text-blue-700">Gestão de Segurança da Informação</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-1">ISO 27701</div>
              <p className="text-xs text-purple-700">Gestão de Privacidade</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600 mb-1">Audit</div>
              <p className="text-xs text-orange-700">Logs Completos</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-green-500">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">
                  ✅ Vulnerabilidade de Exposição de Dados Comerciais Corrigida
                </p>
                <p className="text-xs text-green-700">
                  Todas as informações comerciais sensíveis agora estão protegidas por múltiplas camadas de segurança, 
                  incluindo mascaramento automático, auditoria completa e isolamento por RLS.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDocumentation;
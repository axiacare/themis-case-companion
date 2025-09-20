import { Shield, Eye, Lock, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SecurityIndicator = () => {
  return (
    <Card className="bg-green-50/80 border-green-200/50 shadow-sm">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Dados Protegidos
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
              <Lock className="w-3 h-3 mr-1" />
              Criptografado
            </Badge>
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
              <Eye className="w-3 h-3 mr-1" />
              Mascarado
            </Badge>
            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
              <FileCheck className="w-3 h-3 mr-1" />
              Auditado
            </Badge>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-xs text-green-700">
            ✓ Informações pessoais mascaradas • ✓ Acessos auditados • ✓ Zero exposição de senhas
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityIndicator;
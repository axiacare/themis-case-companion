import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTeamAuth } from "@/contexts/TeamAuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useTeamAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Acesso restrito",
        description: "Você precisa estar logado com sua equipe para acessar esta página.",
        variant: "destructive"
      });
      navigate("/acesso");
    }
  }, [isAuthenticated, navigate, toast]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
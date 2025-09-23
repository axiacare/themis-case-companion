import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

interface StandardHeaderProps {
  logoSrc?: string;
  solutionName?: string;
  solutionDescription?: string;
  companyLogoSrc?: string;
  showAdminButton?: boolean;
  showAccessButton?: boolean;
  adminRoute?: string;
  accessRoute?: string;
}

const StandardHeader = ({
  logoSrc = "/logo-axia-principal.png",
  solutionName = "SUA SOLUÇÃO™",
  solutionDescription = "Descrição da sua solução",
  companyLogoSrc = "/axiacare-logo-oficial.png",
  showAdminButton = true,
  showAccessButton = true,
  adminRoute = "/admin",
  accessRoute = "/acesso"
}: StandardHeaderProps) => {
  return (
    <header className="header-sticky bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
            <img 
              src={logoSrc}
              alt="Logo da Solução" 
              width="64"
              height="64"
              className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-primary">{solutionName}</h1>
              <span className="text-xs md:text-sm text-primary font-medium hidden sm:block">
                {solutionDescription}
              </span>
              <span className="text-xs text-primary font-medium sm:hidden">
                {solutionDescription.length > 30 ? solutionDescription.substring(0, 30) + '...' : solutionDescription}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            <div className="hidden md:block">
              <img 
                src={companyLogoSrc}
                alt="Logo da Empresa" 
                width="103"
                height="32"
                className="h-8 object-contain"
              />
            </div>
            <div className="flex items-center space-x-2">
              {showAdminButton && (
                <Link to={adminRoute}>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary hover:bg-primary hover:text-white transition-smooth px-2 md:px-3"
                  >
                    <Shield className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden md:inline ml-1">Admin</span>
                  </Button>
                </Link>
              )}
              {showAccessButton && (
                <Link to={accessRoute}>
                  <Button 
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white shadow-button px-3 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-medium whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">Entrar no ambiente</span>
                    <span className="sm:hidden">Entrar</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StandardHeader;
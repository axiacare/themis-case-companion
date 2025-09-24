import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SecurityAlertProps {
  message: string;
  severity?: 'low' | 'medium' | 'high';
}

export const SecurityAlert: React.FC<SecurityAlertProps> = ({ 
  message, 
  severity = 'medium' 
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-500 bg-blue-50 text-blue-800';
    }
  };

  return (
    <Alert className={`${getSeverityColor()} mb-4`}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Security Notice</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
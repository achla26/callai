import { AlertCircle, CheckCircle } from "lucide-react";

export interface FormMessageProps {
    message?: string;
    className?: string;
    iconClassName?: string;
  }
  const FormError = ({ 
    message, 
    className = "",
    iconClassName = ""
  }: FormMessageProps) => {
    if (!message) return null;
  
    return (
      <div 
        className={`flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive ${className}`}
        data-state="error"
      >
        <AlertCircle className={`h-4 w-4 ${iconClassName}`} />
        <p>{message}</p>
      </div>
    );
  };
  const FormSuccess = ({ 
    message, 
    className = "",
    iconClassName = ""
  }: FormMessageProps) => {
    if (!message) return null;
  
    return (
      <div 
        className={`flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500 ${className}`}
        data-state="success"
      >
        <CheckCircle className={`h-4 w-4 ${iconClassName}`} />
        <p>{message}</p>
      </div>
    );
  };


export { FormError, FormSuccess }
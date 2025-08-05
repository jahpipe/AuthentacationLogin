// components/ui/AlertMessage.tsx
import { useEffect } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export interface AlertMessageProps {
  type?: "success" | "error" | "info";
  message: string; // ✅ this is what you're passing
  onClose?: () => void;
  duration?: number;
}

const iconMap = {
  success: <CheckCircle2 className="text-green-500 w-5 h-5" />,
  error: <AlertCircle className="text-red-500 w-5 h-5" />,
  info: <Info className="text-blue-500 w-5 h-5" />,
};

export function AlertMessage({
  type = "info",
  message,
  onClose,
  duration = 5000,
}: AlertMessageProps) {
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  return (
    <div
      className={`flex items-center gap-2 p-4 rounded-md shadow-md text-white ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {iconMap[type]}
      <span>{message}</span>
    </div>
  );
}

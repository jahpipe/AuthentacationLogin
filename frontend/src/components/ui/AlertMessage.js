import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/ui/AlertMessage.tsx
import { useEffect } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
const iconMap = {
    success: _jsx(CheckCircle2, { className: "text-green-500 w-5 h-5" }),
    error: _jsx(AlertCircle, { className: "text-red-500 w-5 h-5" }),
    info: _jsx(Info, { className: "text-blue-500 w-5 h-5" }),
};
export function AlertMessage({ type = "info", message, onClose, duration = 5000, }) {
    useEffect(() => {
        if (onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [onClose, duration]);
    return (_jsxs("div", { className: `flex items-center gap-2 p-4 rounded-md shadow-md text-white ${type === "success"
            ? "bg-green-500"
            : type === "error"
                ? "bg-red-500"
                : "bg-blue-500"}`, children: [iconMap[type], _jsx("span", { children: message })] }));
}

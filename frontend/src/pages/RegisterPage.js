import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { User, ShieldCheck, Mail, Lock } from "lucide-react";
import { AlertMessage } from "@/components/ui/AlertMessage";
import axios from "axios";
export function RegisterPage() {
    const [form, setForm] = useState({ username: "", password: "", role: "user" });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleRoleSelect = (role) => {
        setForm((prev) => ({ ...prev, role }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);
        try {
            await axios.post(`${API}/register`, form, { withCredentials: true });
            setAlert({ type: "success", message: "Registration successful! Redirecting to login..." });
            setTimeout(() => navigate("/login"), 1500);
        }
        catch (err) {
            const msg = err.response?.data?.message || "Registration failed.";
            setAlert({ type: "error", message: msg });
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-800 px-4", children: _jsx(Card, { className: "w-full max-w-md p-8 shadow-2xl rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("header", { className: "text-center", children: [_jsxs("h1", { className: "text-3xl font-extrabold text-gray-900 dark:text-white mb-1", children: ["Create an Account ", _jsx("span", { className: "inline-block animate-bounce", children: "\uD83D\uDCDD" })] }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 font-medium", children: "Select your role and sign up to get started" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(RoleOption, { label: "User", icon: _jsx(User, {}), active: form.role === "user", onClick: () => handleRoleSelect("user") }), _jsx(RoleOption, { label: "Admin", icon: _jsx(ShieldCheck, {}), active: form.role === "admin", onClick: () => handleRoleSelect("admin") })] }), _jsx(InputWithIcon, { icon: _jsx(Mail, { className: "text-gray-400" }), children: _jsx(Input, { label: "Username", name: "username", value: form.username, onChange: handleChange, required: true }) }), _jsx(InputWithIcon, { icon: _jsx(Lock, { className: "text-gray-400" }), children: _jsx(Input, { label: "Password", name: "password", type: "password", value: form.password, onChange: handleChange, required: true }) }), _jsx(Button, { type: "submit", className: "w-full", children: "Sign Up" }), alert && (_jsx(AlertMessage, { type: alert.type, message: alert.message, onClose: () => setAlert(null) }))] }) }) }));
}
function RoleOption({ label, icon, active, onClick }) {
    return (_jsxs("button", { type: "button", onClick: onClick, className: `flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition
        ${active
            ? "bg-indigo-600 text-white shadow-lg border border-indigo-700"
            : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900"}`, children: [icon, label] }));
}
function InputWithIcon({ children, icon }) {
    return (_jsxs("div", { className: "relative w-full", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: icon }), _jsx("div", { className: "pl-12 w-full", children: children })] }));
}

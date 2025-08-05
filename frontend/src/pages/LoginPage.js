import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { User, ShieldCheck, Mail, Lock, XCircle } from "lucide-react";
import { AlertMessage } from "@/components/ui/AlertMessage";
import axios from "axios";
import clsx from "clsx"; // Optional: install clsx for cleaner class management
export function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "", role: "user" });
    const [registerForm, setRegisterForm] = useState({ username: "", password: "", role: "user" });
    const [loginMessage, setLoginMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [registerMessage, setRegisterMessage] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleRoleSelect = (role) => {
        setForm((prev) => ({ ...prev, role }));
    };
    const handleRegisterRoleSelect = (role) => {
        setRegisterForm((prev) => ({ ...prev, role }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/login`, form, { withCredentials: true });
            const { accessToken, account } = response.data;
            if (!accessToken || !account)
                throw new Error("Invalid login response");
            localStorage.setItem("token", accessToken);
            localStorage.setItem("role", account.role);
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            setLoginMessage("Login successful! Redirecting...");
            setErrorMessage(null);
            setTimeout(() => {
                navigate(account.role === "admin" ? "/AdminDashboard" : "/DashboardUsers");
            }, 1000);
        }
        catch (err) {
            const msg = err.response?.data?.message || "Something went wrong.";
            setLoginMessage(null);
            setErrorMessage(msg);
        }
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/register`, registerForm, { withCredentials: true });
            setRegisterMessage("Registered successfully! Please login.");
            setRegisterError(null);
            setTimeout(() => {
                setShowRegister(false);
                setRegisterForm({ username: "", password: "", role: "user" });
                setRegisterMessage(null);
            }, 1500);
        }
        catch (err) {
            const msg = err.response?.data?.message || "Registration failed.";
            setRegisterError(msg);
            setRegisterMessage(null);
        }
    };
    return (_jsxs("div", { className: "relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-800 px-4", children: [_jsx(Card, { className: "w-full max-w-md p-8 shadow-2xl rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 z-10", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("header", { className: "text-center", children: [_jsxs("h1", { className: "text-3xl font-extrabold text-gray-900 dark:text-white mb-1", children: ["Welcome Back ", _jsx("span", { className: "inline-block animate-wave", children: "\uD83D\uDC4B" })] }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 font-medium", children: "Select your role and sign in to continue" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(RoleOption, { label: "User", icon: _jsx(User, {}), active: form.role === "user", onClick: () => handleRoleSelect("user") }), _jsx(RoleOption, { label: "Admin", icon: _jsx(ShieldCheck, {}), active: form.role === "admin", onClick: () => handleRoleSelect("admin") })] }), _jsx(InputWithIcon, { icon: _jsx(Mail, { className: "text-gray-400" }), children: _jsx(Input, { label: "Username", name: "username", value: form.username, onChange: handleLoginChange, required: true }) }), _jsx(InputWithIcon, { icon: _jsx(Lock, { className: "text-gray-400" }), children: _jsx(Input, { label: "Password", name: "password", type: "password", value: form.password, onChange: handleLoginChange, required: true }) }), _jsx(Button, { type: "submit", className: "w-full", children: "Sign In" }), loginMessage && (_jsx(AlertMessage, { type: "success", message: loginMessage, onClose: () => setLoginMessage(null) })), errorMessage && (_jsx(AlertMessage, { type: "error", message: errorMessage, onClose: () => setErrorMessage(null) })), _jsxs("p", { className: "text-sm text-center text-gray-500 dark:text-gray-400", children: ["Don\u2019t have an account?", " ", _jsx("button", { type: "button", className: "text-indigo-600 hover:underline font-semibold", onClick: () => setShowRegister(true), children: "Register" })] })] }) }), showRegister && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all", children: _jsxs("div", { className: "bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl border w-full max-w-md relative animate-fadeInUp", children: [_jsx("button", { onClick: () => setShowRegister(false), className: "absolute top-3 right-3 text-gray-500 hover:text-red-500 transition", "aria-label": "Close", children: _jsx(XCircle, { className: "w-6 h-6" }) }), _jsxs("form", { onSubmit: handleRegisterSubmit, className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-4 text-zinc-800 dark:text-white", children: "Register Account" }), _jsxs("div", { className: "flex gap-4", children: [_jsx(RoleOption, { label: "User", icon: _jsx(User, {}), active: registerForm.role === "user", onClick: () => handleRegisterRoleSelect("user") }), _jsx(RoleOption, { label: "Admin", icon: _jsx(ShieldCheck, {}), active: registerForm.role === "admin", onClick: () => handleRegisterRoleSelect("admin") })] }), _jsx(InputWithIcon, { icon: _jsx(Mail, { className: "text-gray-400" }), children: _jsx(Input, { label: "Username", name: "username", value: registerForm.username, onChange: handleRegisterChange, required: true }) }), _jsx(InputWithIcon, { icon: _jsx(Lock, { className: "text-gray-400" }), children: _jsx(Input, { label: "Password", name: "password", type: "password", value: registerForm.password, onChange: handleRegisterChange, required: true }) }), _jsx(Button, { type: "submit", className: "w-full", children: "Register" }), registerMessage && _jsx("p", { className: "text-green-600 text-center", children: registerMessage }), registerError && _jsx("p", { className: "text-red-600 text-center", children: registerError })] })] }) }))] }));
}
function RoleOption({ label, icon, active, onClick, }) {
    return (_jsxs("button", { type: "button", onClick: onClick, "aria-pressed": active, className: `flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold select-none transition
        ${active
            ? "bg-indigo-600 text-white shadow-lg border border-indigo-700"
            : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900"}`, children: [icon, label] }));
}
function InputWithIcon({ children, icon, }) {
    return (_jsxs("div", { className: "relative w-full", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: icon }), _jsx("div", { className: "pl-12 w-full", children: children })] }));
}

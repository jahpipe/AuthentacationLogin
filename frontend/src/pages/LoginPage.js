import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { User, ShieldCheck, Mail, Lock } from "lucide-react";
import axios from "axios";
export function LoginPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "user",
    });
    const [loginMessage, setLoginMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleRoleSelect = (role) => {
        setForm((prev) => ({ ...prev, role }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/login`, form);
            const { token, account } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", account.role);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setLoginMessage("Login successful! Redirecting...");
            setErrorMessage(null);
            setTimeout(() => {
                if (account.role === "admin") {
                    navigate("/AdminDashboard");
                }
                else {
                    navigate("/DashboardUsers");
                }
            }, 1000);
        }
        catch (err) {
            const msg = err.response?.data?.message || "Something went wrong.";
            setLoginMessage(null);
            setErrorMessage(msg);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-800 px-4", children: _jsx(Card, { className: "w-full max-w-md p-8 shadow-2xl rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("header", { className: "text-center", children: [_jsxs("h1", { className: "text-3xl font-extrabold text-gray-900 dark:text-white mb-1", children: ["Welcome Back ", _jsx("span", { className: "inline-block animate-wave", children: "\uD83D\uDC4B" })] }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 font-medium", children: "Select your role and sign in to continue" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(RoleOption, { label: "User", icon: _jsx(User, { className: "w-5 h-5" }), active: form.role === "user", onClick: () => handleRoleSelect("user") }), _jsx(RoleOption, { label: "Admin", icon: _jsx(ShieldCheck, { className: "w-5 h-5" }), active: form.role === "admin", onClick: () => handleRoleSelect("admin") })] }), _jsx(InputWithIcon, { icon: _jsx(Mail, { className: "w-5 h-5 text-gray-400" }), children: _jsx(Input, { label: "Username", name: "username", type: "text", value: form.username, onChange: handleChange, required: true, autoComplete: "username" }) }), _jsx(InputWithIcon, { icon: _jsx(Lock, { className: "w-5 h-5 text-gray-400" }), children: _jsx(Input, { label: "Password", name: "password", type: "password", value: form.password, onChange: handleChange, required: true, autoComplete: "current-password" }) }), _jsx(Button, { type: "submit", className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition", children: "Sign In" }), loginMessage && (_jsx("p", { className: "text-green-600 text-center font-medium mt-2", children: loginMessage })), errorMessage && (_jsx("p", { className: "text-red-600 text-center font-medium mt-2", children: errorMessage }))] }) }) }));
}
function RoleOption({ label, icon, active, onClick, }) {
    return (_jsxs("button", { type: "button", onClick: onClick, "aria-pressed": active, className: `flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold select-none transition-shadow
        ${active
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-300/30 border border-indigo-700"
            : "bg-gray-100 dark:bg-zinc-800 border border-transparent text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:border-indigo-400"}`, children: [icon, label] }));
}
function InputWithIcon({ children, icon, }) {
    return (_jsxs("div", { className: "relative w-full", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: icon }), _jsx("div", { className: "pl-12 w-full", children: children })] }));
}

import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { User, ShieldCheck, Mail, Lock } from "lucide-react";
import { AlertMessage } from "@/components/ui/AlertMessage";
import axios from "axios";

export function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: "admin" | "user") => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    try {
      await axios.post(`${API}/register`, form, { withCredentials: true });

      setAlert({ type: "success", message: "Registration successful! Redirecting to login..." });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Registration failed.";
      setAlert({ type: "error", message: msg });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-800 px-4">
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <form onSubmit={handleSubmit} className="space-y-8">
          <header className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              Create an Account <span className="inline-block animate-bounce">📝</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Select your role and sign up to get started
            </p>
          </header>

          <div className="flex gap-4">
            <RoleOption label="User" icon={<User />} active={form.role === "user"} onClick={() => handleRoleSelect("user")} />
            <RoleOption label="Admin" icon={<ShieldCheck />} active={form.role === "admin"} onClick={() => handleRoleSelect("admin")} />
          </div>

          <InputWithIcon icon={<Mail className="text-gray-400" />}>
            <Input label="Username" name="username" value={form.username} onChange={handleChange} required />
          </InputWithIcon>

          <InputWithIcon icon={<Lock className="text-gray-400" />}>
            <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </InputWithIcon>

          <Button type="submit" className="w-full">Sign Up</Button>

          {alert && (
            <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          )}
        </form>
      </Card>
    </div>
  );
}

function RoleOption({ label, icon, active, onClick }: { label: string; icon: ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition
        ${active
          ? "bg-indigo-600 text-white shadow-lg border border-indigo-700"
          : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900"}`}
    >
      {icon}
      {label}
    </button>
  );
}

function InputWithIcon({ children, icon }: { children: ReactNode; icon: ReactNode }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <div className="pl-12 w-full">{children}</div>
    </div>
  );
}

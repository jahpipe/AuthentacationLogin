import { useState, type ReactNode } from "react";
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

  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: "admin" | "user") => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleRegisterRoleSelect = (role: "admin" | "user") => {
    setRegisterForm((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/login`, form, { withCredentials: true });

      const { accessToken, account } = response.data;

      if (!accessToken || !account) throw new Error("Invalid login response");

      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", account.role);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      setLoginMessage("Login successful! Redirecting...");
      setErrorMessage(null);

      setTimeout(() => {
        navigate(account.role === "admin" ? "/AdminDashboard" : "/DashboardUsers");
      }, 1000);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong.";
      setLoginMessage(null);
      setErrorMessage(msg);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      const msg = err.response?.data?.message || "Registration failed.";
      setRegisterError(msg);
      setRegisterMessage(null);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-800 px-4">
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 z-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <header className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              Welcome Back <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Select your role and sign in to continue
            </p>
          </header>

          <div className="flex gap-4">
            <RoleOption label="User" icon={<User />} active={form.role === "user"} onClick={() => handleRoleSelect("user")} />
            <RoleOption label="Admin" icon={<ShieldCheck />} active={form.role === "admin"} onClick={() => handleRoleSelect("admin")} />
          </div>

          <InputWithIcon icon={<Mail className="text-gray-400" />}>
            <Input label="Username" name="username" value={form.username} onChange={handleLoginChange} required />
          </InputWithIcon>

          <InputWithIcon icon={<Lock className="text-gray-400" />}>
            <Input label="Password" name="password" type="password" value={form.password} onChange={handleLoginChange} required />
          </InputWithIcon>

          <Button type="submit" className="w-full">Sign In</Button>

          {loginMessage && (
  <AlertMessage type="success" message={loginMessage} onClose={() => setLoginMessage(null)} />
)}
{errorMessage && (
  <AlertMessage type="error" message={errorMessage} onClose={() => setErrorMessage(null)} />
)}


          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <button type="button" className="text-indigo-600 hover:underline font-semibold" onClick={() => setShowRegister(true)}>
              Register
            </button>
          </p>
        </form>
      </Card>

      {/* Floating Registration Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl border w-full max-w-md relative animate-fadeInUp">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              aria-label="Close"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-4 text-zinc-800 dark:text-white">Register Account</h2>

              <div className="flex gap-4">
                <RoleOption
                  label="User"
                  icon={<User />}
                  active={registerForm.role === "user"}
                  onClick={() => handleRegisterRoleSelect("user")}
                />
                <RoleOption
                  label="Admin"
                  icon={<ShieldCheck />}
                  active={registerForm.role === "admin"}
                  onClick={() => handleRegisterRoleSelect("admin")}
                />
              </div>

              <InputWithIcon icon={<Mail className="text-gray-400" />}>
                <Input
                  label="Username"
                  name="username"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  required
                />
              </InputWithIcon>

              <InputWithIcon icon={<Lock className="text-gray-400" />}>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                />
              </InputWithIcon>

              <Button type="submit" className="w-full">Register</Button>

              {registerMessage && <p className="text-green-600 text-center">{registerMessage}</p>}
              {registerError && <p className="text-red-600 text-center">{registerError}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleOption({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold select-none transition
        ${
          active
            ? "bg-indigo-600 text-white shadow-lg border border-indigo-700"
            : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function InputWithIcon({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <div className="pl-12 w-full">{children}</div>
    </div>
  );
}

import { useState, useEffect, type ReactNode } from "react";
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
    role: "user", // must match backend expected role
  });

  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: "admin" | "user") => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        } else {
          navigate("/DashboardUsers"); // Adjust if route is different
        }
      }, 1000);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong.";
      setLoginMessage(null);
      setErrorMessage(msg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const role = res.data?.role || localStorage.getItem("role");
        if (role === "admin") {
          navigate("/AdminDashboard");
        } else {
          navigate("/DashboardUsers");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-800 px-4">
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
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
            <RoleOption
              label="User"
              icon={<User className="w-5 h-5" />}
              active={form.role === "user"}
              onClick={() => handleRoleSelect("user")}
            />
            <RoleOption
              label="Admin"
              icon={<ShieldCheck className="w-5 h-5" />}
              active={form.role === "admin"}
              onClick={() => handleRoleSelect("admin")}
            />
          </div>

          <InputWithIcon icon={<Mail className="w-5 h-5 text-gray-400" />}>
            <Input
              label="Username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </InputWithIcon>

          <InputWithIcon icon={<Lock className="w-5 h-5 text-gray-400" />}>
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </InputWithIcon>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Sign In
          </Button>

          {loginMessage && (
            <p className="text-green-600 text-center font-medium mt-2">
              {loginMessage}
            </p>
          )}

          {errorMessage && (
            <p className="text-red-600 text-center font-medium mt-2">
              {errorMessage}
            </p>
          )}
        </form>
      </Card>
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
      className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold select-none transition-shadow
        ${
          active
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-300/30 border border-indigo-700"
            : "bg-gray-100 dark:bg-zinc-800 border border-transparent text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:border-indigo-400"
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

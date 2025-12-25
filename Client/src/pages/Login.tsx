import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input"; // <--- Using the Standard Component
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // SIMULATED LOGIN
    // Section 4.1: We use the defined roles (Patient/Doctor/Guardian) logic later
    // For now, default to Patient for the demo
    localStorage.setItem(
      "mindSyncUser",
      JSON.stringify({
        email,
        name: "Demo User",
        role: "Patient",
      })
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        {/* Header - Typography H1/Body (Section 4.2) */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-text-main">Welcome back</h1>
          <p className="text-text-muted mt-2">
            Enter your details to access your safe space.
          </p>
        </div>

        {/* Card - Elevated Background (Section 4.1) */}
        <Card className="bg-white shadow-xl border-0 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input - Using Iconography (Section 4.3) */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Email
              </label>
              <Input
                type="email"
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Password
              </label>
              <Input
                type="password"
                icon={<Lock size={18} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-text-muted">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full py-2.5 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-text-muted">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Create Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;

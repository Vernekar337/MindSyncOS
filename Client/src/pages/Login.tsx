import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext"; // <--- IMPORT HOOK
import { Button } from "../components/ui/Button"; // <--- USE NEW BUTTON
import { Input } from "../components/ui/Input";
import { Lock, Mail, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast(); // <--- ACTIVATE HOOK
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      // 1. Mock Validation Logic
      if (formData.email === "doctor@mindsync.com") {
        localStorage.setItem(
          "mindSyncUser",
          JSON.stringify({ name: "Dr. Sarah Mitchell", role: "Doctor" })
        );
        showToast("Welcome back, Dr. Mitchell!", "success"); // <--- SUCCESS TOAST
        navigate("/");
      } else if (formData.email === "guardian@mindsync.com") {
        localStorage.setItem(
          "mindSyncUser",
          JSON.stringify({ name: "Martha Kent", role: "Guardian" })
        );
        showToast("Welcome to Guardian View", "info"); // <--- INFO TOAST
        navigate("/");
      } else {
        // Default Patient
        localStorage.setItem(
          "mindSyncUser",
          JSON.stringify({ name: "Alex Johnson", role: "Patient" })
        );
        showToast("Successfully logged in!", "success"); // <--- SUCCESS TOAST
        navigate("/");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
            <span className="font-bold text-xl">M</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-8">
            Sign in to continue your mental health journey.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email"
              icon={Mail}
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-primary font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Use the new Loading Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={loading}
            >
              Sign In <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-bold hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

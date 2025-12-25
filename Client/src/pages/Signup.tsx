import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Patient",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      // Save user to local storage (Mock Backend)
      localStorage.setItem(
        "mindSyncUser",
        JSON.stringify({
          name: formData.name,
          role: formData.role,
        })
      );

      showToast("Account created successfully!", "success");
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-500">
        <div className="p-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/30">
            <span className="font-bold text-xl">M</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create an account
          </h1>
          <p className="text-gray-500 mb-8">
            Start your journey to better mental health.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* CORRECT USAGE: Pass the component name 'User' directly */}
            <Input
              label="Full Name"
              icon={User}
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            {/* CORRECT USAGE: Pass 'Mail' directly */}
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

            {/* CORRECT USAGE: Pass 'Lock' directly */}
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

            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-2 bg-gray-50 p-1 rounded-xl">
              {["Patient", "Doctor", "Guardian"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({ ...formData, role })}
                  className={`
                     py-2 text-sm font-medium rounded-lg transition-all
                     ${
                       formData.role === role
                         ? "bg-white text-primary shadow-sm ring-1 ring-gray-200"
                         : "text-gray-500 hover:text-gray-900"
                     }
                   `}
                >
                  {role}
                </button>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={loading}
            >
              Create Account <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

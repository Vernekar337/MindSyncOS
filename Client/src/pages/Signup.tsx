import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input"; // <--- Using the consistent Input component
import { User, Mail, Lock } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  // State for Role, Name, Email
  const [role, setRole] = useState<"Patient" | "Doctor" | "Guardian">(
    "Patient"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // SAVE USER WITH THE SELECTED ROLE
    localStorage.setItem(
      "mindSyncUser",
      JSON.stringify({
        email: email,
        name: name,
        role: role,
      })
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-text-main">
            Create an account
          </h1>
          <p className="text-text-muted mt-2">
            Start your journey to better mental health.
          </p>
        </div>

        {/* Signup Form Card */}
        <Card className="bg-white shadow-xl border-0 p-8">
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Full Name
              </label>
              <Input
                type="text"
                icon={<User size={18} />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email Input */}
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
                placeholder="••••••••"
                required
              />
            </div>

            {/* Role Selection Buttons (Visual Language 4.1) */}
            <div className="flex gap-2 p-1 bg-gray-50 rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setRole("Patient")}
                className={`flex-1 p-2 rounded-lg text-sm font-medium transition-all ${
                  role === "Patient"
                    ? "bg-white text-primary shadow-sm ring-1 ring-gray-200"
                    : "text-text-muted hover:bg-gray-200"
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setRole("Doctor")}
                className={`flex-1 p-2 rounded-lg text-sm font-medium transition-all ${
                  role === "Doctor"
                    ? "bg-white text-secondary shadow-sm ring-1 ring-gray-200"
                    : "text-text-muted hover:bg-gray-200"
                }`}
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => setRole("Guardian")}
                className={`flex-1 p-2 rounded-lg text-sm font-medium transition-all ${
                  role === "Guardian"
                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
                    : "text-text-muted hover:bg-gray-200"
                }`}
              >
                Guardian
              </button>
            </div>

            {/* Submit Button */}
            <Button className="w-full py-2.5 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              Create Account
            </Button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;

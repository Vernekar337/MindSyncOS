import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { User, Mail, Lock } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Signup
    localStorage.setItem(
      "mindSyncUser",
      JSON.stringify({ email: "new@user.com", name: "New User" })
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
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

        <Card className="bg-white shadow-xl border-0 p-8">
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 p-1 bg-gray-50 rounded-xl">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  className="peer sr-only"
                  defaultChecked
                />
                <div className="rounded-lg p-2 text-center text-sm font-medium text-text-muted peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                  Patient
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="role" className="peer sr-only" />
                <div className="rounded-lg p-2 text-center text-sm font-medium text-text-muted peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                  Doctor
                </div>
              </label>
            </div>

            <Button className="w-full py-2.5 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              Create Account
            </Button>
          </form>

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

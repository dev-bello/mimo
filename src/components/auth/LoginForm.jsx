import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useAuth } from "../../contexts/AuthContext";
import {
  EyeIcon,
  EyeOffIcon,
  ShieldCheckIcon,
  UserIcon,
  LockIcon,
} from "lucide-react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  const demoCredentials = [
    {
      role: "Admin",
      email: "admin@example.com",
      password: "admin123",
      color: "from-red-500 to-red-600",
      icon: ShieldCheckIcon,
    },
    {
      role: "Guard",
      email: "guard001@example.com",
      password: "guard123",
      color: "from-blue-500 to-blue-600",
      icon: ShieldCheckIcon,
    },
    {
      role: "Resident",
      email: "resident001@example.com",
      password: "resident123",
      color: "from-green-500 to-green-600",
      icon: UserIcon,
    },
  ];

  const fillCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="glass-effect border-0 shadow-large">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-glow">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-display gradient-text mb-2">
              MiMo NG
            </h1>
            <p className="text-neutral-600 font-medium">
              Welcome back! Please sign in to continue
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-neutral-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-modern w-full pl-12"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-neutral-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-modern w-full pl-12 pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-xl text-sm animate-slide-down">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="button-primary w-full py-3 text-base font-semibold rounded-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral-500 font-medium">
                  Demo Accounts
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {demoCredentials.map((cred, index) => {
                const IconComponent = cred.icon;
                return (
                  <button
                    key={index}
                    onClick={() => fillCredentials(cred.email, cred.password)}
                    className="w-full p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-white/50 hover:bg-white/80 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${cred.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-neutral-800">
                          {cred.role}
                        </div>
                        <div className="text-sm text-neutral-500 font-mono">
                          {cred.email}
                        </div>
                      </div>
                      <div className="text-xs text-neutral-400 font-mono bg-neutral-100 px-2 py-1 rounded-lg">
                        {cred.password}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

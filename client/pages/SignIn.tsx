import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { signIn } from "@shared/api";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    if (
      formData.email === "demo@cubeflow.app" &&
      formData.password === "demo123"
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "demo-123",
          username: "Demo User",
          email: formData.email,
        })
      );
      setIsLoading(false);
      navigate("/timer");
    } else {
      await signIn(formData.email, formData.password)
      .then((data) => {
        // Store user info in localStorage
        if ("error" in data) {
          setError(data.error + ". Try demo@cubeflow.app / demo123");
          setIsLoading(false);
          return;
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@cubeflow.app",
      password: "demo123",
    });
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-foreground/60 text-sm sm:text-base">
              Sign in to your CubeFlow account to track your progress
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold py-2.5 sm:py-3 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Demo Button */}
          <button
            onClick={handleDemoLogin}
            className="w-full mt-4 bg-secondary/20 text-secondary hover:bg-secondary/30 rounded-lg font-semibold py-2.5 sm:py-3 transition-colors text-sm sm:text-base"
          >
            Try Demo Account
          </button>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs sm:text-sm text-foreground/70">
            <p className="font-semibold text-blue-600 mb-2">Demo Credentials:</p>
            <p>Email: <span className="font-mono">demo@cubeflow.app</span></p>
            <p>Password: <span className="font-mono">demo123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

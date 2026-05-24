import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react";
import { resetPassword, sendResetPasswordEmail } from "@shared/api";

export default function ResetPassword() {
  const [step, setStep] = useState<"email" | "reset" | "success">("email");
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    const result = await sendResetPasswordEmail(formData.email);

    if (!result.success) {
      setError(result.error || "Failed to send reset email");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    setStep("reset");
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Form data on reset submit:", formData);

    if (!formData.code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    if (formData.code.length != 6) {
      setError("Verification code must be exactly 6 characters");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    await resetPassword(formData.email, formData.code, formData.password)
      .then((result) => {
        if (!result.success) {
          setError(result.error || "Failed to reset password");
          setIsLoading(false);
          return;
        }
        localStorage.removeItem("userResetEmail");
        setIsLoading(false);
        setStep("success");
      })
      .catch((err) => {
        setError(err.message || "An error occurred");
        setIsLoading(false);
      });
  };

  const handleBackToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Success State */}
          {step === "success" && (
            <>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Password Reset</h1>
                <p className="text-foreground/60 text-sm sm:text-base">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
              </div>

              <button
                onClick={handleBackToSignIn}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-2.5 sm:py-3 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Back to Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Email Verification Step */}
          {step === "email" && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Forgot Password?</h1>
                <p className="text-foreground/60 text-sm sm:text-base">
                  Enter your email address and we'll send you a code to reset your password
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email Address
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold py-2.5 sm:py-3 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isLoading ? "Sending..." : "Send Reset Code"}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <p className="text-center mt-6 text-sm text-foreground/60">
                Remember your password?{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}

          {/* Reset Password Step */}
          {step === "reset" && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Reset Password</h1>
                <p className="text-foreground/60 text-sm sm:text-base">
                  Enter the code from your email and create a new password
                </p>
              </div>

              <form onSubmit={handleResetSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Verification Code */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary text-center tracking-widest font-mono text-lg"
                  />
                  <p className="text-xs text-foreground/50 mt-1">
                    Check your email for the code
                  </p>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    New Password
                  </label>
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
                  <p className="text-xs text-foreground/50 mt-1">
                    Must be at least 6 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold py-2.5 sm:py-3 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <button
                onClick={() => {
                  setStep("email");
                  setError("");
                  setFormData({ email: "", code: "", password: "", confirmPassword: "" });
                }}
                className="w-full mt-4 text-foreground/60 hover:text-foreground transition-colors text-sm"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

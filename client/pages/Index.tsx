import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import {
  Zap,
  BarChart3,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
} from "lucide-react";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 w-full overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 font-semibold text-xs sm:text-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              The Speedcubing Gym
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground leading-tight">
              Train. Analyze.
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get Faster.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 sm:mb-8 max-w-md leading-relaxed">
              A complete speedcubing training platform. Track every solve, analyze patterns, master algorithms, and climb the leaderboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {!isLoggedIn && (
                <Link
                  to="/signup"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-2.5 sm:py-3 px-6 sm:px-8 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              )}
              <a
                href="#features"
                className="bg-foreground/5 text-foreground hover:bg-foreground/10 rounded-lg font-semibold py-2.5 sm:py-3 px-6 sm:px-8 transition-colors border border-border text-sm sm:text-base"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary">1000+</div>
                <p className="text-foreground/60 text-xs sm:text-sm">Active Cubers</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary">50K+</div>
                <p className="text-foreground/60 text-xs sm:text-sm">Solves Tracked</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary">99%</div>
                <p className="text-foreground/60 text-xs sm:text-sm">Uptime</p>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative h-96 hidden lg:flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative grid grid-cols-3 gap-4">
              {/* Cube representation */}
              <div className="flex flex-col gap-4">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  U
                </div>
                <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  R
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-8">
                <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  F
                </div>
                <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center text-gray-900 font-bold text-2xl shadow-lg">
                  D
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  L
                </div>
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  B
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-20"
      >
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Everything You Need</h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto px-2">
            Complete tools to practice, track, and improve your speedcubing skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Link
            to="/timer"
            className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Precision Timer</h3>
            <p className="text-foreground/60 mb-4">
              Professional-grade speedcubing timer with inspection time, DNF tracking, and real-time splits.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Spacebar control <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Feature 2 */}
          <Link
            to="/timer"
            className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Scrambles</h3>
            <p className="text-foreground/60 mb-4">
              Official WCA scramble generation. Copy, share, and visualize scrambles with one click.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
              WCA Standard <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Feature 3 */}
          <Link
            to="/stats"
            className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Detailed Stats</h3>
            <p className="text-foreground/60 mb-4">
              Visualize your progress with charts. Track Ao5, Ao12, and identify improvement patterns.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Visual insights <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Feature 4 */}
          <Link
            to="/analysis"
            className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance Analysis</h3>
            <p className="text-foreground/60 mb-4">
              AI-powered insights into your slow phases and inconsistencies. Get personalized tips.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Smart analysis <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Feature 6 */}
          <Link
            to="/leaderboards"
            className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Leaderboards</h3>
            <p className="text-foreground/60 mb-4">
              Compete with your community. Campus rankings, global stats, and friendly competitions.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Instant rivalry <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-20">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary to-secondary p-6 sm:p-12 md:p-16 lg:p-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Get Faster?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Join thousands of speedcubers tracking their progress. Your PB is waiting.
            </p>
            <Link
              to="/signup"
              className="bg-white text-primary hover:bg-white/90 rounded-lg font-bold py-2.5 sm:py-3 px-6 sm:px-8 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
            >
              Start Free Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 w-full">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-foreground/60">
              © 2024 CubeFlow. Built for speedcubers, by speedcubers.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a
                href="#"
                className="text-xs sm:text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

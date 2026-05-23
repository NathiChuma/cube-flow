import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Target,
  CheckCircle,
  Zap,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getUserStats, getUserAnalysis, UserStats } from "@shared/api";

interface AIAnalysis {
  insights: string[];
  recommendations: string[];
  score: number;
  scoreLabel: string;
}

export default function Analysis() {
  const [statsData, setStatsData] = useState<UserStats | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserStats = async () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        await getUserStats(user.id).then((data) => {
          if (!("error" in data)) {
            setStatsData(data as UserStats);
          }
        });
      }
    };
    fetchUserStats();
  }, []);

  useEffect(() => {
    if (!statsData) return;
    generateAIAnalysis(statsData);
  }, [statsData]);

  const generateAIAnalysis = async (stats: UserStats) => {
    setLoading(true);
    
    await getUserAnalysis(stats).then((data) => {
      if ("error" in data) {
        console.error("AI analysis error:", data.error);
      } else {
        setAiAnalysis(data as AIAnalysis);
      }
    })
    .catch((err) => {
      console.error("Failed to get AI analysis:", err);
    })
    .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Performance Analysis</h1>
          <p className="text-sm sm:text-base text-foreground/60">
            AI-powered insights into your solving patterns and areas for improvement.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-foreground/60 max-w-sm mx-auto">
            AI-powered performance analysis, insights, and recommendations are on the way.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 pb-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Performance Analysis
          </h1>
          <p className="text-sm sm:text-base text-foreground/60">
            AI-powered insights into your solving patterns and areas for improvement.
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-6 sm:p-8 mb-8 text-center">
          <p className="text-foreground/60 text-xs sm:text-sm uppercase tracking-wider mb-2">
            Overall Score
          </p>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-foreground/60">Analyzing your stats...</span>
            </div>
          ) : (
            <>
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-2">
                {aiAnalysis?.score ?? "—"}/10
              </p>
              <p className="text-sm sm:text-base text-foreground/70 px-2">
                {aiAnalysis?.scoreLabel ?? "Loading analysis..."}
              </p>
            </>
          )}
        </div>

        {/* Key Insights */}
        <div className="space-y-3 sm:space-y-4 mb-8">
          <h2 className="text-lg sm:text-xl font-bold">Key Insights</h2>
          {loading ? (
            <div className="bg-card border border-border rounded-lg p-6 flex items-center gap-3 text-foreground/60">
              <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
              Generating insights based on your stats...
            </div>
          ) : (
            aiAnalysis?.insights.map((insight, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4 flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  {insight.toLowerCase().includes("consistent") || insight.toLowerCase().includes("dnf") || insight.toLowerCase().includes("low") ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : insight.toLowerCase().includes("improv") || insight.toLowerCase().includes("streak") ? (
                    <TrendingUp className="w-5 h-5 text-primary" />
                  ) : (
                    <Zap className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <p className="text-foreground text-base">{insight}</p>
              </div>
            ))
          )}
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Timing Statistics</h3>
              <div className="space-y-3">
                {[
                  { label: "Best Time", value: statsData?.userStats.bestTime, color: "text-green-600" },
                  { label: "Worst Time", value: statsData?.userStats.worstTime, color: "text-red-500" },
                  { label: "Average", value: statsData?.userStats.avgTime, color: "text-primary" },
                  { label: "Ao5", value: statsData?.userStats.ao5, color: "text-primary" },
                  { label: "Ao12", value: statsData?.userStats.ao12, color: "text-primary" },
                  { label: "Ao100", value: statsData?.userStats.ao100, color: "text-primary" },
                ].map(({ label, value, color }, i, arr) => (
                  <div key={label} className={`flex justify-between items-center ${i < arr.length - 1 ? "pb-3 border-b border-border" : ""}`}>
                    <span className="text-foreground/60">{label}</span>
                    <span className={`font-mono font-bold ${color}`}>{value}s</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Reliability</h3>
              <div className="space-y-3">
                {[
                  { label: "Total Solves", value: statsData?.userStats.totalSolves, color: "text-foreground" },
                  { label: "DNF Count", value: statsData?.userStats.dnfCount, color: "text-orange-500" },
                  { label: "DNF Rate", value: statsData?.userStats.dnfRate, color: "text-orange-500" },
                  { label: "Current Streak", value: statsData?.userStats.currentStreak, color: "text-green-600" },
                  { label: "Best Streak", value: statsData?.userStats.longestStreak, color: "text-green-600" },
                ].map(({ label, value, color }, i, arr) => (
                  <div key={label} className={`flex justify-between items-center ${i < arr.length - 1 ? "pb-3 border-b border-border" : ""}`}>
                    <span className="text-foreground/60">{label}</span>
                    <span className={`font-bold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Recommendations</h3>
                  {loading ? (
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                      Generating recommendations...
                    </div>
                  ) : (
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {aiAnalysis?.recommendations.map((rec, idx) => (
                        <li key={idx}>✓ {rec}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Recent Achievements</h3>
              <div className="space-y-2">
                {statsData?.achievements
                  .filter((a) => a.unlocked)
                  .slice(0, 4)
                  .map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{achievement.title}</p>
                        <p className="text-xs text-foreground/50">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link to="/stats" className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group">
            <TrendingUp className="w-6 h-6 text-primary mb-3 group-hover:translate-x-1 transition-transform" />
            <h3 className="font-bold mb-2">View Detailed Stats</h3>
            <p className="text-sm text-foreground/60">See charts, graphs, and deeper analysis of your performance.</p>
          </Link>
          <Link to="/algorithms" className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group">
            <Target className="w-6 h-6 text-secondary mb-3 group-hover:translate-x-1 transition-transform" />
            <h3 className="font-bold mb-2">Learn Algorithms</h3>
            <p className="text-sm text-foreational/60">Master OLL and PLL to improve your times significantly.</p>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/timer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-3 px-8 transition-colors">
            Continue Training <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
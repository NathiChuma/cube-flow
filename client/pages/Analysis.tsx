import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Target,
  CheckCircle,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { userStats, achievements } from "@/lib/dummy-data";

export default function Analysis() {
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    // Generate insights based on user stats
    const generatedInsights: string[] = [];

    // Insight 1: Consistency
    generatedInsights.push(
      "✅ Excellent consistency! Your Ao5 and Ao12 are very close to your average."
    );

    // Insight 2: Improvement trend
    generatedInsights.push(
      "📈 You've improved 15% over the last 7 days. Keep up the momentum!"
    );

    // Insight 3: DNF Analysis
    if (userStats.dnfRate === "1.3%") {
      generatedInsights.push(
        "🎯 Very low DNF rate (1.3%). Your technique is solid and reliable."
      );
    }

    // Insight 4: Practice recommendation
    generatedInsights.push(
      "💡 Consider focusing on F2L optimization to reduce your times further."
    );

    // Insight 5: Streak
    if (parseInt(userStats.currentStreak) > 10) {
      generatedInsights.push(
        `🔥 Amazing streak! You've completed ${userStats.currentStreak} solves without DNF.`
      );
    }

    setInsights(generatedInsights);
  }, []);

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 pb-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Performance Analysis
          </h1>
          <p className="text-sm sm:text-base text-foreground/60">
            AI-powered insights into your solving patterns and areas for
            improvement.
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-6 sm:p-8 mb-8 text-center">
          <p className="text-foreground/60 text-xs sm:text-sm uppercase tracking-wider mb-2">
            Overall Score
          </p>
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-2">8.5/10</p>
          <p className="text-sm sm:text-base text-foreground/70 px-2">
            Your cubing skills are above average. Keep training to reach
            excellence.
          </p>
        </div>

        {/* Key Insights */}
        <div className="space-y-3 sm:space-y-4 mb-8">
          <h2 className="text-lg sm:text-xl font-bold">Key Insights</h2>
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-4 flex gap-4 items-start"
            >
              <div className="flex-shrink-0 mt-1">
                {insight.includes("✅") || insight.includes("🎯") ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : insight.includes("📈") || insight.includes("🔥") ? (
                  <TrendingUp className="w-5 h-5 text-primary" />
                ) : (
                  <Zap className="w-5 h-5 text-yellow-600" />
                )}
              </div>
              <p className="text-foreground text-base">{insight}</p>
            </div>
          ))}
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Timing Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">Best Time</span>
                  <span className="font-mono font-bold text-green-600">
                    {userStats.bestTime}s
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">Worst Time</span>
                  <span className="font-mono font-bold text-red-500">
                    {userStats.worstTime}s
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">Average</span>
                  <span className="font-mono font-bold text-primary">
                    {userStats.avgTime}s
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">Ao5</span>
                  <span className="font-mono font-bold text-primary">
                    {userStats.ao5}s
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">Ao12</span>
                  <span className="font-mono font-bold text-primary">
                    {userStats.ao12}s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/60">Ao100</span>
                  <span className="font-mono font-bold text-primary">
                    {userStats.ao100}s
                  </span>
                </div>
              </div>
            </div>

            {/* Reliability */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Reliability</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">Total Solves</span>
                  <span className="font-bold">{userStats.totalSolves}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">DNF Count</span>
                  <span className="font-bold text-orange-500">
                    {userStats.dnfCount}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">DNF Rate</span>
                  <span className="font-bold text-orange-500">
                    {userStats.dnfRate}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-foreground/60">Current Streak</span>
                  <span className="font-bold text-green-600">
                    {userStats.currentStreak}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/60">Best Streak</span>
                  <span className="font-bold text-green-600">
                    {userStats.longestStreak}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recommendations */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Recommendations</h3>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li>
                      ✓ Your consistency is great. Work on reducing best-to-worst
                      gaps.
                    </li>
                    <li>
                      ✓ Practice F2L pairs to shave seconds off your solve times.
                    </li>
                    <li>✓ Learn advanced PLL algorithms for faster last layer.</li>
                    <li>
                      ✓ Consider doing inspection practice to improve cube control.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Unlocked Achievements */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Recent Achievements</h3>
              <div className="space-y-2">
                {achievements
                  .filter((a) => a.unlocked)
                  .slice(0, 4)
                  .map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 p-2"
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-foreground/50">
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/stats"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group"
          >
            <TrendingUp className="w-6 h-6 text-primary mb-3 group-hover:translate-x-1 transition-transform" />
            <h3 className="font-bold mb-2">View Detailed Stats</h3>
            <p className="text-sm text-foreground/60">
              See charts, graphs, and deeper analysis of your performance.
            </p>
          </Link>
          <Link
            to="/algorithms"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group"
          >
            <Target className="w-6 h-6 text-secondary mb-3 group-hover:translate-x-1 transition-transform" />
            <h3 className="font-bold mb-2">Learn Algorithms</h3>
            <p className="text-sm text-foreground/60">
              Master OLL and PLL to improve your times significantly.
            </p>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/timer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-3 px-8 transition-colors"
          >
            Continue Training <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Award, Target, Clock, Zap } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getUserStats, UserStats, userStatsCache } from "@shared/api";
import { useEffect, useState } from "react";
import { dummyStatsData } from "@/lib/dummy-data";
import { SolvesTable } from "@/components/SolvesTable";

export default function Stats() {
  const COLORS = ["#A020F0", "#FF4500", "#10B981", "#F59E0B"];
  const [statsData, setStatsData] = useState<UserStats | null>(null);

  useEffect(() => {

    const fetchUserStats = async () => {

      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);

      if (userStatsCache[user.id]) {
        setStatsData(userStatsCache[user.id]);
        return;
      }

      if (user && user.id !== "demo-123") {
        // Fetch user stats from API and update state
        await getUserStats(user.id);
        setStatsData(userStatsCache[user.id]);
      }else {
        // For demo user, use dummy data
        setStatsData(dummyStatsData as UserStats);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 pb-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Statistics Dashboard</h1>
          <p className="text-sm sm:text-base text-foreground/60">
            Visualize your progress and track your improvement over time.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs sm:text-sm font-semibold text-foreground/60">BEST</p>
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 font-mono">{statsData?.userStats.bestTime ? `${statsData?.userStats.bestTime}s` : "-"}</p>
            <p className="text-xs text-foreground/50 mt-1">Personal Record</p>
          </div>

          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs sm:text-sm font-semibold text-foreground/60">AVG</p>
              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-mono">{statsData?.userStats.avgTime ? `${statsData?.userStats.avgTime}s` : "-"}</p>
            <p className="text-xs text-foreground/50 mt-1">All Solves</p>
          </div>

          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs sm:text-sm font-semibold text-foreground/60">AO5</p>
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary font-mono">{statsData?.userStats.ao5 ? `${statsData?.userStats.ao5}s` : "-"}</p>
            <p className="text-xs text-foreground/50 mt-1">Last 5</p>
          </div>

          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs sm:text-sm font-semibold text-foreground/60">TOTAL</p>
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-mono">{statsData?.userStats.totalSolves ? `${statsData?.userStats.totalSolves}` : "-"}</p>
            <p className="text-xs text-foreground/50 mt-1">All Time</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 w-full">
          {/* Time Trend Chart */}
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full">
            <h2 className="text-base sm:text-lg font-bold mb-4">Average Time Trend</h2>
            <div className="w-full h-48 sm:h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={statsData?.timeTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--foreground)/0.6)" fontSize={11} />
                  <YAxis stroke="hsl(var(--foreground)/0.6)" fontSize={11} width={35} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Session Stats Chart */}
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full">
            <h2 className="text-base sm:text-lg font-bold mb-4">Session Performance</h2>
            <div className="w-full h-48 sm:h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statsData?.sessions.slice(0, 6)} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--foreground)/0.6)" fontSize={10} angle={-45} textAnchor="end" height={60} />
                  <YAxis stroke="hsl(var(--foreground)/0.6)" fontSize={11} width={35} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="bestTime" fill="hsl(var(--primary))" />
                  <Bar dataKey="avgTime" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Consistency Pie Chart */}
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full">
            <h2 className="text-base sm:text-lg font-bold mb-4">Solve Consistency</h2>
            <div className="w-full h-48 sm:h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <Pie
                    data={[
                      { name: "Excellent", value: statsData?.consistency.excellent },
                      { name: "Good", value: statsData?.consistency.good },
                      { name: "Fair", value: statsData?.consistency.fair },
                      { name: "Poor", value: statsData?.consistency.poor },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 w-full">
            <h2 className="text-base sm:text-lg font-bold mb-4">More Statistics</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-foreground/60">Ao12</span>
                <span className="font-mono font-bold text-primary text-sm sm:text-base">{statsData?.userStats.ao12 ? `${statsData?.userStats.ao12}s` : "-"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-foreground/60">Ao50</span>
                <span className="font-mono font-bold text-primary text-sm sm:text-base">{statsData?.userStats.ao50 ? `${statsData?.userStats.ao50}s` : "-"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-foreground/60">Ao100</span>
                <span className="font-mono font-bold text-primary text-sm sm:text-base">{statsData?.userStats.ao100 ? `${statsData?.userStats.ao100}s` : "-"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-foreground/60">Worst Time</span>
                <span className="font-mono font-bold text-red-500 text-sm sm:text-base">{statsData?.userStats.worstTime ? `${statsData?.userStats.worstTime}s` : "-"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-foreground/60">DNF Rate</span>
                <span className="font-mono font-bold text-orange-500 text-sm sm:text-base">{statsData?.userStats.dnfRate ? `${statsData?.userStats.dnfRate}%` : "-"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-foreground/60">Current Streak</span>
                <span className="font-mono font-bold text-green-600 text-sm sm:text-base">{statsData?.userStats.currentStreak ? `${statsData?.userStats.currentStreak}` : "-"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-foreground/60">Best Streak</span>
                <span className="font-mono font-bold text-green-600 text-sm sm:text-base">{statsData?.userStats.longestStreak ? `${statsData?.userStats.longestStreak}` : "-"}</span>
              </div>
            </div>
          </div>
        </div>
        
        {statsData?.solves && (
          <SolvesTable solves={statsData.solves} />
        )}

        {/* Achievements */}
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 mt-8 w-full overflow-x-hidden">
          <h2 className="text-base sm:text-lg font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {statsData?.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center p-2 sm:p-3 md:p-4 rounded-lg border transition-all ${
                  achievement.unlocked
                    ? "bg-primary/10 border-primary/50"
                    : "bg-foreground/5 border-border opacity-50"
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{achievement.icon}</div>
                <p className="font-semibold text-xs sm:text-sm">{achievement.title}</p>
                {achievement.unlocked && (
                  <p className="text-xs text-foreground/60 mt-1 truncate">{achievement.date}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-6">
          <Link
            to="/timer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-2 sm:py-3 px-6 sm:px-8 transition-colors text-sm sm:text-base"
          >
            Continue Training <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

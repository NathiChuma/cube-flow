import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Medal, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { globalLeaderboard, campusLeaderboard, monthlyCompetition } from "@/lib/dummy-data";

export default function Leaderboards() {
  const getMedalColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-500";
    return "text-foreground/60";
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 pb-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Leaderboards</h1>
          <p className="text-sm sm:text-base text-foreground/60">
            Compete with the community. Campus rankings, global stats, and friendly competitions.
          </p>
        </div>

        {/* Active Competition */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white mb-6 sm:mb-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <h2 className="text-lg sm:text-2xl font-bold truncate">{monthlyCompetition.name}</h2>
              </div>
              <p className="opacity-90 text-xs sm:text-sm">
                {monthlyCompetition.startDate} - {monthlyCompetition.endDate}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl sm:text-3xl font-bold">{monthlyCompetition.participants}</p>
              <p className="text-xs sm:text-sm opacity-90">Participants</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
            <div>
              <p className="opacity-75 text-xs sm:text-sm">Your Rank</p>
              <p className="text-xl sm:text-2xl font-bold">#{monthlyCompetition.yourRank}</p>
            </div>
            <div>
              <p className="opacity-75 text-xs sm:text-sm">Your Best Time</p>
              <p className="text-xl sm:text-2xl font-bold">{monthlyCompetition.yourTime}s</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="global" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global">Global Rankings</TabsTrigger>
            <TabsTrigger value="campus">Campus Rankings</TabsTrigger>
          </TabsList>

          {/* Global Tab */}
          <TabsContent value="global" className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Top 8 Speedcubers</h2>
              </div>
              <p className="text-foreground/60">The fastest cubers on CubeFlow</p>
            </div>

            <div className="space-y-3">
              {globalLeaderboard.map((entry) => (
                <div key={entry.rank} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className={`${getMedalColor(entry.rank)} font-bold text-xl min-w-8 flex items-center justify-center`}>
                    {entry.rank === 1 && <Medal className="w-6 h-6" />}
                    {entry.rank === 2 && <Medal className="w-6 h-6" />}
                    {entry.rank === 3 && <Medal className="w-6 h-6" />}
                    {entry.rank > 3 && `#${entry.rank}`}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground">{entry.name}</p>
                      <span className="text-lg">{entry.country}</span>
                    </div>
                    <p className="text-sm text-foreground/60">PB: {entry.pb}s</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-primary text-lg">{entry.time}s</p>
                    <p className="text-sm text-foreground/60">Ao5: {entry.ao5}s</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Campus Tab */}
          <TabsContent value="campus" className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-secondary" />
                <h2 className="text-xl font-bold">Campus Rankings</h2>
              </div>
              <p className="text-foreground/60">Connect with your team and compete locally</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground/80">
                👥 <strong>Join a campus group</strong> to see rankings with your teammates and compete locally. Teams enable friendly competitions and performance tracking.
              </p>
            </div>

            <div className="space-y-3">
              {campusLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`${entry.isYou ? "bg-primary/10 border-primary/50" : "bg-card border-border"} border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow`}
                >
                  <div className={`${getMedalColor(entry.rank)} font-bold text-xl min-w-8 flex items-center justify-center`}>
                    {entry.rank === 1 && <Medal className="w-6 h-6" />}
                    {entry.rank > 1 && `#${entry.rank}`}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">
                      {entry.name} {entry.isYou && <span className="text-primary text-sm ml-2 font-normal">(You)</span>}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {entry.isYou ? "Join a team to start competing" : `PB: ${entry.pb}s`}
                    </p>
                  </div>
                  {!entry.isYou && (
                    <div className="text-right">
                      <p className="font-mono font-bold text-primary text-lg">{entry.time}s</p>
                      <p className="text-sm text-foreground/60">Ao5: {entry.ao5}s</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-3 px-6 transition-colors">
              Join or Create a Team
            </button>
          </TabsContent>
        </Tabs>

        {/* Upcoming Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-2">🏆 Personal Stats</h3>
            <p className="text-foreground/60 text-sm">
              See your ranking position, compare to your friends, and track your rating changes over time.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-2">📊 Season Rankings</h3>
            <p className="text-foreground/60 text-sm">
              Compete in monthly seasons with exclusive badges and rewards for top performers.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-2">🎯 Tournaments</h3>
            <p className="text-foreground/60 text-sm">
              Join weekly tournaments and battle in real-time speedcubing events with prizes.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-2">👥 Friend Rankings</h3>
            <p className="text-foreground/60 text-sm">
              Add friends, challenge them, and see side-by-side progress comparison.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to dominate the leaderboards?</h2>
          <Link
            to="/timer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-3 px-8 transition-colors"
          >
            Start Training <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

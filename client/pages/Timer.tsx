import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SolveTimer } from "@/components/SolveTimer";
import { ScrambleDisplay } from "@/components/ScrambleDisplay";
import {
  generateScramble,
  saveScrambleToHistory,
  getScrambleHistory,
} from "@/lib/scramble-generator";
import { Trash2 } from "lucide-react";
import { User, Solve, CreateSolveRequest, addSolve, getUserSolves, deleteSolve } from "@shared/api";

export default function Timer() {
  const [scramble, setScramble] = useState("");
  const [solves, setSolves] = useState<Solve[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [dailyStats, setDailyStats] = useState({
    solves: 0,
    bestTime: null as number | null,
    averageTime: null as number | null,
    ao5: null as number | null,
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, [location]);

  useEffect(() => {

    if (user?.id === "demo-123") return; // Skip API calls for demo user

    async function fetchUserSolves() {
      await getUserSolves(user.id)
      .then((data) => {
        if ("error" in data) {
          console.error("Error fetching user solves:", data.error);
        } else {
          setSolves(data.solves.filter(s => s.time !== -1));
        }
      })
      .catch((err) => {
        console.error("Error fetching user solves:", err);
      });
    }

    if (user) {
      fetchUserSolves();
    }
  }, [user]);

  // Recalculate daily stats whenever solves change
  useEffect(() => {
    calculateDailyStats();
  }, [solves]);

  // Initialize scramble
  useEffect(() => {
    generateNewScramble();
  }, []);

  // Load solves from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("solves");
    if (saved) {
      setSolves(JSON.parse(saved));
    }
  }, []);

  // Save solves to localStorage
  useEffect(() => {
    localStorage.setItem("solves", JSON.stringify(solves));
  }, []);

  const generateNewScramble = () => {
    const newScramble = generateScramble(20);
    setScramble(newScramble);
    saveScrambleToHistory(newScramble);
  };

  const handleSolveComplete = async (timeMs: number) => {
    const newSolve: CreateSolveRequest = {
      userId: user ? user.id : "guest",
      time: timeMs,
      scramble,
      timestamp: new Date().toISOString(),
      dnf: timeMs === -1,
    };

    if (user.id !== "demo-123") {
      const solve = await addSolve(newSolve);

      if ("error" in solve) {
        console.error("Error adding solve:", solve.error);
        return;
      }

      if (timeMs !== -1) {
        setSolves([solve, ...solves]);
      }
    }else{

      if (timeMs !== -1) {
        setSolves([{...newSolve, id: Date.now().toString()}, ...solves]);
      }
    }
    generateNewScramble();
  };

  const handleDelete = async (id: string) => {
    await deleteSolve(id).then((data) => {
      if (!data.success) {
        console.error("Error deleting solve:", data.error);
      } else {
        setSolves(solves.filter((s) => s.id !== id));
      }
    })
    .catch((err) => {
      console.error("Error deleting solve:", err);
    });
    setSolves(solves.filter((s) => s.id !== id));
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    }
    return `${seconds}.${milliseconds.toString().padStart(2, "0")}`;
  };

  // Calculate stats
  const calculateDailyStats = () => {
    const today = new Date().toISOString().split("T")[0];
    const todaysSolves = solves.filter((s) => s.timestamp.startsWith(today));

    const validSolves = todaysSolves.filter((s) => !s.dnf);
    const bestTime =
      validSolves.length > 0
        ? Math.min(...validSolves.map((s) => s.time))
        : null;
    const averageTime =
      validSolves.length > 0
        ? validSolves.reduce((sum, s) => sum + s.time, 0) / validSolves.length
        : null;
    const ao5 =
      validSolves.length >= 5
        ? validSolves
            .slice(0, 5)
            .reduce((sum, s) => sum + s.time, 0) / 5
        : null;

    setDailyStats({
      solves: todaysSolves.length,
      bestTime,
      averageTime,
      ao5,
    });
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 pb-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Speedcube Trainer
          </h1>
          <p className="text-sm sm:text-base text-foreground/60">
            Press spacebar to start. Chase your personal best.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
          {/* Left: Scramble & Timer */}
          <div className="lg:col-span-2 space-y-6">
            <ScrambleDisplay
              scramble={scramble}
              onNewScramble={generateNewScramble}
            />

            <SolveTimer onSolveComplete={handleSolveComplete} />
          </div>

          {/* Right: Stats & Solves */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                Daily Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Solves Today</p>
                  <p className="text-3xl font-bold text-primary">
                    {dailyStats.solves}
                  </p>
                </div>
                {dailyStats.bestTime && (
                  <div>
                    <p className="text-foreground/60 text-sm mb-1">Best Time</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatTime(dailyStats.bestTime)}
                    </p>
                  </div>
                )}
                {dailyStats.averageTime && (
                  <div>
                    <p className="text-foreground/60 text-sm mb-1">Average</p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatTime(dailyStats.averageTime)}
                    </p>
                  </div>
                )}
                {dailyStats.ao5 && (
                  <div>
                    <p className="text-foreground/60 text-sm mb-1">Ao5</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatTime(dailyStats.ao5)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Solves */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                Recent Solves
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto no-scrollbar">
                {solves.length === 0 ? (
                  <p className="text-foreground/60 text-sm">
                    No solves yet. Start training!
                  </p>
                ) : (
                  solves.slice(0, 10).map((solve, idx) => (
                    <div
                      key={solve.id}
                      className="flex items-center justify-between gap-2 p-3 bg-foreground/5 rounded-lg group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-mono font-bold">
                          {idx + 1}. {formatTime(solve.time)}
                        </p>
                        <p className="text-xs text-foreground/50 truncate w-full">
                          {solve.scramble}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(solve.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground/40 hover:text-red-500 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

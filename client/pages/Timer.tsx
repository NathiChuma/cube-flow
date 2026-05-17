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

interface Solve {
  id: string;
  time: number;
  scramble: string;
  timestamp: Date;
  dnf?: boolean;
}

export default function Timer() {
  const [scramble, setScramble] = useState("");
  const [solves, setSolves] = useState<Solve[]>([]);

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
  }, [solves]);

  const generateNewScramble = () => {
    const newScramble = generateScramble(20);
    setScramble(newScramble);
    saveScrambleToHistory(newScramble);
  };

  const handleSolveComplete = (timeMs: number) => {
    const newSolve: Solve = {
      id: Date.now().toString(),
      time: timeMs,
      scramble,
      timestamp: new Date(),
    };

    setSolves([newSolve, ...solves]);
    generateNewScramble();
  };

  const deleteSolve = (id: string) => {
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
  const validSolves = solves.filter((s) => !s.dnf);
  const bestTime =
    validSolves.length > 0
      ? Math.min(...validSolves.map((s) => s.time))
      : null;
  const worstTime =
    validSolves.length > 0
      ? Math.max(...validSolves.map((s) => s.time))
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
                Session Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Solves</p>
                  <p className="text-3xl font-bold text-primary">
                    {solves.length}
                  </p>
                </div>
                {bestTime && (
                  <div>
                    <p className="text-foreground/60 text-sm mb-1">Best Time</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatTime(bestTime)}
                    </p>
                  </div>
                )}
                {averageTime && (
                  <div>
                    <p className="text-foreground/60 text-sm mb-1">Average</p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatTime(averageTime)}
                    </p>
                  </div>
                )}
                {ao5 && (
                  <div>
                    <p className="text-foreground/60 text-sm mb-1">Ao5</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatTime(ao5)}
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
              <div className="space-y-2 max-h-96 overflow-y-auto">
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
                      <div>
                        <p className="font-mono font-bold">
                          {idx + 1}. {formatTime(solve.time)}
                        </p>
                        <p className="text-xs text-foreground/50 truncate">
                          {solve.scramble}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteSolve(solve.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground/40 hover:text-red-500"
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

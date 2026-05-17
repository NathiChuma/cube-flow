import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface SolveTimerProps {
  onSolveComplete: (time: number) => void;
}

export function SolveTimer({ onSolveComplete }: SolveTimerProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isInspection, setIsInspection] = useState(false);
  const [inspectionTime, setInspectionTime] = useState(15);
  const [isReady, setIsReady] = useState(false);
  const [dnf, setDnf] = useState(false);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Inspection timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isInspection && inspectionTime > 0) {
      interval = setInterval(() => {
        setInspectionTime((prev) => {
          if (prev <= 1) {
            setIsInspection(false);
            setIsReady(true);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isInspection, inspectionTime]);

  // Handle spacebar
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();

        // First: Start inspection (only when nothing is running)
        if (!isRunning && !isInspection && !isReady && time === 0) {
          setIsInspection(true);
          setIsReady(false);
        }
        // Second: Start timer after inspection is complete
        else if (!isRunning && isReady && time === 0) {
          setIsRunning(true);
          setIsReady(false);
        }
        // Third: Stop timer when running
        else if (isRunning) {
          setIsRunning(false);
        }
      }
    },
    [isRunning, isInspection, isReady, time]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setIsInspection(false);
    setInspectionTime(15);
    setIsReady(false);
    setDnf(false);
  };

  const handleFinish = () => {
    if (!dnf && time > 0) {
      onSolveComplete(time);
      handleReset();
    }
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

  const getTimerColor = () => {
    if (dnf) return "text-red-500";
    if (isInspection && inspectionTime > 8) return "text-green-500";
    if (isInspection && inspectionTime <= 8) return "text-orange-500";
    if (isRunning) return "text-primary";
    if (isReady) return "text-green-500";
    return "text-foreground/40";
  };

  const getTimerBackground = () => {
    if (dnf) return "bg-red-500/10";
    if (isInspection) return "bg-orange-500/10";
    if (isRunning) return "bg-primary/10";
    if (isReady) return "bg-green-500/10";
    return "bg-foreground/5";
  };

  const handleStartInspection = () => {
    if (!isRunning && !isInspection && time === 0) {
      setIsInspection(true);
      setIsReady(false);
    }
  };

  const handleStartTimer = () => {
    if (!isRunning && isReady && time === 0) {
      setIsRunning(true);
      setIsReady(false);
    }
  };

  const handleStopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Timer Display */}
      <div
        className={`${getTimerBackground()} border border-border rounded-3xl p-12 sm:p-16 text-center transition-all active:scale-95 sm:active:scale-100`}
      >
        <div className={`text-5xl sm:text-7xl font-mono font-bold mb-4 ${getTimerColor()} transition-colors font-space-mono`}>
          {isInspection
            ? `INSPECT ${inspectionTime}`
            : dnf
              ? "DNF"
              : formatTime(time)}
        </div>
        <p className="text-foreground/60 text-xs sm:text-sm uppercase tracking-widest">
          {isInspection
            ? "Inspection in progress"
            : isRunning
              ? "Solving..."
              : isReady
                ? "Tap to start"
                : time > 0
                  ? "Tap to continue"
                  : "Tap to inspect"}
        </p>
      </div>

      {/* Mobile Control Buttons */}
      <div className="sm:hidden flex gap-3 justify-center flex-wrap">
        {time === 0 && !isRunning && !isInspection && (
          <button
            onClick={handleStartInspection}
            className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 rounded-lg font-semibold py-3 px-6 transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Inspection
          </button>
        )}

        {isReady && !isRunning && (
          <button
            onClick={handleStartTimer}
            className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 active:bg-green-700 rounded-lg font-semibold py-3 px-6 transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Timer
          </button>
        )}

        {isRunning && (
          <button
            onClick={handleStopTimer}
            className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-lg font-semibold py-3 px-6 transition-colors"
          >
            <Pause className="w-5 h-5" />
            Stop
          </button>
        )}
      </div>

      {/* Control Buttons for Result Actions */}
      <div className="flex gap-3 justify-center flex-wrap">
        {time > 0 && !isRunning && (
          <>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-foreground/10 text-foreground hover:bg-foreground/20 active:bg-foreground/30 rounded-lg font-semibold py-2 px-4 sm:py-2 sm:px-6 transition-colors text-sm sm:text-base"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            {!dnf ? (
              <>
                <button
                  onClick={() => setDnf(true)}
                  className="flex items-center gap-2 bg-red-500/20 text-red-600 hover:bg-red-500/30 active:bg-red-500/40 rounded-lg font-semibold py-2 px-4 sm:py-2 sm:px-6 transition-colors text-sm sm:text-base"
                >
                  Mark DNF
                </button>
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 active:bg-green-700 rounded-lg font-semibold py-2 px-4 sm:py-2 sm:px-6 transition-colors text-sm sm:text-base"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setDnf(false)}
                className="flex items-center gap-2 bg-green-500/20 text-green-600 hover:bg-green-500/30 active:bg-green-500/40 rounded-lg font-semibold py-2 px-4 sm:py-2 sm:px-6 transition-colors text-sm sm:text-base"
              >
                Undo DNF
              </button>
            )}
          </>
        )}
      </div>

      {/* Instructions - Different for mobile and desktop */}
      <div className="hidden sm:block bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-sm text-foreground/80">
        <strong className="text-blue-600">Desktop:</strong> Press spacebar to start
        inspection (15 seconds), then again to start the timer. Press spacebar to stop.
      </div>

      <div className="sm:hidden bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-xs text-foreground/80">
        <strong className="text-blue-600">Mobile:</strong> Tap buttons to start
        inspection (15 seconds), then tap to start timer. Tap stop to finish solving.
      </div>
    </div>
  );
}

// Add missing import for Check icon
import { Check } from "lucide-react";

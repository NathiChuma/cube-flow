import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Solve } from "@shared/api";

interface FilterState {
  includeDNF: boolean;
  sortBy: "time-asc" | "time-desc" | "date-asc" | "date-desc";
  startDate: string;
  endDate: string;
}

export function SolvesTable({solves}: {solves: Solve[]}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    includeDNF: true,
    sortBy: "date-desc",
    startDate: "",
    endDate: "",
  });

  const filteredAndSortedSolves = useMemo(() => {
    let result = [...solves];

    if (!filters.includeDNF) {
      result = result.filter((solve) => !solve.dnf);
    }

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      result = result.filter((solve) => new Date(solve.timestamp) >= startDate);
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59);
      result = result.filter((solve) => new Date(solve.timestamp) <= endDate);
    }

    result.sort((a, b) => {
      if (filters.sortBy === "time-asc") {
        const aTime = a.dnf ? Infinity : a.time;
        const bTime = b.dnf ? Infinity : b.time;
        return aTime - bTime;
      } else if (filters.sortBy === "time-desc") {
        const aTime = a.dnf ? -Infinity : a.time;
        const bTime = b.dnf ? -Infinity : b.time;
        return bTime - aTime;
      } else if (filters.sortBy === "date-asc") {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

    return result;
  }, [filters]);

  const dnfCount = filteredAndSortedSolves.filter((s) => s.dnf).length;
  const validSolves = filteredAndSortedSolves.filter((s) => !s.dnf);
  const avgTime =
    validSolves.length > 0
      ? (validSolves.reduce((sum, s) => sum + s.time, 0) / validSolves.length).toFixed(2)
      : "0.00";

  return (
    <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-lg font-bold">All Solves</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span className="hidden sm:inline">Collapse</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span className="hidden sm:inline">Expand</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
        <div>
          <p className="text-xs sm:text-sm text-foreground/60">Total</p>
          <p className="font-bold text-lg sm:text-xl text-foreground">{filteredAndSortedSolves.length}</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-foreground/60">DNF</p>
          <p className="font-bold text-lg sm:text-xl text-orange-500">{dnfCount}</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-foreground/60">Average</p>
          <p className="font-bold text-lg sm:text-xl text-primary font-mono">{avgTime}s</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs sm:text-sm text-foreground/60">Best</p>
          <p className="font-bold text-lg sm:text-xl text-green-600 font-mono">
            {validSolves.length > 0 ? `${Math.min(...validSolves.map((s) => s.time)).toFixed(2)}s` : "—"}
          </p>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Filters */}
          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Date Range Filter */}
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      sortBy: e.target.value as FilterState["sortBy"],
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="time-asc">Fastest First</option>
                  <option value="time-desc">Slowest First</option>
                </select>
              </div>

              {/* DNF Filter */}
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-2">
                  DNF
                </label>
                <button
                  onClick={() =>
                    setFilters({ ...filters, includeDNF: !filters.includeDNF })
                  }
                  className={`w-full px-3 py-2 rounded-lg border transition-colors text-xs font-medium ${
                    !filters.includeDNF
                      ? "bg-primary/20 border-primary/50 text-primary"
                      : "bg-foreground/5 border-border text-foreground/60"
                  }`}
                >
                  {!filters.includeDNF ? "Show DNF" : "Hide DNF"}
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm text-foreground/60 w-10">
                    #
                  </th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm text-foreground/60">
                    Time
                  </th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm text-foreground/60">
                    Date & Time
                  </th>
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm text-foreground/60">
                    Scramble
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedSolves.map((solve, idx) => (
                  <tr key={solve.id} className="border-b border-border/50 hover:bg-foreground/5 transition-colors">
                    <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-foreground/60 w-8 sm:w-10 tabular-nums text-right whitespace-nowrap">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono font-bold text-sm sm:text-base ${
                            solve.dnf ? "text-red-500" : "text-primary"
                          }`}
                        >
                          {solve.dnf ? "DNF" : `${solve.time.toFixed(2)}s`}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-foreground/60 whitespace-nowrap">
                      {new Date(solve.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm font-mono text-foreground/70 break-all">
                      {solve.scramble}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedSolves.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-foreground/60 text-sm">No solves found matching your filters.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

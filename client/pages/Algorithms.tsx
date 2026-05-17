import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { ArrowRight, Copy, Check, Play } from "lucide-react";
import { algorithms } from "@/lib/dummy-data";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Algorithms() {
  const [copied, setCopied] = useState<string | null>(null);
  const [practicing, setPracticing] = useState<string | null>(null);

  const handleCopy = (notation: string, id: string) => {
    navigator.clipboard.writeText(notation);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Beginner") return "bg-green-500/20 text-green-700";
    if (difficulty === "Intermediate") return "bg-yellow-500/20 text-yellow-700";
    if (difficulty === "Easy") return "bg-blue-500/20 text-blue-700";
    return "bg-red-500/20 text-red-700";
  };

  const AlgorithmCard = ({ algo }: { algo: (typeof algorithms.OLL)[0] }) => (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">{algo.name}</h3>
          <p className="text-sm text-foreground/60">{algo.category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(algo.difficulty)}`}>
          {algo.difficulty}
        </span>
      </div>

      <div className="bg-foreground/5 border border-border rounded-lg p-4 mb-4">
        <code className="text-sm sm:text-base font-mono font-bold text-primary break-all">
          {algo.notation}
        </code>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleCopy(algo.notation, algo.id.toString())}
          className="flex-1 flex items-center justify-center gap-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg font-semibold py-2 px-4 transition-colors text-sm"
        >
          {copied === algo.id.toString() ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
        <button
          onClick={() => setPracticing(practicing === algo.id.toString() ? null : algo.id.toString())}
          className="flex-1 flex items-center justify-center gap-2 bg-secondary/20 text-secondary hover:bg-secondary/30 rounded-lg font-semibold py-2 px-4 transition-colors text-sm"
        >
          <Play className="w-4 h-4" />
          Practice
        </button>
      </div>

      {practicing === algo.id.toString() && (
        <div className="mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
          <p className="text-sm text-foreground/80 mb-3">
            <strong>Practice Mode:</strong> Memorize and execute this algorithm repeatedly.
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-secondary text-white hover:bg-secondary/90 rounded-lg py-2 font-semibold text-sm transition-colors">
              I Know It!
            </button>
            <button
              onClick={() => setPracticing(null)}
              className="flex-1 bg-foreground/10 text-foreground hover:bg-foreground/20 rounded-lg py-2 font-semibold text-sm transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 pb-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Algorithms</h1>
          <p className="text-sm sm:text-base text-foreground/60">
            Browse OLL, PLL, and F2L algorithms and copy them to practice.
          </p>
        </div>

        {/* Algorithm Tabs */}
        <Tabs defaultValue="pll" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="oll">OLL (57)</TabsTrigger>
            <TabsTrigger value="pll">PLL (21)</TabsTrigger>
            <TabsTrigger value="f2l">F2L</TabsTrigger>
          </TabsList>

          {/* OLL Tab */}
          <TabsContent value="oll" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.OLL.filter((a) => a.type === "OLL").map((algo) => (
                <AlgorithmCard key={algo.id} algo={algo} />
              ))}
            </div>
          </TabsContent>

          {/* PLL Tab */}
          <TabsContent value="pll" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.PLL.filter((a) => a.type === "PLL").map((algo) => (
                <AlgorithmCard key={algo.id} algo={algo} />
              ))}
            </div>
          </TabsContent>

          {/* F2L Tab */}
          <TabsContent value="f2l" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.F2L.map((algo) => (
                <AlgorithmCard key={algo.id} algo={algo} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}

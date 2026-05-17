import { useState } from "react";
import { Copy, Check, RotateCw } from "lucide-react";

interface ScrambleDisplayProps {
  scramble: string;
  onNewScramble: () => void;
}

export function ScrambleDisplay({
  scramble,
  onNewScramble,
}: ScrambleDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(scramble);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">
          Current Scramble
        </h3>
        <button
          onClick={onNewScramble}
          className="text-foreground/60 hover:text-primary transition-colors"
          title="Generate new scramble"
        >
          <RotateCw className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-foreground/2 border border-border rounded-xl p-6 mb-4 min-h-[100px] flex items-center">
        <code className="text-xl sm:text-2xl font-mono font-bold text-primary break-all">
          {scramble}
        </code>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-2 px-4 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Scramble
            </>
          )}
        </button>
      </div>
    </div>
  );
}

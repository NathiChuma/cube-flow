import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

interface PlaceholderProps {
  page: string;
}

export default function Placeholder({ page }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{page}</h1>

          <p className="text-lg text-foreground/60 mb-8">
            This feature is coming soon! We're building something amazing here
            to help you {page.toLowerCase()}.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
            <p className="text-foreground/80 text-sm mb-4">
              Have a feature request or feedback? Let us know what you'd like to
              see next!
            </p>
            <a
              href="mailto:feedback@cubeflow.app"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Send Feedback
            </a>
          </div>

          <Link
            to="/timer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold py-3 px-8 transition-colors"
          >
            Back to Timer
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

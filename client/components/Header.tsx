import { Link, useLocation, useNavigate } from "react-router-dom";
import { Zap, LogOut, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

interface User {
  id: string;
  name: string;
  email: string;
}

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-base sm:text-xl flex-shrink-0">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="hidden xs:inline">CubeFlow</span>
          </Link>

          {/* Navigation */}
          {user && !isAuthPage && (
            <nav className="hidden sm:flex items-center gap-6 md:gap-8">
              <Link
                to="/timer"
                className="text-xs sm:text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                Timer
              </Link>
              <Link
                to="/algorithms"
                className="text-xs sm:text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                Algorithms
              </Link>
              <Link
                to="/stats"
                className="text-xs sm:text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                Stats
              </Link>
            </nav>
          )}

          {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-foreground/60">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-foreground/10 text-foreground hover:bg-foreground/20 rounded-lg transition-colors px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-foreground/80 hover:text-foreground transition-colors px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold transition-colors px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

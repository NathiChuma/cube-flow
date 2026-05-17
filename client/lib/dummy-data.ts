// Dummy data for the Rubik's Cube Trainer app

export const globalLeaderboard = [
  { rank: 1, name: "Nathi Chen", time: "17.21", pb: "16.89", ao5: "17.95", ao12: "18.34", country: "🇺🇸" },
  { rank: 2, name: "Liam O'Brien", time: "19.04", pb: "18.42", ao5: "19.34", ao12: "19.67", country: "🇨🇦" },
  { rank: 3, name: "Kayla Rodriguez", time: "21.87", pb: "21.45", ao5: "22.11", ao12: "22.56", country: "🇲🇽" },
  { rank: 4, name: "Marcus Johnson", time: "23.56", pb: "22.98", ao5: "23.89", ao12: "24.12", country: "🇬🇧" },
  { rank: 5, name: "Sarah Kim", time: "25.32", pb: "24.78", ao5: "25.67", ao12: "26.01", country: "🇰🇷" },
  { rank: 6, name: "Alex Petrov", time: "26.45", pb: "25.89", ao5: "26.78", ao12: "27.23", country: "🇷🇺" },
  { rank: 7, name: "Emma Thompson", time: "27.12", pb: "26.45", ao5: "27.56", ao12: "28.01", country: "🇦🇺" },
  { rank: 8, name: "Diego Santos", time: "28.34", pb: "27.89", ao5: "28.67", ao12: "29.12", country: "🇧🇷" },
];

export const campusLeaderboard = [
  { rank: 1, name: "You", time: "—", pb: "—", ao5: "—", ao12: "—", isYou: true, solves: 0 },
  { rank: 2, name: "Team Mate 1", time: "18.50", pb: "17.89", ao5: "18.76", ao12: "19.23" },
  { rank: 3, name: "Team Mate 2", time: "20.12", pb: "19.45", ao5: "20.34", ao12: "20.89" },
  { rank: 4, name: "Team Mate 3", time: "22.67", pb: "21.98", ao5: "23.01", ao12: "23.56" },
  { rank: 5, name: "Team Mate 4", time: "24.89", pb: "24.12", ao5: "25.34", ao12: "25.78" },
];

export const algorithms = {
  OLL: [
    {
      id: 1,
      name: "T-Perm",
      notation: "R U R' U' R' F R2 U' R' U' R U R' F'",
      type: "PLL",
      difficulty: "Intermediate",
      category: "Corner Swap",
    },
    {
      id: 2,
      name: "U-Perm",
      notation: "M2' U M U2 M' U M2'",
      type: "PLL",
      difficulty: "Easy",
      category: "Edge Swap",
    },
    {
      id: 3,
      name: "OLL #1",
      notation: "M' U M U2 M' U M",
      type: "OLL",
      difficulty: "Beginner",
      category: "Corners First",
    },
    {
      id: 4,
      name: "OLL #21",
      notation: "R U2 R' U' R U' R'",
      type: "OLL",
      difficulty: "Intermediate",
      category: "Edges",
    },
    {
      id: 5,
      name: "F2L Pair",
      notation: "R U R' U'",
      type: "F2L",
      difficulty: "Beginner",
      category: "Basic Pair",
    },
  ],
  PLL: [
    {
      id: 6,
      name: "Aa-Perm",
      notation: "x R' U R' D2 R U' R' D2 R2",
      type: "PLL",
      difficulty: "Intermediate",
      category: "Corner Cycles",
    },
    {
      id: 7,
      name: "Ab-Perm",
      notation: "x R U' R D2 R' U R D2 R2",
      type: "PLL",
      difficulty: "Intermediate",
      category: "Corner Cycles",
    },
    {
      id: 8,
      name: "Y-Perm",
      notation: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
      type: "PLL",
      difficulty: "Hard",
      category: "Corner Swap",
    },
  ],
  F2L: [
    {
      id: 9,
      name: "Basic F2L",
      notation: "R U R'",
      type: "F2L",
      difficulty: "Beginner",
      category: "Insert",
    },
    {
      id: 10,
      name: "F2L Case 3",
      notation: "U R U' R'",
      type: "F2L",
      difficulty: "Beginner",
      category: "Slot Setup",
    },
  ],
};

export const statsData = {
  sessions: [
    { date: "2024-01-15", solves: 12, bestTime: 22.34, avgTime: 26.78, ao5: 25.45 },
    { date: "2024-01-16", solves: 18, bestTime: 21.89, avgTime: 25.67, ao5: 24.12 },
    { date: "2024-01-17", solves: 25, bestTime: 20.45, avgTime: 24.89, ao5: 23.78 },
    { date: "2024-01-18", solves: 20, bestTime: 19.78, avgTime: 23.45, ao5: 22.89 },
    { date: "2024-01-19", solves: 30, bestTime: 18.56, avgTime: 22.12, ao5: 21.34 },
    { date: "2024-01-20", solves: 28, bestTime: 17.89, avgTime: 21.67, ao5: 20.78 },
  ],
  timeTrend: [
    { time: "Mon", value: 26.5 },
    { time: "Tue", value: 25.2 },
    { time: "Wed", value: 24.8 },
    { time: "Thu", value: 23.1 },
    { time: "Fri", value: 21.9 },
    { time: "Sat", value: 20.4 },
    { time: "Sun", value: 19.8 },
  ],
  consistency: {
    excellent: 45,
    good: 35,
    fair: 15,
    poor: 5,
  },
};

export const userStats = {
  totalSolves: 234,
  bestTime: "17.89",
  worstTime: "45.23",
  avgTime: "23.45",
  ao5: "19.34",
  ao12: "20.78",
  ao50: "21.45",
  ao100: "22.12",
  dnfCount: 3,
  dnfRate: "1.3%",
  totalTime: "1h 32m",
  longestStreak: 45,
  currentStreak: 12,
};

export const practiceHistory = [
  { date: "2024-01-20", type: "Timed Session", duration: "45min", solves: 28, best: "17.89", avg: "21.67" },
  { date: "2024-01-19", type: "Algorithm Practice", duration: "30min", algorithm: "T-Perm", reps: 50 },
  { date: "2024-01-18", type: "Timed Session", duration: "60min", solves: 30, best: "18.56", avg: "22.12" },
  { date: "2024-01-17", type: "F2L Drills", duration: "25min", pairs: 100, avg: "8.5s" },
  { date: "2024-01-16", type: "Timed Session", duration: "50min", solves: 25, best: "20.45", avg: "24.89" },
];

export const achievements = [
  { id: 1, title: "First Solve", description: "Complete your first solve", icon: "🎯", unlocked: true, date: "2024-01-01" },
  { id: 2, title: "Speed Racer", description: "Achieve a sub-20 time", icon: "⚡", unlocked: true, date: "2024-01-18" },
  { id: 3, title: "Century Club", description: "Complete 100 solves", icon: "💯", unlocked: true, date: "2024-01-19" },
  { id: 4, title: "Consistency King", description: "Achieve Ao12 within 2 seconds of best time", icon: "👑", unlocked: false },
  { id: 5, title: "Algorithm Master", description: "Learn 10 algorithms", icon: "🧠", unlocked: false },
  { id: 6, title: "Leaderboard Legend", description: "Reach top 10 global rankings", icon: "🏆", unlocked: false },
];

export const dailyChallenge = {
  date: "2024-01-21",
  title: "Speed Demon",
  description: "Complete 20 solves under 25 seconds",
  target: 20,
  current: 12,
  reward: "500 XP",
  difficulty: "Medium",
};

export const monthlyCompetition = {
  name: "January Speed Cube Battle",
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  participants: 342,
  yourRank: 127,
  yourTime: "19.34",
  leaderLimit: 5,
  prizes: ["$100", "$50", "$25", "Merit Badge", "Merit Badge"],
};

export const notifications = [
  { id: 1, type: "achievement", title: "New Achievement Unlocked!", message: "You unlocked 'Speed Racer'!", timestamp: "2 hours ago" },
  { id: 2, type: "challenge", title: "Daily Challenge Available", message: "Complete 20 solves to earn 500 XP", timestamp: "12 hours ago" },
  { id: 3, type: "milestone", title: "Century Club!", message: "Congratulations! You've reached 100 solves", timestamp: "1 day ago" },
  { id: 4, type: "competition", title: "Competition Started", message: "Join 'January Speed Cube Battle' and compete", timestamp: "2 days ago" },
];

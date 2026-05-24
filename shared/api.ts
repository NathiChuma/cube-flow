export interface PlatformStats {
  activeCubers: number;
  solvesTracked: number;
  averageSolveTime: number;
  totalDNFs: number;
  totalCubeTime: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  country: string;
}
/**
 * Solve data structure for tracking speedcubing solves
 */
export interface Solve {
  id: string;
  userId: string;
  time: number; // milliseconds
  scramble: string;
  timestamp: string; // ISO string
  dnf: boolean;
}

/**
 * Response for creating a new solve
 */
export interface CreateSolveRequest {
  userId: string;
  time: number; // milliseconds
  scramble: string;
  timestamp: string; // ISO string
  dnf: boolean;
}

/**
 * Response for getting solves
 */
export interface GetSolvesResponse {
  solves: Solve[];
  count: number;
}

export interface UserStats {
  sessions: {
    date: string;
    solves: number;
    bestTime: number;
    avgTime: number;
    ao5: number;
  }[];
  timeTrend: {
    time: string;
    value: number;
  }[];
  consistency: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
  };
  userStats: {
    totalSolves: number;
    bestTime: string;
    worstTime: string;
    avgTime: string;
    ao5: string;
    ao12: string;
    ao50: string;
    ao100: string;
    dnfCount: number;
    dnfRate: string;
    totalTime: string;
    longestStreak: number;
    currentStreak: number;
  };
  achievements: {
    id: number;
    title: string;
    description: string;
    icon: string; // Emoji or icon name
    unlocked: boolean;
    date: string; // Date unlocked
  }[];
}

interface AIAnalysis {
  insights: string[];
  recommendations: string[];
  score: number;
  scoreLabel: string;
}

export var platformStatsCache: PlatformStats | null = null;

//const API_BASE = "http://localhost:3000/";
const API_BASE = "https://cube-flow-backend.vercel.app/";

export async function getPlatformStats(): Promise<void> {
  const response = await fetch(`${API_BASE}stats/getPlatformStats`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error({ error: data.error || "Failed to fetch platform stats" });
  }

  platformStatsCache = data as PlatformStats;
}

export async function signIn(email: string, password: string): Promise<User | {error: string}> {
  const response = await fetch(`${API_BASE}auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
 
  const data = await response.json();

  if (data.error) {
    return { error: data.error };
  }

  return data.user as Promise<User | {error: string}>;
}

export async function signUp(username: string, email: string, password: string, country?: string): Promise<User | {error: string}> {
  const response = await fetch(`${API_BASE}auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, country }),
  });

  const data = await response.json();

  if (data.error) {
    return { error: data.error };
  }

  return data.user as Promise<User | {error: string}>;
}

export async function sendResetPasswordEmail(email: string): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`${API_BASE}auth/forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (data.error) {
    return { success: false, error: data.error };
  }

  return { success: true };
}

export async function resetPassword(email: string, code: string, password: string): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`${API_BASE}auth/resetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, password }),
  });

  const data = await response.json();

  if (data.error) {
    return { success: false, error: data.error };
  }

  return { success: true };
}

export async function addSolve(solveData: CreateSolveRequest): Promise<Solve | {error: string}> {
  const response = await fetch(`${API_BASE}solves/addSolve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(solveData),
  });

  const data = await response.json();
  if (data.error) {
    return { error: data.error };
  }

  const solveResponse: Solve = {
    id: data.id,
    ...solveData
  };

  return solveResponse;
}

export async function getUserSolves(userId: string): Promise<GetSolvesResponse> {
  const response = await fetch(`${API_BASE}solves/getUserSolves/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (data.error) {
    return { solves: [], count: 0 };
  }

  return {solves: data, count: data.length};
}

export async function getAllSolves(): Promise<GetSolvesResponse> {
  const response = await fetch(`${API_BASE}solves/getAllSolves`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (data.error) {
    return { solves: [], count: 0 };
  }

  return data as GetSolvesResponse;
}

export async function deleteSolve(solveId: string): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`${API_BASE}solves/deleteSolve/${solveId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (data.error) {
    return { success: false, error: data.error };
  }

  return { success: true };
}

export async function getUserStats(userId: string): Promise<UserStats | { error: string }> {
  const response = await fetch(`${API_BASE}stats/getUserStats/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: data.error || "Failed to fetch user stats" };
  }

  return data;
}

export async function getUserAnalysis(userStats: UserStats): Promise<AIAnalysis> {

  var aiAnalysis: AIAnalysis | null = null;

  await fetch(`${API_BASE}stats/getUserAnalysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userStats }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      console.error("AI analysis error:", data.error);
    } else {
      aiAnalysis = data as AIAnalysis;
    }
  })
  .catch((err) => {
    console.error("Failed to get AI analysis:", err);
  });

  if (!aiAnalysis) {
    return {
      insights: ["Unable to generate analysis at this time."],
      recommendations: [],
      score: 0,
      scoreLabel: "N/A",
    };
  }

  return aiAnalysis;
}
import { error } from "console";

export interface User {
  id: string;
  username: string;
  email: string;
  country?: string;
}
/**
 * Solve data structure for tracking speedcubing solves
 */
export interface Solve {
  id: string;
  userId?: string;
  time: number; // milliseconds
  scramble: string;
  timestamp: string; // ISO string
  dnf?: boolean;
}

/**
 * Response for creating a new solve
 */
export interface CreateSolveRequest {
  time: number;
  scramble: string;
  dnf?: boolean;
}

/**
 * Response for getting solves
 */
export interface GetSolvesResponse {
  solves: Solve[];
  count: number;
}

/**
 * Response for creating a solve
 */
export interface CreateSolveResponse {
  solve: Solve;
  message: string;
}

const API_BASE = "http://localhost:3000/";

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

export async function createSolve(solveData: CreateSolveRequest): Promise<CreateSolveResponse> {
  const response = await fetch(`${API_BASE}solves`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(solveData),
  });
  return response.json();
}

export async function getSolves(): Promise<GetSolvesResponse> {
  const response = await fetch(`${API_BASE}solves`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}
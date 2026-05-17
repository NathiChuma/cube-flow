/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
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

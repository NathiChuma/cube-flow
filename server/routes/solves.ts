import { RequestHandler } from "express";
import {
  CreateSolveRequest,
  CreateSolveResponse,
  GetSolvesResponse,
  Solve,
} from "@shared/api";

// In-memory storage for MVP (replace with database later)
let solves: Solve[] = [];

/**
 * GET /api/solves
 * Retrieve all solves (in a real app, filter by userId)
 */
export const getSolves: RequestHandler = (_req, res) => {
  const response: GetSolvesResponse = {
    solves,
    count: solves.length,
  };
  res.json(response);
};

/**
 * POST /api/solves
 * Create a new solve
 */
export const createSolve: RequestHandler = (req, res) => {
  try {
    const { time, scramble, dnf } = req.body as CreateSolveRequest;

    if (!time || !scramble) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newSolve: Solve = {
      id: Date.now().toString(),
      time,
      scramble,
      timestamp: new Date().toISOString(),
      dnf: dnf || false,
    };

    solves.unshift(newSolve);

    // Keep only recent solves in memory (limit to 1000)
    if (solves.length > 1000) {
      solves = solves.slice(0, 1000);
    }

    const response: CreateSolveResponse = {
      solve: newSolve,
      message: "Solve created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating solve:", error);
    res.status(500).json({ error: "Failed to create solve" });
  }
};

/**
 * DELETE /api/solves/:id
 * Delete a specific solve
 */
export const deleteSolve: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const initialLength = solves.length;
    solves = solves.filter((s) => s.id !== id);

    if (solves.length === initialLength) {
      res.status(404).json({ error: "Solve not found" });
      return;
    }

    res.json({ message: "Solve deleted successfully" });
  } catch (error) {
    console.error("Error deleting solve:", error);
    res.status(500).json({ error: "Failed to delete solve" });
  }
};

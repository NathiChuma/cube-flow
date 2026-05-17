import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getSolves, createSolve, deleteSolve } from "./routes/solves";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Solve tracking API routes
  app.get("/api/solves", getSolves);
  app.post("/api/solves", createSolve);
  app.delete("/api/solves/:id", deleteSolve);

  return app;
}

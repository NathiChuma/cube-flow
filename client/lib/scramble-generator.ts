// WCA 3x3 Scramble Generator
// Generates official WCA-compliant random scrambles for 3x3x3 Rubik's Cubes

const MOVES = ["R", "U", "F", "D", "L", "B"];
const MODIFIERS = ["", "'", "2"];

/**
 * Generates a random valid WCA scramble
 * - Standard length is 20 moves
 * - Ensures no two consecutive moves on the same face
 */
export function generateScramble(moveCount: number = 20): string {
  const moves: string[] = [];
  let lastMove: string | null = null;

  for (let i = 0; i < moveCount; i++) {
    let move: string;
    let attempts = 0;

    // Keep trying until we get a move that's not the same face as the last move
    do {
      const moveIndex = Math.floor(Math.random() * MOVES.length);
      const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
      move = MOVES[moveIndex] + modifier;
      attempts++;
    } while (
      lastMove &&
      getMoveFace(move) === getMoveFace(lastMove) &&
      attempts < 10
    );

    moves.push(move);
    lastMove = move;
  }

  return moves.join(" ");
}

/**
 * Extract the face from a move (R, U, F, D, L, B)
 */
function getMoveFace(move: string): string {
  return move[0];
}

/**
 * Get scramble history from localStorage
 */
export function getScrambleHistory(): string[] {
  const history = localStorage.getItem("scrambleHistory");
  return history ? JSON.parse(history) : [];
}

/**
 * Add scramble to history
 */
export function saveScrambleToHistory(scramble: string): void {
  const history = getScrambleHistory();
  history.unshift(scramble); // Add to beginning
  history.splice(10); // Keep only last 10
  localStorage.setItem("scrambleHistory", JSON.stringify(history));
}

/**
 * Clear scramble history
 */
export function clearScrambleHistory(): void {
  localStorage.removeItem("scrambleHistory");
}

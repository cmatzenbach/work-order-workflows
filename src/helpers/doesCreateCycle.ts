import { type Edge } from "@xyflow/react";

export const doesCreateCycle = (
  sourceId: string,
  targetId: string,
  edges: Edge[],
): boolean => {
  const adjacentEdges: Record<string, string[]> = {};

  console.log(edges);
  edges.forEach(({ source, target }) => {
    // ensure only one source entry is added to adjacentEdges
    if (!adjacentEdges[source]) adjacentEdges[source] = [];
    adjacentEdges[source].push(target);
  });

  // Perform a Depth-First Search (DFS) to check if sourceId is reachable from targetId
  const visited = new Set<string>();
  const stack = [targetId]; // Start from the targetId to see if it leads to sourceId

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || visited.has(current)) continue;

    if (current === sourceId) {
      return true; // Cycle detected
    }

    visited.add(current);
    const neighbors = adjacentEdges[current] || [];
    stack.push(...neighbors);
  }

  return false; // No cycle detected
};

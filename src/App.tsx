import {
  addEdge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  getOutgoers,
  type Edge,
  type OnConnect,
  type IsValidConnection,
  Background,
  Panel,
  MarkerType,
} from "@xyflow/react";
import { useCallback } from "react";
import { WorkflowNode } from "./WorkflowNode";
import { doesCreateCycle } from "./helpers/doesCreateCycle";

let nodeId = 1;
function makeNodeId() {
  return (nodeId++).toString();
}

const nodeTypes = {
  WorkflowNode: WorkflowNode,
};

const initialNodes: WorkflowNode[] = [
  {
    id: makeNodeId(),
    data: { label: "Node 1", isCompleted: false },
    position: { x: 0, y: 0 },
    type: "WorkflowNode",
  },
  {
    id: makeNodeId(),
    data: { label: "Node 2", isCompleted: false },
    position: { x: 0, y: 100 },
    type: "WorkflowNode",
  },
  {
    id: makeNodeId(),
    data: { label: "Node 3", isCompleted: false },
    position: { x: 250, y: 50 },
    type: "WorkflowNode",
  },
] as const;

const initialEdges: Edge[] = [
  {
    id: "e1-3",
    source: initialNodes[0].id,
    target: initialNodes[2].id,
  },
  {
    id: "e2-3",
    source: initialNodes[1].id,
    target: initialNodes[2].id,
  },
] as const;

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { getNodes, getEdges } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((edges) => addEdge(params, edges));
    },
    [setEdges],
  );

  const isValidConnection = useCallback(
    (connection) => {
      // get current nodes and edges
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find((node) => node.id === connection.target);

      const hasCycle = (node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);
        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target?.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges],
  );

  const onAddNode = useCallback(() => {
    const id = makeNodeId();

    // Position the new node below and to the right of the last node.
    const lastNode = nodes.at(-1);
    const x = lastNode ? lastNode.position.x + 50 : 0;
    const y = lastNode ? lastNode.position.y + 50 : 0;

    const newNode: WorkflowNode = {
      id,
      data: { label: `Node ${id}`, isCompleted: false },
      position: { x, y },
      type: "WorkflowNode",
    };
    setNodes((nodes) => [...nodes, newNode]);
  }, [nodes, setNodes]);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            nodes,
            edges,
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        defaultViewport={{ zoom: 1, x: 50, y: 100 }}
        className="col-start-1 row-start-1"
        defaultEdgeOptions={{
          markerEnd: {
            type: MarkerType.ArrowClosed,
            height: 25,
            width: 25,
          },
        }}
      >
        <Background />
        <Panel position="top-left">
          <div className="flex gap-2">
            <button onClick={onAddNode} className="button-primary">
              Add Node
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;

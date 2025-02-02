import { memo, useCallback, useState } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
  type Edge,
} from "@xyflow/react";
import clsx from "clsx";
import { EditIcon } from "./icons/edit-icon";
import { EditInput } from "./general/EditInput";

export type WorkflowNode = Node<
  {
    label: string;
    isCompleted: boolean;
    edges: Edge[];
    nodes: WorkflowNode[];
  },
  "WorkflowNode"
>;

export const WorkflowNode = memo(
  ({ id, data, selected }: NodeProps<WorkflowNode>) => {
    const { updateNodeData } = useReactFlow<WorkflowNode>();
    const { isCompleted, edges, nodes } = data;

    // get all source nodes
    const sourceIds = edges
      .filter((edge) => edge.target === id)
      .map((edge) => edge.source);
    // ensure all source nodes were completed
    const isAvailable = sourceIds.every((sourceId) => {
      const sourceNode = nodes.find((node) => node.id === sourceId);
      return sourceNode?.data.isCompleted;
    });

    // label controls
    const [label, setLabel] = useState<string>(data.label);
    const [editing, setEditing] = useState<boolean>(false);

    const handleComplete = useCallback(() => {
      if (!isCompleted && isAvailable) {
        updateNodeData(id, { isCompleted: true });
      }
    }, [isCompleted, isAvailable, id, updateNodeData]);

    return (
      <div
        className={clsx(
          `px-6 py-3 flex items-center gap-4`,
          `rounded outline outline-zinc-500`,
          selected ? `outline-2` : `outline-1`,
          isCompleted
            ? `bg-emerald-100`
            : isAvailable
              ? `bg-amber-100`
              : `bg-white`,
        )}
      >
        <Handle
          type="target"
          position={Position.Left}
          className="size-3 bg-zinc-500 border-2 border-white"
        />
        <div className="shrink-0 flex">
          {editing ? (
            <EditInput
              savedValue={label}
              onSubmitValue={setLabel}
              cancelEditing={() => setEditing(false)}
              editing={editing}
            />
          ) : (
            <div className="text-lg shrink-0">{label}</div>
          )}
          <EditIcon
            onClick={() => setEditing(true)}
            className="pl-1 pt-1 fill-zinc-400 hover:fill-cyan-700 cursor-pointer"
          />
        </div>
        {isCompleted ? (
          <input type="checkbox" checked disabled className="size-6" />
        ) : isAvailable ? (
          <input
            type="checkbox"
            className="checkbox"
            onClick={handleComplete}
          />
        ) : (
          <input type="checkbox" disabled className="checkbox" />
        )}
        <Handle
          type="source"
          position={Position.Right}
          className="size-3 bg-zinc-500 border-2 border-white"
        />
      </div>
    );
  },
);

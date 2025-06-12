import {
  addEdge,
  Background,
  ReactFlow,
  reconnectEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React, { useCallback, useRef } from "react";
import AnimatedEdge from "../../components/AnimatedEdge/AnimatedEdge";
import TestNode from "../../components/TestNode/TestNode";
import ResourceNode from "../../components/ResourceNode/ResourceNode";
import { lumberMill } from "../../nodes/lumberMill";
import { waterPurifier } from "../../nodes/waterPurifier";
import { water } from "../../nodes/water";
import { wood } from "../../nodes/wood";
import { wheat } from "../../nodes/wheat";
import { mill } from "../../nodes/mill";
import { bakery } from "../../nodes/bakery";

const nodeTypes = {
  testNode: TestNode,
  resource: ResourceNode,
};

const edgeTypes = {
  animatedSvg: AnimatedEdge,
};

export default function Main() {
  const edgeReconnectSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    lumberMill,
    waterPurifier,
    wood,
    water,
    wheat,
    mill,
    bakery,
  ]);

  const handleAnimationRepeat = (targetId, type) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === targetId
          ? {
              ...node,
              data: { ...node.data, [type]: (node.data[type] || 0) + 1 },
            }
          : node
      )
    );
  };

  const handleCreate = (targetId, need) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === targetId
          ? {
              ...node,
              data: {
                ...node.data,
                [need.type]: (node.data[need.type] || 0) - need.count,
              },
            }
          : node
      )
    );
  };

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => {
      params.type = "animatedSvg";
      params.data = { handleAnimationRepeat, handleCreate };
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onReconnectEnd = useCallback(
    (_, edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeReconnectSuccessful.current = true;
    },
    [setEdges]
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const isValidConnection = (connection) => {
    const { source, target } = connection;

    const sourceData = nodes.find((n) => n.id === source);
    const targetData = nodes.find((n) => n.id === target);

    const need = targetData.data.need;

    return need.find((el) => el.type === sourceData.data.type);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        //   snapToGrid
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        isValidConnection={isValidConnection}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        fitView
        nodeTypes={nodeTypes}
        attributionPosition="top-right"
        className="validationflow"
      />
      {/* <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === "wood") return "#0041d0";
          if (n.type === "testNode") return "#0041d0";
          if (n.type === "water") return "#ff0072";
        }}
        nodeColor={(n) => {
          if (n.type === "testNode") return "#0041d0";
          return "#fff";
        }}
      /> */}
      <Background variant="dots" gap={12} size={1} />
    </div>
  );
}

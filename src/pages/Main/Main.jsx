import {
  addEdge,
  Background,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  reconnectEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React, { useCallback, useRef } from "react";
import AnimatedEdge from "../../components/AnimatedEdge/AnimatedEdge";
import TestNode from "../../components/TestNode/TestNode";
import ResourceNode from "../../components/ResourceNode/ResourceNode";

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
    {
      id: crypto.randomUUID(),
      position: { x: 200, y: 0 },
      data: {
        label: "pred",
        need: [
          { count: 2, type: "wood" },
          { count: 1, type: "clear water" },
        ],
        text: "Lumber Mill",
        desc: "Turns wood into planks",
        type: "doski",
        handles: [
          {
            type: "target",
            position: Position.Left,
            id: crypto.randomUUID(),
            connectionCount: 1,
            style: { top: "20%" },
          },
          {
            type: "target",
            position: Position.Left,
            id: crypto.randomUUID(),
            connectionCount: 1,
            style: { top: "80%" },
          },
          {
            type: "source",
            position: Position.Right,
            id: crypto.randomUUID(),
            connectionCount: 1,
          },
        ],
      },
      type: "testNode",
    },
    {
      id: crypto.randomUUID(),
      position: { x: 0, y: 200 },
      data: {
        label: "pred",
        need: [{ count: 2, type: "water" }],
        text: "Water Purifier",
        desc: "Filters water for technical purposes",
        type: "clear water",
        handles: [
          {
            type: "target",
            position: Position.Left,
            id: crypto.randomUUID(),
            connectionCount: 1,
          },
          {
            type: "source",
            position: Position.Right,
            id: crypto.randomUUID(),
            connectionCount: 1,
          },
        ],
      },
      type: "testNode",
    },
    {
      id: crypto.randomUUID(),
      position: { x: -200, y: 0 },
      data: {
        label: "pred",
        need: [{ count: 2, type: "water" }],
        text: "sklad",
        desc: "Filters water for technical purposes",
        handles: [
          {
            type: "target",
            position: Position.Top,
            id: crypto.randomUUID(),
            connectionCount: 100,
          },
        ],
      },
      type: "testNode",
    },
    {
      id: "3",
      position: { x: 0, y: 0 },
      data: {
        color: "#a52a2a",
        borderColor: "darkred",
        name: "Wood",
        type: "wood",
        connectionCount: 1,
      },
      type: "resource",
    },
    {
      id: "4",
      position: { x: 0, y: -200 },
      data: {
        color: "#87cefa",
        borderColor: "lightslategray",
        name: "Water",
        type: "water",
        connectionCount: 2,
      },
      type: "resource",
    },
  ]);

  const handleAnimationRepeat = (targetId, type) => {
    // console.log(type);

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
    console.log(need);

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

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "e1-2", source: "1", target: "2" },
  ]);

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
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        fitView
        nodeTypes={nodeTypes}
        attributionPosition="top-right"
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

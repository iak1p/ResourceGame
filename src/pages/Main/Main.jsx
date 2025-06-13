import {
  addEdge,
  Background,
  MiniMap,
  ReactFlow,
  reconnectEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import SkladNode from "../../components/SkladNode/SkladNode";
import { sklad } from "../../nodes/sklad";
import { TYPES } from "../../nodes/resourceTypes";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDnD } from "../../components/DnDContext/DnDContext";
import Node from "../../nodes/NodeClass";
import Resorce from "../../nodes/ResourceClass";

const nodeTypes = {
  testNode: TestNode,
  resource: ResourceNode,
  sklad: SkladNode,
};

const edgeTypes = {
  animatedSvg: AnimatedEdge,
};

export default function Main() {
  const edgeReconnectSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    JSON.parse(localStorage.getItem("nodes")) || [sklad]
  );

  const [money, setMoney] = useState(0);
  const [type, setType] = useDnD();
  const { screenToFlowPosition } = useReactFlow();

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

  const hadleMoneyChange = (amount) => {
    setMoney((prevMoney) => prevMoney + amount);
  };

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    JSON.parse(localStorage.getItem("edges")) || []
  );

  const onConnect = useCallback(
    (params) => {
      params.type = "animatedSvg";
      params.data = { handleAnimationRepeat, handleCreate, hadleMoneyChange };
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

  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem("edges", JSON.stringify(edges));
  }, [edges]);

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          handleAnimationRepeat,
          handleCreate,
          hadleMoneyChange,
        },
      }))
    );
  }, []);

  const isValidConnection = (connection) => {
    const { source, target } = connection;

    const sourceData = nodes.find((n) => n.id === source);
    const targetData = nodes.find((n) => n.id === target);

    const need = targetData.data.need;

    console.log("targetData", targetData);
    console.log("sourceData", sourceData);

    // return sourceData.data.handles.find(
    //   (el) => el.type === "target" && el.rs === targetData.data.type
    // );
    // return sourceData.data.type !== targetData.data.type;

    return (
      need.find((el) => el.type === sourceData.data.type) ||
      need[0].type === TYPES.ALL
    );
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      let newNode = null;

      if (!type) {
        return;
      }

      // if (money < 10) {
      //   return;
      // }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (type === "bakery") {
        newNode = new Node(position, bakery.data);
      }
      if (type === "wheat") {
        newNode = new Resorce(position, wheat.data);
      }
      if (type === "water") {
        newNode = new Resorce(position, water.data);
      }
      if (type === "wood") {
        newNode = new Resorce(position, wood.data);
      }
      if (type === "mill") {
        newNode = new Node(position, mill.data);
      }
      if (type === "lumberMill") {
        newNode = new Node(position, lumberMill.data);
      }
      if (type === "waterPurifier") {
        newNode = new Node(position, waterPurifier.data);
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <p style={{ position: "absolute" }} className="money">
        MONEY: {money}
      </p>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        snapToGrid
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
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onBeforeDelete={({ nodes }) => {
          console.log(nodes);

          const hasSklad = nodes.find(
            (node) => node.data.label === TYPES.SKLAD
          );
          if (hasSklad) {
            alert("You cannot delete the sklad node!");
            return false;
          }
          return true;
        }}
      />
      <MiniMap
        nodeStrokeColor={(n) => {
          console.log(n);

          if (n.type === "wood") return "#0041d0";
          if (n.data.type === TYPES.WOOD) return "#a52a2a";
          if (n.data.label === TYPES.SKLAD) return "#5F506B";
          if (n.type === "water") return "#ff0072";
        }}
        nodeColor={(n) => {
          if (n.type === "testNode") return "#0041d0";
          if (n.data.type === TYPES.WOOD) return "#a52a2a";
          if (n.data.label === TYPES.SKLAD) return "#5F506B";
          return "#fff";
        }}
        position="bottom-left"
        bgColor="#eee"
        maskColor="gray"
      />
      <Background variant="dots" gap={12} size={1} />
      <Sidebar money={money} />
    </div>
  );
}

import { Handle, Position } from "@xyflow/react";
import React from "react";

import "./ResourceNode.css";
import CustomHandle from "../CustomHandle/CustomHandle";

export default function ResourceNode(props) {
  const { color, name, connectionCount, borderColor } = props.data;

  return (
    <div
      className="wood-node"
      style={{
        border: `1px solid ${borderColor}`,
        backgroundColor: `${color}`,
      }}
    >
      <p>{name}</p>
      <CustomHandle
        type="source"
        position={Position.Right}
        connectionCount={connectionCount}
        id="s-1"
      />
    </div>
  );
}

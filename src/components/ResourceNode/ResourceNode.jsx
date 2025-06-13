import { Position } from "@xyflow/react";

import "./ResourceNode.css";
import CustomHandle from "../CustomHandle/CustomHandle";

export default function ResourceNode(props) {
  const { color, name, connectionCount, borderColor, rs } = props.data;

  return (
    <div className="resource-node" style={{ borderColor: color }}>
      <div
        className="resource-node_header"
        style={{
          backgroundColor: `${color}`,
        }}
      >
        <p
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {name}
        </p>
      </div>
      <div className="resource-node_body"></div>

      <CustomHandle
        type="source"
        position={Position.Right}
        connectionCount={connectionCount}
        id="s-1"
        rs={rs}
        style={{ top: "60%"}}
        color={color}
      />
    </div>
  );
}

import React from "react";
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import "./CustomHandle.css";

const CustomHandle = (props) => {
  const connections = useNodeConnections({
    handleType: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={
        connections.length < props.connectionCount ||
        connections?.every(
          (c) => c.targetHandle !== props.id && c.sourceHandle !== props.id
        )
      }
    >
      <p
        className="handle-text"
        style={{
          ...(props.position === "left"
            ? {
                top: "-60%",
                left: "150%",
              }
            : {
                top: "-60%",
                right: "150%",
              }),
          pointerEvents: "none",
          userSelect: "none",
          color: props.color || "black",
          position: "absolute",
          width: "max-content",
          fontSize: "10px",
        }}
      >
        {props.rs} {props.rscount ? `(${props.rscount})` : ""}
      </p>
    </Handle>
  );
};

export default CustomHandle;

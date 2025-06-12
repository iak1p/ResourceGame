import React from "react";
import { Handle, useNodeConnections } from "@xyflow/react";

const CustomHandle = (props) => {
  const connections = useNodeConnections({
    handleType: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={
        connections.length < props.connectionCount ||
        connections?.every((c) => c.targetHandle != props.id && c.sourceHandle != props.id)
      }
    />
  );
};

export default CustomHandle;

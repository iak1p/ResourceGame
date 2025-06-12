import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import CustomHandle from "../CustomHandle/CustomHandle";

const CustomNode = ({ data, isConnectable }) => {
  console.log("CustomNode", data);

  return (
    <div>
      <CustomHandle
        type="target"
        position={Position.Left}
        connectionCount={1}
        id="t-1"
        style={{ top: "20%" }}
      />
      <CustomHandle
        type="target"
        position={Position.Left}
        connectionCount={1}
        id="t-2"
        style={{ top: "80%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="s-1"
        // style={{ top: 5 }}
        isConnectable={isConnectable}
      />
      <div>{"← Only one edge allowed"}</div>
      <p>wood: {data.wood}</p>
      {console.log(data)}
    </div>
  );
};

export default memo(CustomNode);

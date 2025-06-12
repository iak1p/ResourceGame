import React, { memo } from "react";
import CustomHandle from "../CustomHandle/CustomHandle";
import { Handle, Position } from "@xyflow/react";
import "./TestNode.css";

function TestNode({ data, isConnectable }) {
  const recours = ["water", "clear water", "wood", "doski"];
  return (
    <div className="test-node">
      <div className="test-node_header">
        <p>{data.text}</p>
        <p className="desc">{data.desc}</p>
      </div>
      <div className="test-node_body">
        <p>In storage:</p>
        {Object.entries(data).map(([key, value]) =>
          recours.includes(key) ? (
            <div key={key}>
              {key}: {String(value)}
            </div>
          ) : null
        )}
      </div>
      {data.handles.map((el) => {
        return (
          <CustomHandle
            type={el.type}
            position={el.position}
            connectionCount={el.connectionCount}
            id={el.id}
            style={el.style}
          />
        );
      })}
    </div>
  );
}

export default memo(TestNode);

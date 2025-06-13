import { memo } from "react";
import CustomHandle from "../CustomHandle/CustomHandle";
import "./SkladNode.css";
import { TYPES } from "../../nodes/resourceTypes";

function SkladNode({ data, isConnectable }) {
  return (
    <div className="test-node" style={{ borderColor: data.color }}>
      <div className="test-node_header" style={{ backgroundColor: data.color }}>
        <p
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {data.text}
        </p>
        <p className="desc">{data.desc}</p>
      </div>
      <div className="test-node_body">
        <p>In storage:</p>
        {Object.entries(data).map(([key, value]) =>
          Object.values(TYPES).includes(key) ? (
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

export default memo(SkladNode);

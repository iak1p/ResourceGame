import React from "react";
import { useDnD } from "../DnDContext/DnDContext";
import "./Sidebar.css";

export default ({ money }) => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "200px",
        height: "90%",
        backgroundColor: "#f0f0f0",
        padding: "10px",
      }}
    >
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div className="test-container">
        <div
          className="test"
          style={money < 10 ? { opacity: 0.5 } : {}}
          onDragStart={(event) => onDragStart(event, "bakery")}
          draggable
        >
          bakery
        </div>
        <div
          className="test"
          onDragStart={(event) => onDragStart(event, "wheat")}
          draggable
        >
          wheat
        </div>
        <div
          className="test"
          onDragStart={(event) => onDragStart(event, "mill")}
          draggable
        >
          mill
        </div>
        <div
          className="test"
          onDragStart={(event) => onDragStart(event, "water")}
          draggable
        >
          water
        </div>
        <div
          className="test"
          onDragStart={(event) => onDragStart(event, "wood")}
          draggable
        >
          wood
        </div>
        <div
          className="test"
          onDragStart={(event) => onDragStart(event, "waterPurifier")}
          draggable
        >
          waterPurifier
        </div>
        <div
          className="test"
          onDragStart={(event) => onDragStart(event, "lumberMill")}
          draggable
        >
          lumberMill
        </div>
      </div>
    </aside>
  );
};

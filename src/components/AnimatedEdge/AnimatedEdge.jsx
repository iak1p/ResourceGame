import React, { useEffect, useRef, useState } from "react";
import {
  BaseEdge,
  getSmoothStepPath,
  useNodes,
  useNodesData,
} from "@xyflow/react";

export default function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  target,
  source,
  data = {},
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const animateRef = useRef(null);
  const svgRef = useRef(null);
  // console.log(data);
  // console.log(source);

  const nodeData = useNodesData(target);
  const sourceData = useNodesData(source);

  const [selfData, setSelfData] = useState({});
  const selfDataRef = useRef(selfData);
  const [played, setPlayed] = useState(true);

  useEffect(() => {
    if (sourceData.data.label == "pred") {
      setSelfData(sourceData.data);
    }
  }, [sourceData]);

  useEffect(() => {
    selfDataRef.current = selfData;
  }, [selfData]);

  const pause = () => {
    svgRef.current?.pauseAnimations();
    setPlayed(false);
  };

  const play = () => {
    svgRef.current?.unpauseAnimations();
    setPlayed(true);
  };

  useEffect(() => {
    const node = animateRef.current;

    return () =>
      node?.addEventListener("repeatEvent", () => {
        // console.log(nodeData.data.wood);
        // console.log("type", sourceData.type);
        if (sourceData.data.label === "pred") {
          const need = selfDataRef.current.need;
          console.log("NEEED", need);

          const allEnough = need.every(
            (el) => selfDataRef.current[el.type] >= el.count
          );

          if (allEnough) {
            need.forEach((el) => {
              data.handleCreate(source, el);
            });
            data.handleAnimationRepeat(target, sourceData.data.type);
          }

          return;
        }

        console.log("====================================");
        console.log(selfDataRef.current);
        console.log("====================================");

        data.handleAnimationRepeat(target, sourceData.data.type);
      });
  }, []);

  return (
    <svg ref={svgRef} style={{ overflow: "visible", position: "absolute" }}>
      <BaseEdge id={id} path={edgePath} type="bezier" />
      <circle
        r="2"
        fill={sourceData.data.color}
        style={{ opacity: played ? "1" : "0" }}
      >
        <animateMotion
          ref={animateRef}
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
        />
      </circle>
    </svg>
  );
}

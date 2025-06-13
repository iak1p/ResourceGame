import { useEffect, useRef, useState } from "react";
import {
  BaseEdge,
  getBezierPath,
  getSmoothStepPath,
  useNodesData,
} from "@xyflow/react";
import { TYPES } from "../../nodes/resourceTypes";

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
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const animateRef = useRef(null);
  const svgRef = useRef(null);

  const nodeData = useNodesData(target);
  const sourceData = useNodesData(source);

  const [selfData, setSelfData] = useState({});
  const selfDataRef = useRef(selfData);

  useEffect(() => {
    if (sourceData.data.label === TYPES.FACTORY) {
      setSelfData(sourceData.data);
    }
  }, [sourceData]);

  useEffect(() => {
    selfDataRef.current = selfData;
  }, [selfData]);

  const pause = () => {
    svgRef.current?.pauseAnimations();
  };

  const play = () => {
    svgRef.current?.unpauseAnimations();
  };

  useEffect(() => {
    const node = animateRef.current;

    return () =>
      node?.addEventListener("repeatEvent", () => {
        console.log(nodeData.data.label, sourceData.data.label);

        if (sourceData.data.label === TYPES.FACTORY) {
          const need = selfDataRef.current.need;

          const allEnough = need.every(
            (el) => selfDataRef.current[el.type] >= el.count
          );

          if (allEnough) {
            need.forEach((el) => {
              data.handleCreate(source, el);
            });
            data.handleAnimationRepeat(target, sourceData.data.type);

            if (nodeData.data.label === TYPES.SKLAD) {
              data.hadleMoneyChange(sourceData.data.price);
            }
          }

          return;
        } else if (nodeData.data.label === TYPES.SKLAD) {
          data.hadleMoneyChange(sourceData.data.price);
        }

        data.handleAnimationRepeat(target, sourceData.data.type);
      });
  }, []);

  useEffect(() => {
    if (sourceData.data.label === TYPES.FACTORY) {
      const need = sourceData.data.need;
      const allEnough = need.every(
        (el) => sourceData.data[el.type] >= el.count
      );

      if (allEnough) {
        play();
      } else {
        pause();
      }
    }
  }, [sourceData.data, nodeData.data]);

  return (
    <svg ref={svgRef} style={{ overflow: "visible", position: "absolute" }}>
      <BaseEdge id={id} path={edgePath} type="bezier" />
      <circle
        r="2"
        fill={sourceData.data.color}
        // style={{ opacity: allEnough ? "1" : "0" }}
      >
        <animateMotion
          ref={animateRef}
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
        />
        <p>test</p>
      </circle>
    </svg>
  );
}

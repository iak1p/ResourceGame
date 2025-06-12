import { Position } from "@xyflow/react";
import { TYPES } from "./resourceTypes";

export const mill = {
  id: crypto.randomUUID(),
  position: { x: -200, y: 200 },
  data: {
    label: TYPES.FACTORY,
    need: [{ count: 1, type: TYPES.WHEAT }],
    text: "Mill",
    // desc: "Filters water for technical purposes",
    type: TYPES.FLOUR,
    color: "#FFF3B0",
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 1,
      },
      {
        type: "source",
        position: Position.Right,
        id: crypto.randomUUID(),
        connectionCount: 1,
      },
    ],
  },
  type: "testNode",
};

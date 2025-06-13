import { Position } from "@xyflow/react";
import { TYPES } from "./resourceTypes";

export const mill = {
  id: crypto.randomUUID(),
  position: { x: -200, y: 200 },
  data: {
    label: TYPES.FACTORY,
    need: [{ count: 1, type: TYPES.WHEAT }],
    text: "Mill",
    price: 5,
    // desc: "Filters water for technical purposes",
    type: TYPES.FLOUR,
    color: "#9DA39A",
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 1,
        rs: TYPES.WHEAT,
      },
      {
        type: "source",
        position: Position.Right,
        id: crypto.randomUUID(),
        connectionCount: 1,
        rs: TYPES.FLOUR,
      },
    ],
  },
  type: "testNode",
};

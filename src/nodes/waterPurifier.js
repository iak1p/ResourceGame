import { Position } from "@xyflow/react";
import { TYPES } from "./resourceTypes";

export const waterPurifier = {
  id: crypto.randomUUID(),
  position: { x: 0, y: 200 },
  data: {
    label: TYPES.FACTORY,
    price: 5,
    need: [{ count: 2, type: TYPES.WATER }],
    text: "Water Purifier",
    // desc: "Filters water for technical purposes",
    type: TYPES.CLEAR_WATER,
    color: "#BFD7EA",
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 1,
        rs: TYPES.WATER,
      },
      {
        type: "source",
        position: Position.Right,
        id: crypto.randomUUID(),
        connectionCount: 1,
        rs: TYPES.CLEAR_WATER,
      },
    ],
  },
  type: "testNode",
};

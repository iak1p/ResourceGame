import { Position } from "@xyflow/react";
import { TYPES } from "./resourceTypes";

export const lumberMill = {
  id: crypto.randomUUID(),
  position: { x: 200, y: 0 },
  data: {
    label: TYPES.FACTORY,
    need: [
      { count: 2, type: TYPES.WOOD },
      { count: 1, type: TYPES.CLEAR_WATER },
    ],
    text: "Lumber Mill",
    // desc: "Turns wood into planks",
    type: TYPES.PLANK,
    color: "black",
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 1,
        style: { top: "50%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 1,
        style: { top: "80%" },
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

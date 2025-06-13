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
    price: 10,
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
        rs: TYPES.WOOD,
      },
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 1,
        style: { top: "80%" },
        rs: TYPES.CLEAR_WATER,
      },
      {
        type: "source",
        position: Position.Right,
        id: crypto.randomUUID(),
        connectionCount: 1,
        rs: TYPES.PLANK,
      },
    ],
  },
  type: "testNode",
};

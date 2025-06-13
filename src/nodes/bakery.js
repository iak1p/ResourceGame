import { Position } from "@xyflow/react";
import { TYPES } from "./resourceTypes";

export const bakery = {
  id: crypto.randomUUID(),
  position: { x: 200, y: 200 },
  data: {
    label: TYPES.FACTORY,
    need: [
      { count: 2, type: TYPES.FLOUR },
      { count: 1, type: TYPES.WATER },
    ],
    price: 15,
    text: "Bakery",
    // desc: "Turns wood into planks",
    type: TYPES.BREAD,
    color: "#BBD686",
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 1,
        style: { top: "50%" },
        rs: TYPES.WATER,
      },
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 1,
        style: { top: "80%" },
        rs: TYPES.FLOUR,
      },
      {
        type: "source",
        position: Position.Right,
        id: crypto.randomUUID(),
        connectionCount: 1,
        rs: TYPES.BREAD,
      },
    ],
  },
  type: "testNode",
};

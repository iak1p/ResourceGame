import { Position } from "@xyflow/react";
import { TYPES } from "./resourceTypes";

export const sklad = {
  id: crypto.randomUUID(),
  position: { x: -200, y: -100 },
  data: {
    label: TYPES.SKLAD,
    need: [{ count: 1, type: TYPES.ALL }],
    text: "Sklad",
    color: "#5F506B",
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: crypto.randomUUID(),
        connectionCount: 100,
        rs: TYPES.ALL,
      },
    ],
  },
  type: "sklad",
};

import { TYPES } from "./resourceTypes";

export const water = {
  id: crypto.randomUUID(),
  position: { x: 0, y: -200 },
  data: {
    color: "#87cefa",
    borderColor: "lightslategray",
    name: "Water",
    type: TYPES.WATER,
    connectionCount: 2,
  },
  type: "resource",
};

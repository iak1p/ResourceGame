import { TYPES } from "./resourceTypes";

export const wheat = {
  id: crypto.randomUUID(),
  position: { x: -200, y: -200 },
  data: {
    color: "#E09F3E",
    borderColor: "lightslategray",
    name: "Wheat",
    type: TYPES.WHEAT,
    connectionCount: 1,
  },
  type: "resource",
};

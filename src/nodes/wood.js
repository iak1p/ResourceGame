import { TYPES } from "./resourceTypes";

export const wood = {
  id: crypto.randomUUID(),
  position: { x: 0, y: 0 },
  data: {
    color: "#a52a2a",
    borderColor: "darkred",
    name: "Wood",
    type: TYPES.WOOD,
    connectionCount: 1,
    price: 2,
    rs: TYPES.WOOD,
  },
  type: "resource",
};

export default class Node {
  constructor(position, data) {
    this.id = crypto.randomUUID();
    this.type = "testNode";
    this.position = position;
    this.data = data;
  }
}

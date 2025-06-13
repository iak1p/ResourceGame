export default class Resorce {
  constructor(position, data) {
    this.id = crypto.randomUUID();
    this.type = "resource";
    this.position = position;
    this.data = data;
  }
}

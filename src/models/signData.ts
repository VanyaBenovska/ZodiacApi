export class SignData {
  createdAt: string;
  text: string;

  constructor(createdAt = "", text = "") {
    this.createdAt = createdAt;
    this.text = text;
  }
}

import { ISignRecord } from "../interfaces/signs";

export class SignData implements ISignRecord{
  sign: string;
  createdAt: string;
  text: string;

  constructor(sign = "", createdAt = "", text = "") {
    this.sign = sign; 
    this.createdAt = createdAt;
    this.text = text;
  }

}
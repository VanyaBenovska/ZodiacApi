import { Express } from "express";

export interface IRestServerConfiguration {
  port: number;
  host: string;
  server: Express;
}

export interface IRestServer {
  getServer(): Express;
  getPort(): number;
  start(): void;
}

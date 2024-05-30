import { FastifyInstance } from "fastify";

export interface IController {
  register(registerInstance: FastifyInstance): void;
}

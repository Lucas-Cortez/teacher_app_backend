import { FastifyInstance } from "fastify";
import { IController } from "src/core/abstracts/controller";
import { injectable } from "tsyringe";

@injectable()
export class StudentController implements IController {
  async register(registerInstance: FastifyInstance) {
    registerInstance.register(async (instance) => {}, { prefix: "/student" });
  }
}

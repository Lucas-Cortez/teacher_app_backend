import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import FastifyJwt, { JWT } from "@fastify/jwt";

import { routes } from "./routes";
import { env } from "src/shared/utils/env";

export class Server {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = Fastify({ logger: env.NODE_ENV === "development" });
    this.configure();
  }

  private configure() {
    this.configureSwagger();
    this.configureJwt();
    this.configureRoutes();
  }

  private configureJwt() {
    this.app.register(FastifyJwt, {
      secret: env.JWT_SECRET,
    });

    this.app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });
  }

  private configureSwagger() {
    this.app.register(FastifySwagger);
    this.app.register(FastifySwaggerUi, {
      routePrefix: "/api",
    });
  }

  private configureRoutes() {
    this.app.register(routes);
  }

  public async listen(port: number) {
    try {
      await this.app.listen({ port });
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }
}

import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import FastifyJwt from "@fastify/jwt";
import FastifyCookie from "@fastify/cookie";

import { routes } from "./routes";
import { Stage, env } from "src/shared/utils/env";
import { AppError } from "src/shared/errors/app-error";
import { internalErrorFactory } from "src/shared/errors/factories/internal-error";

export class App {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = Fastify({ logger: false });
    // this.app = Fastify({ logger: env.NODE_ENV === Stage.DEVELOPMENT });
    this.configure();
  }

  private configure() {
    this.configureCookies();
    this.configureErrorHandler();
    this.configureSwagger();
    this.configureJwt();
    this.configureRoutes();
  }

  private configureJwt() {
    this.app.register(FastifyJwt, { secret: env.JWT_SECRET });

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

  private configureCookies() {
    this.app.register(FastifyCookie);
  }

  private configureErrorHandler() {
    this.app.setErrorHandler((error, _, reply) => {
      if (env.NODE_ENV === Stage.DEVELOPMENT) console.error(error);

      if (error instanceof AppError)
        reply.status(error.status).send(AppError.formatError(error.error, error.status, error.message));

      reply.status(500).send(internalErrorFactory());
    });
  }

  public async listen(port: number) {
    try {
      await this.app.listen({ port });
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    } finally {
      console.log(`Server running at http://localhost:${port}`);
    }
  }
}
